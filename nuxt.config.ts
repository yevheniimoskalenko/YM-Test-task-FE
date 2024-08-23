// https://nuxt.com/docs/api/configuration/nuxt-config
const { BaseURL } = process.env
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [{ name: 'description', content: 'My amazing site.' }],
			script: [],
			link: [],
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	runtimeConfig: {
		public: {
			BaseURL,
		},
	},
	modules: ['nuxt-headlessui', '@nuxt/eslint'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},
	headlessui: {
		prefix: 'Headless',
	},
})
