import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      // workbox: {
      //   clientsClaim: true,
      //   skipWaiting: true
      // }
    })
  ],
  //enable @ as alias for src/
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  //autoload a scss file for all componenets (for variables and mixins)
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/global.scss";`,
      },
    },
  },
})
