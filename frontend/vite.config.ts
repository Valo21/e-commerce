import { resolve } from "path";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const root = resolve(__dirname, 'src')

export default defineConfig(({mode})=> {
  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@src": resolve(root),
        "@lib": resolve(root, "lib"),
        "@components": resolve(root, "components"),
        "@store": resolve(root, "store"),
        "@hooks": resolve(root, "hooks"),
        "@pages": resolve(root, "pages"),
        "@assets": resolve(root, "assets"),
      }
    }
  }

  if (mode == 'development') {
    config.server = {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '/uploads': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      }
    }
  }
  return config;
})
