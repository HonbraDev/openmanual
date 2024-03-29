// I know this is a hack,
// but I couldn't find a better solution

const matter = require("gray-matter");
const fs = require("fs");
const path = require("path");

const docsDirectory = "./docs/";

function getArticleBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(docsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

function getAllArticles() {
  const files = fs.readdirSync(docsDirectory);

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

fs.writeFileSync("./src/metadata.ts", `
// This file is generated by generateMetadata.js
// and will be ignored in commits
// Do not edit this file directly

import type { ArticlePreview } from "./articleTools";

const metadata: ArticlePreview[] = ${JSON.stringify(getAllArticles())};
export default metadata;
`);
