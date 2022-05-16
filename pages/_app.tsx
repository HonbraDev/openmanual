// https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/src/pages/_app.tsx
import createEmotionCache from "../src/createEmotionCache";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/ArticleLayout";
import initialTheme from "../src/theme";
import Seo from "../components/Seo";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme, useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import type { AppProps as NextAppProps } from "next/app";

const clientSideEmotionCache = createEmotionCache();

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
}

/**
 * This component wraps every page with navigation elements
 * @param props Props for the current page
 * @returns Wrapped page
 */
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

  const [pageTitle, setPageTitle] = useState("");

  return (
    <CacheProvider value={emotionCache}>
      <Seo title={pageTitle} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout
          title={pageTitle}
          pages={[
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
          ]}
        >
          <Component {...pageProps} setTitle={setPageTitle} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
