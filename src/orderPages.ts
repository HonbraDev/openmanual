import type { ArticlePreview } from "./articleTools";

const stickied = ["domu", "o-projektu"];

/**
 * Orders the pages in the order they should appear in the menu
 * @param pages An array of article previews
 * @returns A 2D array of article previews, with stickied articles at the top
 */
function orderPages(pages: ArticlePreview[]): ArticlePreview[][] {
  const orderedPages = pages
    .filter((page) => !stickied.includes(page.slug))
    .sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

  const stickiedPages = pages
    .filter((page) => stickied.includes(page.slug))
    .sort((a, b) => stickied.indexOf(a.slug) - stickied.indexOf(b.slug));

  return [stickiedPages, orderedPages];
}

export default orderPages;
