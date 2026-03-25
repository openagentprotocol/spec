import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleHttpError({ path, message }) {
				// Protocol artifacts (JSON schemas, OpenAPI specs) are static files
				// not SvelteKit routes — ignore 404s for them during prerender.
				if (path.startsWith('/v1/')) {
					console.warn(`Ignoring prerender 404 for static asset: ${path}`);
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
