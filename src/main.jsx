import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Themes/theme.js";
import { ThemeProvider as CustomThemeProvider } from "./Themes/ThemeContext.jsx";
import { RecoilRoot } from "recoil";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Define a Material-UI theme with light or dark mode
const muiTheme = createTheme({
  palette: {
    mode: "light", // Use "dark" for dark mode
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ChakraProvider theme={theme}>
        <CustomThemeProvider>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </CustomThemeProvider>
      </ChakraProvider>
    </MuiThemeProvider>
  </StrictMode>
);
