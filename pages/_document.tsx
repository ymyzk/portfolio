import {
  Head, Html, Main, NextScript,
} from "next/document";
import type { DocumentContext, DocumentProps } from "next/document";

import {
  DocumentHeadTags,
  documentGetInitialProps,
} from "@mui/material-nextjs/v16-pagesRouter";
import type { DocumentHeadTagsProps } from "@mui/material-nextjs/v16-pagesRouter";

import { lightPrimaryMain } from "../src/theme";

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
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
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => documentGetInitialProps(ctx);
