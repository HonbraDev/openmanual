import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    background: {
      default: "#f0f0f0",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
/*     MuiList: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          px: "8px",
        },
      },
    }, */
  },
});

export default theme;
