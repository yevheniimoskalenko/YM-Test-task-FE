<script setup lang="ts">
const route = useRoute();
const { $api } = useNuxtApp();
const { plainText } = useUtils();
definePageMeta({
	validate: async (r) => {
		const id = r.params.id;
		return typeof id === 'string' && /^\d+$/.test(id);
	},
});
const showModal = ref(false);
const select = ref({});
const { data } = await useAsyncData('movie', () => $api(`/movies?movie_id=${route?.params?.id}`));
const { data: sessions } = await useAsyncData('movies', () => $api(`/movieShows?movie_id=${route?.params?.id}`));
const movie = computed(() => (data.value?.data?.data?.length ? data.value.data.data[0] : null));
useServerSeoMeta({
	title: movie.value.name,
	ogTitle: movie.value.name,
	description: plainText(movie.value.description),
	ogDescription: plainText(movie.value.description),
	robots: 'index, follow',
});
useHead({
	title: movie.value.name,
	ogTitle: movie.value.name,
	description: plainText(movie.value.description),
	ogDescription: plainText(movie.value.description),
	robots: 'index, follow',
});
if (!movie.value) {
	showError({ statusCode: 404, statusMessage: 'Movie Not Found' });
}

function selectSession(time: string, date: string, title: string) {
	showModal.value = true;
	select.value = {
		time,
		date,
		title,
	};
}
</script>

<template>
	<section>
		<div class="grid sm:grid-cols-2">
			<div class="lg:max-w-sm object-cover">
				<img
					:src="movie.image"
					:alt="movie.name"
					class="w-full h-full"
				/>
			</div>
			<div>
				<div v-html="movie.additional" />
			</div>
		</div>
		<div class="mt-5">
			<div v-html="movie.description" />
		</div>
		<div>
			<h2>Обрати сесію</h2>
			<div
				v-for="(session, index) in sessions.data.data"
				:key="index"
			>
				<div
					v-for="item in session"
					:key="item.showdate"
					class="grid grid-cols-10 border-b py-4"
				>
					<span class="col-span-1">{{ item.showdate }}</span>
					<div class="col-span-9 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9">
						<Button
							v-for="time in item?.daytime?.split(';')"
							:key="time"
							@click="selectSession(time, item.showdate, movie.name)"
						>
							{{ time }}
						</Button>
					</div>
				</div>
			</div>
		</div>
		<Screen
			v-model="showModal"
			:data="select"
		/>
	</section>
</template>
