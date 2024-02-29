import {resolve} from 'path'
import { defineConfig, UserConfig } from "vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const root = resolve(__dirname, 'src')

export default defineConfig(({mode})=> {
  const commonConfig: UserConfig = {
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
        "@backend": resolve(root, "../src"),
      }
    }
  }

  if (mode == 'development') {
    return {
      ...commonConfig,
      server: {
        proxy: {
          '/api': 'http://localhost:3000/api',
        }
      },
    }
  }
})
