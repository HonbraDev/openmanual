import { Box, Typography } from "@mui/material";

/**
 * Renders the tags of an article
 * @param props The tags to render
 * @returns The rendered tags
 */
const ArticleTags = ({ tags }: { tags: string[] }) => {
  return (
    <Box sx={{ my: 2, display: "flex", gap: 1 }}>
      <Typography variant="subtitle1">Tags:</Typography>
      {tags.map((tag) => (
        <Typography key={tag} variant="subtitle1">
          {tag}
        </Typography>
      ))}
    </Box>
  );
};

export default ArticleTags;
