<script setup lang="ts">
import Search from '@/components/Search';

interface Movie {
	id: number;
	title: string;
	// інші поля фільму
}

type MovieApiResponse = ApiResponse<Movie[]>;
const { $api } = useNuxtApp();
const { plainText } = useUtils();
const { genres } = useGenres();
useServerSeoMeta({
	title: 'Cinema',
	ogTitle: 'Cinema',
	description: 'Cinema',
	ogDescription: 'Cinema',
	robots: 'index, follow',
});
useHead({
	title: 'Cinema',
	ogTitle: 'Cinema',
	description: 'Cinema',
	ogDescription: 'Cinema',
	robots: 'index, follow',
});
const { data } = await useAsyncData('movies', () => $api('/movies'));

const searchResult = (result: MovieApiResponse) => {
	data.value = result;
};
</script>

<template>
	<div class="relative">
		<Search
			class="sticky top-0 bg-white"
			@search-result="searchResult"
		/>
		<section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<template v-if="data.data?.error_code == 0 && data.data.data.length > 0">
				<article
					v-for="movie in data.data.data"
					:key="movie.id"
				>
					<div class="overflow-hidden">
						<img
							:src="movie.image"
							:alt="movie.name"
							class="w-full h-full"
						/>
					</div>
					<nuxt-link :to="{ name: 'movie-id', params: { id: movie.id } }">
						<h2>{{ movie.name }}</h2>
					</nuxt-link>
					<span>{{ genres[movie.genre].title }}</span>
				</article>
			</template>
			<template v-else>
				<h2>Пусто</h2>
			</template>
		</section>
	</div>
</template>
