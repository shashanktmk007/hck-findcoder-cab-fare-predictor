import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer";
import { CssBaseline } from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <div>
        <App />
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
