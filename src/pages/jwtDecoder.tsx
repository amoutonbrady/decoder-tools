import { Component, createState, Show } from "solid-js";
import decode from "jwt-decode";
import { Alert } from "../components/alert";

const JWTDecoder: Component = () => {
  const [jwt, setJwt] = createState({
    headers: null,
    payload: null,
    error: "",
  });

  const handleInput = (e: Event & { target: HTMLTextAreaElement }) => {
    try {
      if (!e.target.value) return setJwt("error", "");
      const headers = decode<any>(e.target.value, { header: true });
      const payload = decode<any>(e.target.value);

      setJwt({ headers, payload, error: "" });
    } catch (e) {
      console.log(e.message);
      setJwt("error", e.message);
    }
  };

  return (
    <div class="sm:grid grid-cols-3 gap-4">
      <div class="col-span-2 col-start-1 row-start-1">
        <label
          for="jwt"
          class="block text-sm font-medium leading-5 text-gray-200"
        >
          JWT
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <textarea
            id="jwt"
            rows="10"
            onInput={handleInput}
            class="mt-1 form-textarea text-gray-200 bg-gray-800 border-0 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ></textarea>
        </div>
      </div>
      <aside class="col-start-3 row-start-1 mt-4 sm:mt-0">
        <p class="block text-sm font-medium leading-5 text-gray-200">Headers</p>
        <code
          style="min-height: 85px"
          class="whitespace-pre-wrap mt-1 form-textarea text-gray-200 bg-gray-800 border-0 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        >
          <Show when={!jwt.error && jwt.headers}>
            <pre>{JSON.stringify(jwt.headers, null, 4)}</pre>
          </Show>
        </code>
        <p class="block text-sm font-medium leading-5 text-gray-200 mt-4">
          Payload
        </p>
        <code
          style="min-height: 85px"
          class="whitespace-pre-wrap mt-1 form-textarea text-gray-200 bg-gray-800 border-0 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        >
          <Show when={!jwt.error && jwt.payload}>
            <pre>{JSON.stringify(jwt.payload, null, 4)}</pre>
          </Show>
        </code>
      </aside>

      <Show when={jwt.error}>
        <Alert>{jwt.error}</Alert>
      </Show>
    </div>
  );
};

export default JWTDecoder;
