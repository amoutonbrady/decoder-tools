module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    mode: "layers",
    layers: ["base", "components", "utilities"],
    content: ["src/**/*.html", "src/**/*.tsx"],
  },
  // purge: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
  experimental: "all",
};
