import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f4f0fa",
      paper: "#ffffff",
    },
    primary: {
      main: "#6750A4",
      light: "#9f86ff",
      dark: "#4f378b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#625b71",
      light: "#9e8ca0",
      dark: "#44365a",
      contrastText: "#ffffff",
    },
    error: {
      main: "#b3261e",
      light: "#ef5c4e",
      dark: "#7f0000",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffb300",
      light: "#ffdd4b",
      dark: "#c68400",
      contrastText: "#000000",
    },
    info: {
      main: "#4c6ef5",
      light: "#7d9dff",
      dark: "#003ecb",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      light: "#60ad5e",
      dark: "#005005",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#1c1b1f",
      secondary: "#49454f",
      disabled: "#9e9e9e",
    },
    divider: "#d0cce3",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1c1b1f",
      paper: "#2c2b31",
    },
    primary: {
      main: "#d0bcff",
      light: "#eaddff",
      dark: "#a189c9",
      contrastText: "#000000",
    },
    secondary: {
      main: "#ccc2dc",
      light: "#eee8f4",
      dark: "#a89ab2",
      contrastText: "#000000",
    },
    error: {
      main: "#f2b8b5",
      light: "#fdd8d5",
      dark: "#b00020",
      contrastText: "#000000",
    },
    warning: {
      main: "#ffcc80",
      light: "#ffe0b2",
      dark: "#ffb74d",
      contrastText: "#000000",
    },
    info: {
      main: "#9fcaff",
      light: "#cfe4ff",
      dark: "#6fa7e0",
      contrastText: "#000000",
    },
    success: {
      main: "#81c784",
      light: "#b2fab4",
      dark: "#519657",
      contrastText: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfc6dc",
      disabled: "#a0a0a0",
    },
    divider: "#49454f",
  },
});

export { lightTheme, darkTheme };
