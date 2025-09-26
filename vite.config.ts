import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/stores', // ✅ store'ları da otomatik ekler
      ],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.jsx', '.mjs'],
  },
  server: {
    port: 3001,
    headers: {
      'content-security-policy':
        "default-src 'self' blob: *;script-src 'self' 'unsafe-eval' blob: data: ;style-src 'self' 'unsafe-inline' fonts.googleapis.com;object-src 'none';img-src 'self' data: blob: *;font-src 'self' fonts.googleapis.com fonts.gstatic.com; worker-src 'self' blob: data:",
    },
  },
})
