import htmlAutoprefixer from "html-autoprefixer";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { RouterContext, match } from "react-router";

import routes from "./routes";

function renderFullPage(fragment, head) {
  return `<!DOCTYPE html>
<html class="no-js" lang="ja" ${head.htmlAttributes.toString()}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    ${head.title.toString()}
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1">
    <link rel="stylesheet" href="/bundle.css">
    ${head.meta.toString()}
  </head>
  <body>
    <div id="app">${fragment}</div>
    <script>
      var WebFontConfig = {
      google: { families: [ "Roboto:400,300,500:latin" ] }
    };
      (function() {
      var wf = document.createElement("script");
      wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
      wf.type = "text/javascript";
      wf.async = "true";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(wf, s);
    })();
    </script>
    <script src="/bundle.js"></script>
  </body>
</html>`;
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
