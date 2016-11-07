import fs from "fs";

import express from "express";
import Handlebars from "handlebars";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import match from "react-router/lib/match";
import RouterContext from "react-router/lib/RouterContext";
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
  match(
    {
      routes: getRoutes({ userAgent: req.headers["user-agent"] }),
      location: req.url,
    },
    (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        const store = createStore(reducer);
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>);
        const initialState = store.getState();
        const head = Helmet.rewind();
        if (props.routes.length > 0 && props.routes[props.routes.length - 1].path === "*") {
          // react-router で 404 用の route にマッチしていればステータスコードを変更
          res.status(404);
        }
        vary(res, "User-Agent");
        res.send(renderFullPage(html, initialState, head));
      } else {
        res.status(404).send("Not Found");
      }
    },
  );
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
