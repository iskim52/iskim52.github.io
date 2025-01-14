import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'reactflow/dist/style.css';
import "./css/styles.css";
import './css/headermenu.scss'
import './css/index.css';
import './css/basenode.css';
import './css/nodeedit.css';
import './css/workflow.css';
import './css/rfcontrols.css';
import './css/contextmenu.css';
import '@szhsin/react-menu/dist/index.css';
import "@szhsin/react-menu/dist/theme-dark.css";

import App from "./App";
import Viewer from "./Viewer";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );


// Detect viewer mode via URL parameter
const isViewerMode = window.location.search.includes("viewer=true");
const root = createRoot(document.getElementById("root"));

if (isViewerMode) {
  root.render(
    <StrictMode>
      <Viewer />
    </StrictMode>
  );
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}