import { Component, lazy } from "solid-js";
import { Router, Route } from "@amoutonbrady/solid-tiny-router";
import Nav from "./components/nav";

const Home = lazy(() => import("./pages/home"));
const Base64Decoder = lazy(() => import("./pages/base64Decoder"));
const JWTDecoder = lazy(() => import("./pages/jwtDecoder"));

const App: Component = () => {
  return (
    <>
      <Nav />
      <main class="container sm:px-6 mx-auto my-12">
        <Router>
          <Route path="/" children={<Home />} />
          <Route path="/base64-decoder" children={<Base64Decoder />} />
          <Route path="/jwt-decoder" children={<JWTDecoder />} />
        </Router>
      </main>
    </>
  );
};

export default App;
