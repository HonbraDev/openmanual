import matter from "gray-matter";

import { join } from "path";
import { readdirSync, readFileSync } from "fs";

const docsDirectory = join(process.cwd(), "docs");

/**
 * Get an article by a slug
 * @param slug The article slug, e.g. "hello-world"
 * @returns The article's content, as a string, the article's front matter, and the article's slug
 */
export function getArticleBySlug(slug: string): Article {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(docsDirectory, `${realSlug}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

/**
 * Get all articles' titles and slugs
 */
export function getAllArticles(): ArticlePreview[] {
  const files = readdirSync(docsDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const article = getArticleBySlug(file);
      return {
        title: article.meta.title || "",
        slug: article.slug,
        tags: article.meta.tags || [],
      };
    });
}

/**
 * An article, returned by getArticleBySlug
 */
export interface Article {
  slug: string;
  meta: Partial<ArticleMeta>;
  content: string;
}

/**
 * What the front matter **should** look like
 */
export interface ArticleMeta {
  title: string;
  tags: string[];
}

/**
 * An article preview, returned by getAllArticles
 */
export interface ArticlePreview {
  title: string;
  slug: string;
  tags: string[];
}
