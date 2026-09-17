import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'TOEIC Flashcards - Học từ vựng thông minh',
    meta: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      description: 'Ứng dụng học từ vựng TOEIC dạng Flashcard tối ưu cho di động với Dark mode, phát âm và kiểm tra phản xạ.',
    },
    tags: [
      {
        tag: 'script',
        head: true,
        append: false,
        children: `(function(){try{var s=localStorage.getItem('toeic_theme');var d=s?s.indexOf('dark')!==-1:window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');document.documentElement.style.backgroundColor='#020617';}else{document.documentElement.classList.remove('dark');document.documentElement.style.backgroundColor='#f8fafc';}}catch(e){}})();`,
      },
    ],
  },
  server: {
    port: 3000,
  },
});
