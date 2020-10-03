import { Component, For } from "solid-js";
import { Link, useRouter } from "@amoutonbrady/solid-tiny-router";

const Nav: Component = () => {
  const [router, { push }] = useRouter();
  const links = [
    {
      slug: "",
      name: "URL inspector",
    },
    {
      slug: "base64-decoder",
      name: "Base64 Decoder",
    },
    {
      slug: "jwt-decoder",
      name: "JWT Decoder",
    },
  ];

  return (
    <div>
      <div class="sm:hidden">
        <select
          aria-label="Selected tab"
          class="form-select block w-full"
          onChange={(e) => push(e.target.value)}
          value={router.currentRoute.pathname}
        >
          <For each={links}>
            {(link) => <option value={`/${link.slug}`}>{link.name}</option>}
          </For>
        </select>
      </div>

      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex">
            <For each={links}>
              {(link) => (
                <Link
                  path={`/${link.slug}`}
                  class="w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm leading-5 focus:outline-none focus:bg-opacity-25 focus:bg-pink-900"
                  classList={{
                    "border-pink-500 text-pink-400":
                      router.currentRoute.pathname === `/${link.slug}`,
                    "border-transparent text-gray-100 hover:text-gray-200 hover:border-gray-300":
                      router.currentRoute.pathname !== `/${link.slug}`,
                  }}
                >
                  {link.name}
                </Link>
              )}
            </For>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;
