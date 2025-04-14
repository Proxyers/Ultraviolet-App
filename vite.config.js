import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // 确保基础路径是相对路径
  build: {
    outDir: 'dist',  // 输出目录为 dist
  },
})
