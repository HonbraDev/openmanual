import ArticleContent from "../components/ArticleContent";

import { getArticleBySlug, getAllArticles } from "../src/articleTools";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import { useEffect } from "react";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ArticleMeta } from "../src/articleTools";

/**
 * This component represents each article
 * @param param0 Props returned by getStaticProps
 * @returns The page
 */
const Article: NextPage<ArticlePageProps> = ({ meta, source, setTitle }) => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!setTitle) return;
    setTitle(meta.title!);
  }, [slug]);

  return <ArticleContent meta={meta} source={source} />;
};

export default Article;

/**
 * Gets the article meta
 * @param context Request context
 * @returns Props for the current page
 */
export const getStaticProps: GetStaticProps<ArticlePageProps> = async (
  context
) => {
  const slug = context.params!.slug as string;
  const source = getArticleBySlug(slug);
  const mdxSource = await serialize(source.content);
  return {
    props: {
      source: mdxSource,
      meta: source.meta,
    },
  };
};

/**
 * Fetches all articles
 * @returns All page slugs
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles();
  return {
    paths: articles.map((article) => ({
      params: { slug: article.slug },
    })),
    fallback: false,
  };
};

/**
 * Props returned by getStaticProps
 */
export interface ArticlePageProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: Partial<ArticleMeta>;
  setTitle?: (title: string) => any;
}
