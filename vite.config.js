import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // 确保资源路径是相对路径，适配 Vercel 静态部署
  build: {
    outDir: 'dist',
  },
});
