import { For } from 'solid-js';
import { A, useNavigate, useLocation } from '@solidjs/router';

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      slug: '/',
      name: 'URL inspector',
    },
    {
      slug: '/base64-decoder',
      name: 'Base64 Decoder',
    },
    {
      slug: '/jwt-decoder',
      name: 'JWT Decoder',
    },
  ];

  return (
    <header>
      <div class="sm:hidden">
        <select
          aria-label="Selected tab"
          class="form-select block w-full"
          onChange={(event) => navigate(event.currentTarget.value)}
          value={location.pathname}
        >
          <For each={links}>{(link) => <option value={link.slug}>{link.name}</option>}</For>
        </select>
      </div>

      <div class="hidden sm:block">
        <nav class="flex">
          <For each={links}>
            {(link) => (
              <A
                href={link.slug}
                class="flex-1 border-b-2 border-neutral-400 px-1 py-4 text-center text-sm font-medium leading-5 text-neutral-300 hover:border-pink-200 hover:text-pink-200 focus:border-pink-900 focus:bg-pink-900 focus:bg-opacity-25 focus:outline-none"
                activeClass="!border-pink-500 !text-pink-400"
              >
                {link.name}
              </A>
            )}
          </For>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
