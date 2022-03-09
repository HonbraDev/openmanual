// https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/src/pages/_app.tsx
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../src/createEmotionCache";
import initialTheme from "../src/theme";
import websiteContext from "../src/websiteContext";
import Layout from "../components/ArticleLayout";

import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

import type { AppProps as NextAppProps } from "next/app";

const clientSideEmotionCache = createEmotionCache();

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        ...initialTheme,
        palette: {
          ...initialTheme.palette,
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>OpenManual</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <websiteContext.Provider
          value={{
            pages: [
              {
                title: "Hello, world!",
                slug: "hello",
                tags: ["hello", "world", "computer", "virus"],
              },
              {
                title: "O projektu",
                slug: "o-projektu",
                tags: [],
              },
            ],
          }}
        >
          <Layout title="Article">
            <Component {...pageProps} />
          </Layout>
        </websiteContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
