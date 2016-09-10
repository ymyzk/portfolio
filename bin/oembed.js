#!/usr/bin/env node

const fs = require("fs");

const co = require("co");
const fetch = require("node-fetch");
const yaml = require("js-yaml");

const loadTalkSource = (file = "./src/data/talks.yml") =>
  yaml.safeLoad(fs.readFileSync(file, "utf8")).map((t) => t.slide).filter((u) => u);
const sources = [loadTalkSource()];
const sourceUrls = Array.from(new Set([].concat(...sources))).sort();

const prettyStringfy = (data) => JSON.stringify(
  data,
  (_, v) => (!(v instanceof Array || v === null) && typeof v === "object") ? Object.keys(v).sort().reduce((r, k) => { r[k] = v[k]; return r }, {}) : v,
  2);

const saveOEmbedUrls = (data, file = "./src/data/oembed.json") =>
  fs.writeFileSync(file, prettyStringfy(data));

function* fetchSlideShare(url) {
  try {
    const res = yield fetch(`http://www.slideshare.net/api/oembed/2?format=json&url=${url}`);
    return yield res.json();
  } catch (e) {
    return null;
  }
}

function* fetchSpeakerDeck(url) {
  try {
    const res = yield fetch(`https://speakerdeck.com/oembed.json?url=${url}`);
    return yield res.json();
  } catch (e) {
    return null;
  }
}

const fetchDispatcher = {};
fetchDispatcher["http://www.slideshare.net/"] = fetchSlideShare;
fetchDispatcher["https://speakerdeck.com/"] = fetchSpeakerDeck;

const getFetcher = (url) => {
  const fetchers = Object
    .keys(fetchDispatcher)
    .map((root) => (url.match(root) ? fetchDispatcher[root] : null))
    .filter((dispatcher) => dispatcher !== null);
  if (fetchers.length !== 1) {
    console.error(`${fetchers.length} fetchers found for ${url}`);
    throw new Error();
  }
  return fetchers[0];
};

co(function* () {
  const oEmbedUrls = {};
  for (const url of sourceUrls) {
    const fetcher = getFetcher(url);
    if (fetcher !== null) {
      console.log(`Fetching: ${url}`);
      const result = yield fetcher(url);
      if (result === null) {
        console.error("Cannot fetch");
        break;
      }
      oEmbedUrls[url] = result;
    } else {
      console.warn(`Skipping: ${url}`);
    }
  }
  saveOEmbedUrls(oEmbedUrls);
  console.log("OK");
});
