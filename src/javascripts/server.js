import fs from "fs";

import express from "express";
import Handlebars from "handlebars";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import createStore from "redux/lib/createStore";
import vary from "vary";

import reducer from "./reducers";
import getRoutes from "./routes";
import indexPage from "../templates/index";

const loadStatsFile = (fragment) => {
  const mode = __DEBUG__ ? "debug" : "production";
  const file = `build/${mode}/server/stats.${fragment}.json`;
  return JSON.parse(fs.readFileSync(file).toString());
};

const clientStats = loadStatsFile("client");
const serverStats = loadStatsFile("server");

const template = Handlebars.compile(indexPage);

function renderFullPage(fragment, state, head) {
  // Corresponds to plugins/index.js
  return template({
    fragment,
    initialState: JSON.stringify(state),
    head: {
      meta: head.meta.toString(),
      title: head.title.toString(),
      link: head.link.toString(),
      script: head.script.toString(),
    },
    files: {
      bundleCss: serverStats.files.bundleCss,
      bundleJs: clientStats.files.bundleJs,
    },
  });
}

const app = express();
app.use(express.static(`build/${__DEBUG__ ? "debug" : "production"}/server/public`));

app.get("*", (req, res) => {
  const context = {};
  const store = createStore(reducer);
  const routes = getRoutes({ userAgent: req.headers["user-agent"] });
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {routes}
      </StaticRouter>
    </Provider>);
  const initialState = store.getState();
  const head = Helmet.renderStatic();
  if (context.url) {
    res.redirect(context.url);
    return;
  }
  vary(res, "User-Agent");
  res.status(context.status ? context.status : 200).send(renderFullPage(html, initialState, head));
});

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "8000");
app.listen(port, () => {
  console.log(`Listening on ${port}`);  // eslint-disable-line
});
