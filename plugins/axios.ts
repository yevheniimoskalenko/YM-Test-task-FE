import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
	const { start, finish } = useLoadingIndicator({});

	const env = useRuntimeConfig();
	const BaseURL = env.public.BaseURL;

	const api = axios.create({
		baseURL: BaseURL,
	});

	api.interceptors.request.use(
		(config) => {
			start();
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	api.interceptors.response.use(
		(response) => {
			finish();
			return {
				data: response.data,
				status: response.status,
			};
		},
		async (error) => {
			finish();
			return Promise.reject(error);
		},
	);
	nuxtApp.provide('api', api);
});
