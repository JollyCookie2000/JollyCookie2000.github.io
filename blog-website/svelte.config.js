import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// https://svelte.dev/docs/kit/adapter-static
		adapter: adapter({
			pages: 'build', // Target build directory
			assets: 'build', // Target build directory
			fallback: null, // Fallback page in case of error
			precompress: false, // Pre-compress files with brotli and gzip
			strict: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/jollycookie2000.github.io' : '',
		}
	}
};

export default config;
