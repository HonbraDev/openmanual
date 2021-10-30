import Link from "next/link";
import {
  Box,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  IconButton,
  Drawer,
  useTheme,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Share as ShareIcon, Menu as MenuIcon } from "@mui/icons-material";

const drawerWidth = 300;

export default function ResponsiveDrawer({ children }: { children: any }) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          OpenManual
        </Typography>
      </Toolbar>
      <List
        disablePadding
        sx={{
          backgroundColor: theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          px: 2,
        }}
      >
        {[
          "Domů",
          "Jak pořídit snímek obrazovky",
          "Další velmi zajímavý návod",
          "Ano, toto je taky návod",
        ].map((text, index) => (
          <ListItem
            sx={{
              borderRadius: theme.shape.borderRadius + "px",
              "&.Mui-selected": {
                boxShadow: theme.shadows[1],
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
            }}
            button
            selected={index === 0}
            key={text}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    typeof document !== "undefined" ? () => document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="otevřít šuplík"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Jak pořídit snímek obrazovky
          </Typography>
          <Button
            sx={{
              ml: "auto",
            }}
            variant="contained"
            startIcon={<ShareIcon />}
          >
            Sdílet
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.background.default,
              borderRight: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        sx={{
          flexGrow: 1,

          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.background.paper,
            height: "100%",
            width: "100%",
            px: 4,
            py: 3,
            borderTopLeftRadius: theme.shape.borderRadius,
          }}
        >
          {children}
          <Box sx={{ height: 1000 }} />
        </Box>
      </Box>
    </Box>
  );
}
