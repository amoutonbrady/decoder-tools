import decode from 'jwt-decode';
import { Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Alert } from '../components/alert';

function JWTDecoder() {
  const [jwt, setJwt] = createStore({
    error: '',
    headers: null as Record<string, unknown> | null,
    payload: null as Record<string, unknown> | null,
    exp: null as Date | null,
    iat: null as Date | null,
  });

  function convertTimestampToDate(timestamp: unknown): Date | null {
    try {
      // Create a new variable called `ts` and assign the value of `timestamp` to it
      let ts = timestamp;

      // If the type of `ts` is a string, convert it to a number with a base of 10
      if (typeof ts === 'string') {
        ts = parseInt(ts, 10);
      }

      // If the type of `ts` is not a number, return null
      if (typeof ts !== 'number') {
        return null;
      }

      // If the value of `ts` is less than 10 billion, multiply it by 1000 to convert it from seconds to milliseconds
      if (ts < 10000000000) {
        ts *= 1000;
      }

      // Return a new `Date` object with the value of `ts` as its argument
      return new Date(ts);
    } catch {
      return null;
    }
  }

  async function handleInput(event: Event & { currentTarget: HTMLTextAreaElement }) {
    try {
      const jwt = event.currentTarget.value;
      if (!jwt) return setJwt('error', '');

      const headers = decode<Record<string, unknown>>(jwt, { header: true });
      const payload = decode<Record<string, unknown>>(jwt);

      return setJwt({
        headers,
        payload,
        error: '',
        exp: convertTimestampToDate(payload.exp),
        iat: convertTimestampToDate(payload.iat),
      });
    } catch (error) {
      console.log(error.message);
      return setJwt('error', error.message);
    }
  }

  return (
    <div class="grid-cols-3 gap-4 sm:grid">
      <div class="col-span-2 col-start-1 row-start-1">
        <label for="jwt" class="block text-sm font-medium leading-5 text-neutral-200">
          JWT
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <textarea
            id="jwt"
            rows="10"
            onInput={handleInput}
            class="form-textarea mt-1 block w-full border-0 bg-neutral-800 text-neutral-200 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ></textarea>
        </div>
      </div>

      <aside class="col-start-3 row-start-1 mt-4 sm:mt-0">
        <p class="block text-sm font-medium leading-5 text-neutral-200">Headers</p>

        <code
          style="min-height: 85px"
          class="form-textarea mt-1 block w-full whitespace-pre-wrap border-0 bg-neutral-800 text-neutral-200 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        >
          <Show when={!jwt.error && jwt.headers}>
            <pre class="whitespace-pre-wrap break-words">
              {JSON.stringify(jwt.headers, null, 2)}
            </pre>
          </Show>
        </code>

        <p class="mt-4 block text-sm font-medium leading-5 text-neutral-200">Payload</p>

        <code
          style="min-height: 85px"
          class="form-textarea mt-1 block w-full whitespace-pre-wrap border-0 bg-neutral-800 text-neutral-200 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        >
          <Show when={!jwt.error && jwt.payload}>
            <pre class="whitespace-pre-wrap break-words">
              {JSON.stringify(jwt.payload, null, 2)}
            </pre>
          </Show>
        </code>

        <p class="mt-4 block text-sm font-medium leading-5 text-neutral-200">Computed data</p>

        <code class="form-textarea mt-1 block w-full whitespace-pre-wrap border-0 bg-neutral-800 text-neutral-200 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
          <Show when={!jwt.error && jwt.iat}>
            <p title={jwt.iat.getTime().toString()}>Issued at: {jwt.iat.toLocaleString()}</p>
          </Show>

          <Show when={!jwt.error && jwt.exp}>
            <p title={jwt.exp.getTime().toString()}>Expires at: {jwt.exp.toLocaleString()}</p>
          </Show>
        </code>
      </aside>

      <Show when={jwt.error}>
        <Alert>{jwt.error}</Alert>
      </Show>
    </div>
  );
}

export default JWTDecoder;
