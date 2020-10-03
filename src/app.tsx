import { register } from "register-service-worker";
import { Component, lazy, Switch } from "solid-js";
import { Route } from "@amoutonbrady/solid-tiny-router";
import Nav from "./components/nav";

const Home = lazy(() => import("./pages/home"));
const Base64Decoder = lazy(() => import("./pages/base64Decoder"));
const JWTDecoder = lazy(() => import("./pages/jwtDecoder"));

const App: Component = () => {
  return (
    <>
      <Nav />
      <main class="container sm:px-6 mx-auto my-12">
        <Switch>
          <Route path="/" children={<Home />} />
          <Route path="/base64-decoder" children={<Base64Decoder />} />
          <Route path="/jwt-decoder" children={<JWTDecoder />} />
        </Switch>
      </main>
      <footer class="fixed py-6 bottom-0 container w-full px-4 sm:px-6 transform -translate-x-1/2 left-1/2">
        <a
          href="https://github.com/amoutonbrady/url-inspector"
          target="_blank"
          rel="noopener"
          class="text-pink-300 hover:underline"
        >
          Source code
        </a>
      </footer>
    </>
  );
};

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    register("/sw.js", {
      ready(registration) {
        console.log("Service worker is active.", { registration });
      },
      registered(registration) {
        console.log("✔ Application is now available offline", { registration });
      },
      cached(registration) {
        console.log("Content has been cached for offline use.", {
          registration,
        });
      },
      updatefound(registration) {
        console.log("New content is downloading.", { registration });
      },
      updated(registration) {
        console.log("New content is available; please refresh.", {
          registration,
        });
      },
      offline() {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      },
      error(error) {
        console.error("❌ Application couldn't be registered offline:", error);
      },
    });
  });
}

export default App;
