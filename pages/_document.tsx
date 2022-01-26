import React from "react";
import Document, {
  Head, Html, Main, NextScript,
} from "next/document";

import createEmotionServer from "@emotion/server/create-instance";

import createEmotionCache from "../src/createEmotionCache";
import { lightPrimaryMain } from "../src/theme";
import { getAssetPrefix } from "../src/utils";

const globalStyle = `
html {
  font-feature-settings: "palt";
}
`;

export default class MyDocument extends Document {
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
            rel="icon"
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
            content={lightPrimaryMain}
          />
          {/* Windows / IE / Edge */}
          <meta name="msapplication-TileImage" content="/static/images/ms-tile-image.png" />
          <meta
            name="msapplication-TileColor"
            content={lightPrimaryMain}
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

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
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

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up
  // performance. However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () => originalRenderPage({
    // eslint-disable-next-line react/display-name
    enhanceApp: (App: any) => function (props) {
      return <App emotionCache={cache} {...props} />;
    },
  });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  const globalStyleElement = (
    <style
      key="global-style"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: globalStyle }}
    />
  );

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      globalStyleElement,
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
