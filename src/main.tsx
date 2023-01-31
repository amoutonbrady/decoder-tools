import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./main.css";
import App from "./app";

export const rootEl = document.getElementById("root");
export const dispose = render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  rootEl
);
