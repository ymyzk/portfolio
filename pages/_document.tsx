import React from "react";
import Document, {
  Head, Html, Main, NextScript,
} from "next/document";

import { ServerStyleSheets } from "@material-ui/styles";

import theme from "../src/theme";
import { getAssetPrefix } from "../src/utils";

const globalStyle = `
html {
  font-feature-settings: "palt";
}
`;

class MyDocument extends Document {
  render() {
    const title = "Yusuke Miyazaki";
    const description = "Yusuke Miyazaki's portfolio website.";
    const url = "https://www.ymyzk.com";

    return (
      <Html lang="en" dir="ltr" prefix="og: http://ogp.me/ns# profile: http://ogp.me/ns/profile# fb: http://ogp.me/ns/fb#">
        <Head>
          <meta charSet="utf-8" />
          {/* Favicon */}
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/images/favicon.ico"
            sizes="16x16 32x32 48x48"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/favicon.png"
            sizes="256x256"
          />
          {/* DNS prefetch */}
          { Boolean(getAssetPrefix()) && <link rel="dns-prefetch" href={getAssetPrefix()} />}
          {/* SEO */}
          <meta name="description" content={description} />
          {/* Web Fonts */}
          {/* Next.js 10.2+ will inline font CSS at build time */}
          <link rel="preconnect" href="https://fonts.gstatic.com/" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
          {/* Facebook / OGP */}
          <meta property="fb:app_id" content="997147760366147" />
          <meta property="og:type" content="profile" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content={url} />
          <meta property="og:image" content="/static/images/ogp.png" />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:locale:alternate" content="en_US" />
          <meta property="og:site_name" content={title} />
          <meta property="og:description" content={description} />
          <meta property="profile:first_name" content="Yusuke" />
          <meta property="profile:last_name" content="Miyazaki" />
          <meta property="profile:username" content="ymyzk" />
          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@ymyzk" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content="/static/images/twitter.png" />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={theme.palette.primary.main}
          />
          {/* Windows / IE / Edge */}
          <meta name="msapplication-TileImage" content="/static/images/ms-tile-image.png" />
          <meta
            name="msapplication-TileColor"
            content={theme.palette.primary.main}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment key="styles">
        { /* TODO We may have a better solution with material-ui v4 */ }
        <style
        // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: globalStyle }}
        />
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
