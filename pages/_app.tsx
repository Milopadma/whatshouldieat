import type { AppProps } from "next/app";
import Head from "next/head";
//global css
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const title = "whatshouldieat";
  const description = "well, what should i eat?";
  const imageMetaURL = "../src/resources/q.png";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={imageMetaURL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageMetaURL} />
        <meta name="twitter:image" content={imageMetaURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#000000" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=2"
        />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <meta
          name="apple-mobile-web-app-title"
          content="first world problems"
        />
        <meta name="application-name" content="first world problems" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
