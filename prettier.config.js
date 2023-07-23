/**
 * @type {import('prettier').Options}
 */
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  htmlWhitespaceSensitivity: 'ignore',
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
};
