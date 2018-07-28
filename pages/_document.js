import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import JssProvider from "react-jss/lib/JssProvider";
import flush from "styled-jsx/server";
import getPageContext from "../src/getPageContext";

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    const title = "Yusuke Miyazaki";
    const description = "Yusuke Miyazaki's portfolio website.";
    const url = "https://www.ymyzk.com";

    return (
      <html lang="en" dir="ltr" prefix="og: http://ogp.me/ns# profile: http://ogp.me/ns/profile# fb: http://ogp.me/ns/fb#">
        <Head>
          <title>
            { title }
          </title>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              "user-scalable=0, initial-scale=1, "
              + "minimum-scale=1, width=device-width, height=device-height"
            }
          />
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
          {/* SEO */}
          <meta name="description" content={description} />
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
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
          {/* Windows / IE / Edge */}
          <meta name="msapplication-TileImage" content="/static/images/ms-tile-image.png" />
          <meta name="msapplication-TileColor" content={pageContext.theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <style jsx global>
          {`
          html {
            font-feature-settings: "palt";
          }
          `}
        </style>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();
  const page = ctx.renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
