import { render } from "solid-js/dom";
import { RouterProvider } from "@amoutonbrady/solid-tiny-router";

import "./main.css";
import App from "./app";

export const rootEl = document.getElementById("root");
export const dispose = render(
  () => (
    <RouterProvider>
      <App />
    </RouterProvider>
  ),
  rootEl
);
