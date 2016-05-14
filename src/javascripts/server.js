import Handlebars from "handlebars";
import htmlAutoprefixer from "html-autoprefixer";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { RouterContext, match } from "react-router";

import routes from "./routes";
import indexPage from "../templates/index";

const template = Handlebars.compile(indexPage);

function renderFullPage(fragment, head) {
  return template({
    fragment: fragment,
    head: {
      meta: head.meta.toString(),
      title: head.title.toString()
    }
  });
}

function render(locals, callback) {
  const location = locals.path;
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const page = renderToString(<RouterContext {...renderProps} />);
    const head = Helmet.rewind();
    callback(null, htmlAutoprefixer.process(renderFullPage(page, head)));
  });
}

export default render;
