import { defineConfig } from 'vite';
import readlist from './scripts/vite-plugin-readlist';

export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [
    readlist({
      contentDir: 'content',
      siteConfigPath: './readlist.config.js',
      typePaths: { book: 'book', movie: 'movie', tv: 'tv' },
      recentCount: 20
    })
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/entry.ts'
    }
  }
});


