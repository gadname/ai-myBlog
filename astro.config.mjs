// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://your-domain.pages.dev', // Cloudflare PagesのURLに変更してください
	integrations: [mdx(), sitemap()],
	// 静的サイトジェネレーション（SSG）として設定
	output: 'static',
	// 環境変数の設定
	vite: {
		define: {
			'import.meta.env.MICROCMS_SERVICE_DOMAIN': JSON.stringify(process.env.MICROCMS_SERVICE_DOMAIN),
			'import.meta.env.MICROCMS_API_KEY': JSON.stringify(process.env.MICROCMS_API_KEY),
		},
	},
});
