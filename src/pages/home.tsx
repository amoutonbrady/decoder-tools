import { createStore } from 'solid-js/store';
import { createSignal, Show, For, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';

function validateUrl(url: string): [Error | null, URL | null] {
  try {
    return [null, new URL(url)];
  } catch (error) {
    return [error, null];
  }
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams<{ url: string }>();

  const [_error, setError] = createSignal('');
  const [introspect, setIntrospect] = createStore({
    hash: '',
    host: '',
    path: '',
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
      secure: parsedUrl.protocol === 'https:',
      query: parsedUrl.search ? Object.fromEntries(parsedUrl.searchParams.entries()) : null,
    });

    return setSearchParams({ url: parsedUrl.href });
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setError('');

    const form = new FormData(event.target as HTMLFormElement);

    const url = form.get('url');
    if (typeof url !== 'string') return setError('No URL found in the form');

    return handleUrl(url);
  }

  onMount(() => {
    if (!searchParams.url) {
      return handleUrl(searchParams.url);
    }
  });

  return (
    <div class="overflow-hidden bg-neutral-800 shadow sm:rounded-lg">
      <form onSubmit={handleSubmit} class="flex items-center px-4 py-5 sm:px-6">
        <label for="url" class="sr-only">
          Enter your url
        </label>

        <div class="relative flex-1 rounded-md shadow-sm">
          <input
            id="url"
            name="url"
            type="url"
            value={searchParams.url || ''}
            placeholder="https://google.com/"
            class="form-input block w-full border-0 bg-neutral-900 text-lg font-medium leading-6 text-neutral-100 sm:text-sm sm:leading-5"
          />
        </div>

        <span class="ml-4 inline-flex rounded-md shadow-sm">
          <button
            type="submit"
            class="focus:shadow-outline-pink inline-flex items-center rounded-md border border-transparent bg-pink-600 px-3 py-2 text-sm font-medium uppercase leading-4 text-white transition duration-150 ease-in-out hover:bg-pink-500 focus:border-pink-700 focus:outline-none active:bg-pink-700"
          >
            Parse url
          </button>
        </span>
      </form>

      <Show when={introspect.parsed}>
        <div class="px-4 py-5 sm:p-0">
          <dl>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-neutral-900 sm:px-6 sm:py-5">
              <dt class="text-sm font-medium leading-5 text-neutral-300">Is the URL secured?</dt>
              <dd class="mt-1 whitespace-pre-wrap text-sm font-semibold leading-5 text-neutral-100 sm:col-span-2 sm:mt-0">
                <span
                  class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium uppercase leading-4"
                  classList={{
                    'bg-green-800 text-green-100': introspect.secure,
                    'bg-red-800 text-red-100': !introspect.secure,
                  }}
                >
                  {introspect.secure ? 'secured' : 'not secured'}
                </span>
              </dd>
            </div>
            <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-neutral-900 sm:px-6 sm:py-5">
              <dt class="text-sm font-medium leading-5 text-neutral-300">Hostname</dt>
              <dd class="mt-1 whitespace-pre-wrap text-sm leading-5 text-neutral-100 sm:col-span-2 sm:mt-0">
                {introspect.host}
              </dd>
            </div>
            <Show when={introspect.path}>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-neutral-900 sm:px-6 sm:py-5">
                <dt class="text-sm font-medium leading-5 text-neutral-300">Pathname</dt>
                <dd class="mt-1 whitespace-pre-wrap text-sm leading-5 text-neutral-100 sm:col-span-2 sm:mt-0">
                  {introspect.path}
                </dd>
              </div>
            </Show>
            <Show when={introspect.hash}>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-neutral-900 sm:px-6 sm:py-5">
                <dt class="text-sm font-medium leading-5 text-neutral-300">Hash</dt>
                <dd class="mt-1 whitespace-pre-wrap text-sm leading-5 text-neutral-100 sm:col-span-2 sm:mt-0">
                  {introspect.hash}
                </dd>
              </div>
            </Show>
            <Show when={introspect.query}>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-neutral-900 sm:px-6 sm:py-5">
                <dt class="text-sm font-medium leading-5 text-neutral-300">Query parameters</dt>

                <dd class="mt-1 whitespace-pre-wrap text-sm leading-5 text-neutral-100 sm:col-span-2 sm:mt-0">
                  <div class="inline-block min-w-full overflow-hidden overflow-x-auto border-2 border-neutral-900 align-middle sm:rounded-lg">
                    <table class="min-w-full">
                      <thead>
                        <tr>
                          <th class="bg-neutral-900 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-neutral-300">
                            Query
                          </th>
                          <th class="bg-neutral-900 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-neutral-300">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-neutral-800">
                        <For each={Object.entries<string>(introspect.query)}>
                          {([query, value]) => (
                            <tr>
                              <td class="whitespace-no-wrap border-t-2 border-neutral-900 px-6 py-4 text-sm font-medium leading-5 text-neutral-100">
                                {decodeURI(query)}
                              </td>
                              <td class="break-all border-t-2 border-neutral-900 px-6 py-4 text-sm leading-5 text-neutral-300">
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
}

export default Home;
