import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { AlertContextProvider } from "./context/AlertContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

//"start": "node --max_old_space_size=6144 node_modules/.bin/react-scripts start",
// "build": "node --max_old_space_size=6144 node_modules/.bin/react-scripts build",
