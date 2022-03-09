// https://mui.com/components/drawers/#responsive-drawer
import ArticleDrawerContent from "./ArticleDrawerContent";
import ElevationScroll from "./ElevationScroll";

import {
  Toolbar,
  Box,
  AppBar,
  Drawer,
  IconButton,
  Typography,
  Container,
  useTheme,
} from "@mui/material";

import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/router";

/**
 * The main layout of the site, containing the header and the sidebar
 * @param props The content and title of the page
 * @returns The children wrapped in the layout
 */
const Layout = ({ children, title }: { children: any; title: string }) => {
  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = process.browser ? () => window.document.body : undefined;

  const router = useRouter();
  const currentSlug = (router.query.slug as string) || "";

  const drawerContent = <ArticleDrawerContent currentSlug={currentSlug} />;

  return (
    <Box sx={{ display: "flex" }}>
      <ElevationScroll>
        {(elevated) => {
          return (
            <AppBar
              position="fixed"
              color="inherit"
              elevation={elevated ? 4 : 0}
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    opacity: elevated ? 1 : 0,
                    transition: theme.transitions.create("opacity"),
                  }}
                >
                  {title}
                </Typography>
              </Toolbar>
            </AppBar>
          );
        }}
      </ElevationScroll>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container maxWidth="md">{children}</Container>
      </Box>
    </Box>
  );
};

export default Layout;
