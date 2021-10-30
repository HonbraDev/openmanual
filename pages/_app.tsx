import "../styles/globals.css";

import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { useRouter } from "next/router";
import ArticleWrapper from "../components/ArticleWrapper";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>OpenManual</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {router.asPath.startsWith("/articles/") ? (
          <ArticleWrapper>
            <Component {...pageProps} />
          </ArticleWrapper>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}
