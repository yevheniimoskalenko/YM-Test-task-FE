/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
	],
	theme: {
		extend: {
			backgroundImage: {
				screen: 'linear-gradient(180deg, #1f293d 0%, rgba(31, 41, 61, 0) 100%)',
			},
		},
	},
	plugins: [],
};
