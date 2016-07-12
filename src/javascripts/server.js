import Handlebars from "handlebars";
import htmlAutoprefixer from "html-autoprefixer";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import { RouterContext, match } from "react-router";
import { createStore } from "redux";

import reducer from "./reducers";
import routes from "./routes";
import indexPage from "../templates/index";

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
      script: head.script.toString()
    }
  });
}

function render(locals, callback) {
  const location = locals.path;
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const store = createStore(reducer);
    const html = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );
    const initialState = store.getState();
    const head = Helmet.rewind();
    callback(null, htmlAutoprefixer.process(renderFullPage(html, initialState, head)));
  });
}

export default render;
