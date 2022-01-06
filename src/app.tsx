import { Component, lazy } from "solid-js";
import { Route, Routes } from "solid-app-router";

import Nav from "./components/nav";

const Home = lazy(() => import("./pages/home"));
const JWTDecoder = lazy(() => import("./pages/jwtDecoder"));
const Base64Decoder = lazy(() => import("./pages/base64Decoder"));

const App: Component = () => {
  return (
    <>
      <Nav />

      <main class="container sm:px-6 mx-auto my-12">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/base64-decoder" component={Base64Decoder} />
          <Route path="/jwt-decoder" component={JWTDecoder} />
        </Routes>
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

export default App;
