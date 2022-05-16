import orderPages from "../src/orderPages";
import Link from "./Link";
import Fuse from "fuse.js";

import {
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";
import { useMemo, useState } from "react";

import type { ArticlePreview } from "../src/articleTools";

/**
 * Renders the content of the sidebar drawer
 * @returns The content of the sidebar drawer
 */
const ArticleDrawerContent = ({
  currentSlug,
  pages,
}: {
  currentSlug: string;
  pages: ArticlePreview[];
}) => {
  const orderedPages = useMemo(() => orderPages(pages), [pages]);

  const [searchTerm, setSearchTerm] = useState("");
  const fuse = new Fuse<ArticlePreview>(pages, {
    keys: ["title", "tags"],
  });

  const fileted = useMemo(
    () => (searchTerm ? fuse.search(searchTerm) : []),
    [searchTerm]
  );

  return (
    <Box>
      <Toolbar>
        <Link href="/o-projektu" color="inherit" underline="hover">
          <Typography variant="h6" noWrap>
            OpenManual
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <TextField
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        variant="standard"
        placeholder="Hledat..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ m: 1 }}
      />
      <Divider />
      {searchTerm !== "" ? (
        <PageList
          pages={fileted.map((a) => a.item)}
          currentSlug={currentSlug}
        />
      ) : (
        orderedPages
          .map((section, i) => (
            <PageList key={i} pages={section} currentSlug={currentSlug} />
          ))
          .reduce((previous, current) => (
            <>
              {previous}
              <Divider />
              {current}
            </>
          ))
      )}
    </Box>
  );
};

export default ArticleDrawerContent;

/**
 * Render a list of pages
 * @param props The list of pages as an array and the current slug
 * @returns The list of pages as a React component
 */
const PageList = ({
  pages,
  currentSlug,
}: {
  pages: ArticlePreview[];
  currentSlug: string;
}) => {
  return (
    <List>
      {pages.map((page) => (
        <Link
          key={page.slug}
          href={`/${page.slug}`}
          underline="none"
          color="inherit"
        >
          <ListItemButton
            selected={page.slug === currentSlug}
            disableRipple={false}
          >
            <ListItemText>{page.title}</ListItemText>
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};
