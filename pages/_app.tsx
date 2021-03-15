import "../styles/globals.css";
import { useRouter } from "next/router";
import ArticleWrapper from "../components/ArticleWrapper";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.asPath.startsWith("/articles/") ? (
        <ArticleWrapper>
          <Component {...pageProps} />
        </ArticleWrapper>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
