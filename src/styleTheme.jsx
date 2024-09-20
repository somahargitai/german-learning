import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dd9800",
    },
    secondary: {
      main: "#3f51b5",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1rem",
    },
    h4: {
      fontSize: "1rem",
    },
  },
});

export default theme;
