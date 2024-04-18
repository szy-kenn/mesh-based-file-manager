import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";

import "./index.css"
import Titlebar from "./components/Titlebar.jsx";

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <Titlebar />
    <div id="root">
      <App />
    </div>    
  </React.StrictMode>
)
