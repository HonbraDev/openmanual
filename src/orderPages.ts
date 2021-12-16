import type { Page } from "../components/ArticleDrawerContent";

const stickied = ["/domu", "/o-projektu"];

function orderPages(pages: Page[]): Page[][] {
  const orderedPages = pages
    .filter((page) => !stickied.includes(page.route))
    .sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

  const stickiedPages = pages
    .filter((page) => stickied.includes(page.route))
    .sort((a, b) => stickied.indexOf(a.route) - stickied.indexOf(b.route));

  return [stickiedPages, orderedPages];
}

export default orderPages;
