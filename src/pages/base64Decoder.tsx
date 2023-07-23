import { createEffect, createSignal, onCleanup } from 'solid-js';

type Event = InputEvent & {
  target: HTMLTextAreaElement;
  currentTarget: HTMLTextAreaElement;
};

function useSyncHeight(el1: HTMLElement, el2: HTMLElement) {
  const obs1 = new MutationObserver(() => (el1.style.height = el2.offsetHeight + 'px'));
  obs1.observe(el2, {
    attributes: true,
    attributeFilter: ['style'],
  });

  const obs2 = new MutationObserver(() => (el2.style.height = el1.offsetHeight + 'px'));
  obs2.observe(el1, {
    attributes: true,
    attributeFilter: ['style'],
  });

  onCleanup(() => {
    obs1.disconnect();
    obs2.disconnect();
  });
}

function Base64Decoder() {
  let encodedRef: HTMLTextAreaElement;
  let originalRef: HTMLTextAreaElement;

  const [encoded, setEncoded] = createSignal('');
  const [original, setOriginal] = createSignal('');

  createEffect(() => useSyncHeight(originalRef, encodedRef));

  function handleOriginal(event: Event) {
    const original = event.target.value;
    const encoded = btoa(event.target.value);

    setEncoded(encoded);
    setOriginal(original);
  }

  function handleEncoded(event: Event) {
    const encoded = event.target.value;
    const original = atob(event.target.value);

    setEncoded(encoded);
    setOriginal(original);
  }

  return (
    <div class="row-gap-6 col-gap-4 mt-6 grid grid-cols-1 space-x-2 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label
          for="original"
          class="block py-2 text-center text-sm font-medium leading-5 text-neutral-200"
        >
          Original text
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <textarea
            id="original"
            rows="10"
            value={original()}
            onInput={handleOriginal}
            class="form-textarea mt-1 block w-full border-0 bg-neutral-800 font-mono text-neutral-200 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            ref={originalRef}
          ></textarea>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label
          for="encoded"
          class="block py-2 text-center text-sm font-medium leading-5 text-neutral-200"
        >
          Base64 encoded text
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <textarea
            id="encoded"
            rows="10"
            value={encoded()}
            onInput={handleEncoded}
            class="form-textarea mt-1 block w-full border-0 bg-neutral-800 font-mono text-neutral-200 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            ref={encodedRef}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Base64Decoder;
