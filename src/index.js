import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById("root")
);
