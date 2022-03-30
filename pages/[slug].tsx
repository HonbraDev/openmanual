import ArticleContent from "../components/ArticleContent";

import { serialize } from "next-mdx-remote/serialize";
import { getArticleBySlug, getAllArticles } from "../src/articleTools";
import { useRouter } from "next/router";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ArticleMeta } from "../src/articleTools";
import { useEffect } from "react";

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

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles();
  return {
    paths: articles.map((article) => ({
      params: { slug: article.slug },
    })),
    fallback: false,
  };
};

export interface ArticlePageProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: Partial<ArticleMeta>;
  setTitle?: (title: string) => any;
}
