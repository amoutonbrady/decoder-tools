import { Component, createEffect, createSignal, onCleanup } from "solid-js";

type Event = InputEvent & {
  currentTarget: HTMLTextAreaElement;
  target: HTMLTextAreaElement;
};

const useSyncHeight = (el1: HTMLElement, el2: HTMLElement) => {
  const obs1 = new MutationObserver(
    () => (el1.style.height = el2.offsetHeight + "px")
  );
  obs1.observe(el2, {
    attributes: true,
    attributeFilter: ["style"],
  });

  const obs2 = new MutationObserver(
    () => (el2.style.height = el1.offsetHeight + "px")
  );
  obs2.observe(el1, {
    attributes: true,
    attributeFilter: ["style"],
  });

  onCleanup(() => {
    obs1.disconnect();
    obs2.disconnect();
  });
};

const Base64Decoder: Component = () => {
  const [original, setOriginal] = createSignal("");
  const [encoded, setEncoded] = createSignal("");
  let originalRef: HTMLTextAreaElement;
  let encodedRef: HTMLTextAreaElement;

  createEffect(() => useSyncHeight(originalRef, encodedRef));

  const handleOriginal = (e: Event) => {
    setOriginal(e.target.value);
    setEncoded(btoa(e.target.value));
  };

  const handleEncoded = (e: Event) => {
    setEncoded(e.target.value);
    setOriginal(atob(e.target.value));
  };

  return (
    <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label
          for="original"
          class="block text-sm font-medium leading-5 text-gray-200"
        >
          Original text
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <textarea
            id="original"
            rows="10"
            value={original()}
            onInput={handleOriginal}
            class="mt-1 form-textarea text-gray-200 bg-gray-800 border-0 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            ref={originalRef}
          ></textarea>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label
          for="encoded"
          class="block text-sm font-medium leading-5 text-gray-200"
        >
          Base64 encoded text
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <textarea
            id="encoded"
            rows="10"
            value={encoded()}
            onInput={handleEncoded}
            class="mt-1 form-textarea text-gray-200 bg-gray-800 border-0 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            ref={encodedRef}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Base64Decoder;
