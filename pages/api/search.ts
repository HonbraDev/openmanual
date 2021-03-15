// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const articles = ["pořídit snímek obrazovky", "zadat úkol v Teams"];

export default (req, res) => {
  if (req.query.searchTerm)
    res
      .status(200)
      .json(
        articles.filter((article) => article.includes(req.query.searchTerm))
      );
  else res.status(200).json([]);
};
