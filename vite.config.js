import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'HaChromaUi',
      fileName: 'ha-chroma-ui',
      formats: ['es'],
    },
    rollupOptions: {
      // Bundle lit and other dependencies to ensure the custom card is self-contained
    },
    sourcemap: true,
  },
});
