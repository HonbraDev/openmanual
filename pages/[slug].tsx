import ArticleContent from "../components/ArticleContent";

import { serialize } from "next-mdx-remote/serialize";
import { getArticleBySlug, getAllArticles } from "../src/articleTools";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ArticleMeta } from "../src/articleTools";

const Article: NextPage<ArticleProps> = ({ meta, source }) => {
  return <ArticleContent meta={meta} source={source} />;
};

export default Article;

export const getStaticProps: GetStaticProps<ArticleProps> = async (context) => {
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

export interface ArticleProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: Partial<ArticleMeta>;
}
