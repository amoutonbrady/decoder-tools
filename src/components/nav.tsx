import { For } from 'solid-js';
import { Link, useNavigate, useLocation } from '@solidjs/router';

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
    <div>
      <div class="sm:hidden">
        <select
          aria-label="Selected tab"
          class="form-select block w-full"
          onChange={(e) => navigate(e.currentTarget.value)}
          value={location.pathname}
        >
          <For each={links}>{(link) => <option value={link.slug}>{link.name}</option>}</For>
        </select>
      </div>

      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex">
            <For each={links}>
              {(link) => (
                <Link
                  href={link.slug}
                  class="flex-1 border-b-2 px-1 py-4 text-center text-sm font-medium leading-5 focus:bg-pink-900 focus:bg-opacity-25 focus:outline-none"
                  classList={{
                    'border-pink-500 text-pink-400': location.pathname === link.slug,
                    'border-transparent text-gray-100 hover:text-gray-200 hover:border-gray-300':
                      location.pathname !== link.slug,
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
}

export default Nav;
