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

/**
 * Renders the content of the sidebar drawer
 * @returns The content of the sidebar drawer
 */
const ArticleDrawerContent = ({
  pages,
  currentRoute,
  unorderedPages,
}: {
  pages: Page[][];
  currentRoute: string;
  unorderedPages: Page[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const fuse = new Fuse<Page>(unorderedPages, {
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
          currentRoute={currentRoute}
        />
      ) : (
        pages
          .map((section, i) => (
            <PageList key={i} pages={section} currentRoute={currentRoute} />
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
 * A page in the sidebar drawer
 */
export interface Page {
  title: string;
  route: string;
  tags: string[];
}

const PageList = ({
  pages,
  currentRoute,
}: {
  pages: Page[];
  currentRoute: string;
}) => {
  return (
    <List>
      {pages.map((page) => (
        <Link
          key={page.route}
          href={page.route}
          underline="none"
          color="inherit"
        >
          <ListItemButton
            selected={page.route === currentRoute}
            disableRipple={false}
          >
            <ListItemText>{page.title}</ListItemText>
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};
