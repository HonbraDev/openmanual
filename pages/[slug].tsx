import Layout from "../components/ArticleLayout";
import ArticleContent from "../components/ArticleContent";
import orderPages from "../src/orderPages";

import { serialize } from "next-mdx-remote/serialize";
import { getArticleBySlug, getAllArticles } from "../src/articleTools";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ArticleMeta } from "../src/articleTools";
import type { Page } from "../components/ArticleDrawerContent";

const Article: NextPage<ArticleProps> = ({
  meta,
  previews,
  source,
  currentRoute,
  unorderedPages,
}) => {
  return (
    <Layout
      title={meta.title || ""}
      drawerPages={previews}
      currentRoute={currentRoute}
      unorderedPages={unorderedPages}
    >
      <ArticleContent meta={meta} source={source} />
    </Layout>
  );
};

export default Article;

export const getStaticProps: GetStaticProps<ArticleProps> = async (context) => {
  const previews = getAllArticles();
  const slug = context.params!.slug as string;
  const source = getArticleBySlug(slug);
  const mdxSource = await serialize(source.content);
  const pages = previews.map((preview) => ({
    title: preview.title || "",
    route: `/${preview.slug}`,
    tags: preview.tags || [],
  }));
  return {
    props: {
      source: mdxSource,
      meta: source.meta,
      currentRoute: `/${slug}`,
      previews: orderPages(pages),
      unorderedPages: pages,
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
  currentRoute: string;
  previews: Page[][];
  unorderedPages: Page[];
}
