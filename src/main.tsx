import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@emotion/react";
import { ThemeOptions, createTheme } from "@mui/material";

const theme: ThemeOptions = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          input: {
            backgroundColor: "white",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
