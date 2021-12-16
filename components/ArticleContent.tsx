import ArticleTags from "./ArticleTags";

import { MDXRemote } from "next-mdx-remote";
import { Box, Typography } from "@mui/material";

import type { Article } from "../src/articleTools";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

/**
 * The actual article content rendered in React. (title, body, etc.)
 * @param props Article source and meta, as defined in /pages/[slug].tsx
 * @returns The article content.
 */
const ArticleContent = ({
  source,
  meta,
}: {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: Article["meta"];
}) => {
  return (
    <Box component="article">
      <Typography variant="h3">{meta.title}</Typography>
      <Box sx={{ my: 2, display: "flex", gap: 1 }}>
        {meta.tags && <ArticleTags tags={meta.tags} />}
      </Box>
      <MDXRemote {...source} />
    </Box>
  );
};

export default ArticleContent;
