import { Component, lazy } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import Nav from './components/nav';

const Home = lazy(() => import('./pages/home'));
const JWTDecoder = lazy(() => import('./pages/jwtDecoder'));
const Base64Decoder = lazy(() => import('./pages/base64Decoder'));

const App: Component = () => {
  return (
    <>
      <Nav />

      <main class="container mx-auto my-12 sm:px-6">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/base64-decoder" component={Base64Decoder} />
          <Route path="/jwt-decoder" component={JWTDecoder} />
        </Routes>
      </main>

      <footer class="container fixed bottom-0 left-1/2 flex w-full -translate-x-1/2 transform justify-center px-4 py-6 sm:px-6">
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
