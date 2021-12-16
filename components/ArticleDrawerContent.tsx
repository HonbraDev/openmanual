import Link from "./Link";

import {
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

/**
 * Renders the content of the sidebar drawer
 * @returns The content of the sidebar drawer
 */
const ArticleDrawerContent = ({
  pages,
  currentRoute,
}: {
  pages: Page[][];
  currentRoute: string;
}) => {
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
      {pages
        .map((section, i) => (
          <List key={i}>
            {section.map((page) => (
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
        ))
        .reduce((previous, current) => (
          <>
            {previous}
            <Divider />
            {current}
          </>
        ))}
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
}
