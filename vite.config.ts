import { UserConfig } from "vite";
import { solidPlugin } from "@amoutonbrady/vite-plugin-solid";

const config: UserConfig = {
  root: "src",
  outDir: "dist",
  serviceWorker: false,
  plugins: [solidPlugin()],
  enableEsbuild: false,
  rollupInputOptions: {
    external: ["https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate"],
  },
};

export default config;
