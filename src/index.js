import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'reactflow/dist/style.css';
import "./css/styles.css";
import './css/headermenu.scss'
import './css/index.css';
import './css/basenode.css';
import './css/nodeedit.css';
import './css/workflow.css';
import '@szhsin/react-menu/dist/index.css';
import "@szhsin/react-menu/dist/theme-dark.css";

import App from "./App";


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);