import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "safari-pinned-tab.svg"],
      manifest: {
        dir: "ltr",
        lang: "English",
        name: "URL Inspector",
        short_name: "URL Inspector",
        scope: "/",
        display: "standalone",
        start_url: "/",
        background_color: "#e74694",
        theme_color: "#e74694",
        description:
          "Small set of tools to inspect an URL (a GUI for new URL(...)), decode/encode base64 (a GUI for atob(...) & btoa(...)) and decode JWT.",
        orientation: "portrait",
        prefer_related_applications: false,
        icons: [
          {
            src: "/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/1280x800.png",
            sizes: "1280x800",
            type: "image/png",
          },
          {
            src: "/screenshots/750x1334.png",
            sizes: "750x1334",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
