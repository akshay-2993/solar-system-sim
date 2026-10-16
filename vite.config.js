import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

const single = process.env.SINGLE === '1';

export default defineConfig({
  base: './',
  plugins: single ? [viteSingleFile({ removeViteModuleLoader: true })] : [],
  build: {
    target: 'es2019',
    assetsInlineLimit: single ? 1e9 : 4096,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 4000,
    rollupOptions: single ? { output: { inlineDynamicImports: true } } : {},
  },
});
