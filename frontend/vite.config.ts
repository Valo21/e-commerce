import {resolve} from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const root = resolve(__dirname, 'src')

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  build: {
    outDir: resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      "@frontend": resolve(root),
      "@lib": resolve(root, "lib"),
      "@components": resolve(root, "components"),
      "@store": resolve(root, "store"),
      "@hooks": resolve(root, "hooks"),
      "@pages": resolve(root, "pages"),
      "@assets": resolve(root, "assets")
    }
  }
})
