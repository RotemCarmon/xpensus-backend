/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src')
    },
  },
});
