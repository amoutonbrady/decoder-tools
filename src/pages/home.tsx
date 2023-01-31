import { createStore } from "solid-js/store";
import { createSignal, Show, For, onMount } from "solid-js";
import { useSearchParams } from "@solidjs/router";

function validateUrl(url: string): [Error | null, URL | null] {
  try {
    return [null, new URL(url)];
  } catch (e) {
    return [e, null];
  }
};

function Home() {
  const [searchParams, setSearchParams] = useSearchParams<{ url: string }>();

  const [_error, setError] = createSignal("");
  const [introspect, setIntrospect] = createStore({
    hash: "",
    host: "",
    path: "",
    query: null,
    secure: true,
    parsed: false,
  });


  function handleUrl(url: string) {
    const [error, parsedUrl] = validateUrl(url);
    if (error) return setError(error.message);

    setIntrospect({
      parsed: true,
      hash: parsedUrl.hash,
      host: parsedUrl.hostname,
      path: parsedUrl.pathname,
      secure: parsedUrl.protocol === "https:",
      query: parsedUrl.search
        ? Object.fromEntries(parsedUrl.searchParams.entries())
        : null,
    });

    return setSearchParams({ url: parsedUrl.href });
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.target as HTMLFormElement);

    const url = form.get('url');
    if (typeof url !== 'string') return setError('No URL found in the form');

    return handleUrl(url);
  };

  onMount(() => {
    if (searchParams.url) {
      return handleUrl(searchParams.url);
    }
  })

  return (
    <div class="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <form onSubmit={handleSubmit} class="px-4 py-5 sm:px-6 flex items-center">
        <label for="url" class="sr-only">
          Enter your url
        </label>

        <div class="relative rounded-md shadow-sm flex-1">
          <input
            id="url"
            name="url"
            type="url"
            value={searchParams.url || ''}
            placeholder="https://google.com/"
            class="text-lg leading-6 font-medium text-gray-100 form-input border-0 block w-full sm:text-sm sm:leading-5 bg-gray-900"
          />
        </div>

        <span class="inline-flex rounded-md shadow-sm ml-4">
          <button
            type="submit"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition ease-in-out duration-150 uppercase"
          >
            Parse url
          </button>
        </span>
      </form>

      <Show when={introspect.parsed}>
        <div class="px-4 py-5 sm:p-0">
          <dl>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5 sm:border-t sm:border-gray-900">
              <dt class="text-sm leading-5 font-medium text-gray-300">
                Is the URL secured?
              </dt>
              <dd class="whitespace-pre-wrap mt-1 text-sm leading-5 text-gray-100 sm:mt-0 sm:col-span-2 font-semibold">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 uppercase"
                  classList={{
                    "bg-green-800 text-green-100": introspect.secure,
                    "bg-red-800 text-red-100": !introspect.secure,
                  }}
                >
                  {introspect.secure ? "secured" : "not secured"}
                </span>
              </dd>
            </div>
            <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-900 sm:px-6 sm:py-5">
              <dt class="text-sm leading-5 font-medium text-gray-300">
                Hostname
              </dt>
              <dd class="whitespace-pre-wrap mt-1 text-sm leading-5 text-gray-100 sm:mt-0 sm:col-span-2">
                {introspect.host}
              </dd>
            </div>
            <Show when={introspect.path}>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-900 sm:px-6 sm:py-5">
                <dt class="text-sm leading-5 font-medium text-gray-300">
                  Pathname
                </dt>
                <dd class="whitespace-pre-wrap mt-1 text-sm leading-5 text-gray-100 sm:mt-0 sm:col-span-2">
                  {introspect.path}
                </dd>
              </div>
            </Show>
            <Show when={introspect.hash}>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-900 sm:px-6 sm:py-5">
                <dt class="text-sm leading-5 font-medium text-gray-300">
                  Hash
                </dt>
                <dd class="whitespace-pre-wrap mt-1 text-sm leading-5 text-gray-100 sm:mt-0 sm:col-span-2">
                  {introspect.hash}
                </dd>
              </div>
            </Show>
            <Show when={introspect.query}>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-900 sm:px-6 sm:py-5">
                <dt class="text-sm leading-5 font-medium text-gray-300">
                  Query parameters
                </dt>

                <dd class="whitespace-pre-wrap mt-1 text-sm leading-5 text-gray-100 sm:mt-0 sm:col-span-2">
                  <div class="overflow-x-auto border-2 border-gray-900 align-middle inline-block min-w-full overflow-hidden sm:rounded-lg">
                    <table class="min-w-full">
                      <thead>
                        <tr>
                          <th class="px-6 py-3 bg-gray-900 text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                            Query
                          </th>
                          <th class="px-6 py-3 bg-gray-900 text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-gray-800">
                        <For each={Object.entries<string>(introspect.query)}>
                          {([query, value]) => (
                            <tr>
                              <td class="px-6 py-4 whitespace-no-wrap border-t-2 border-gray-900 text-sm leading-5 font-medium text-gray-100">
                                {decodeURI(query)}
                              </td>
                              <td class="px-6 py-4 break-all border-t-2 border-gray-900 text-sm leading-5 text-gray-300">
                                {decodeURI(value)}
                              </td>
                            </tr>
                          )}
                        </For>
                      </tbody>
                    </table>
                  </div>
                </dd>
              </div>
            </Show>
          </dl>
        </div>
      </Show>
    </div>
  );
};

export default Home;
