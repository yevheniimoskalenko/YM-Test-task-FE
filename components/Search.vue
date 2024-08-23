<script setup lang="ts">
import Filter from '@/components/Filter';

const emit = defineEmits(['searchResult']);
const { $api } = useNuxtApp();
const form = ref({
	name: '',
	genres: {},
});
const searchHandler = async () => {
	try {
		const res = await $api({
			url: `/movies?name=${form.value?.name}${form.value?.genres?.value ? '&genres=' + form.value.genres.value : ''}`,
		});
		emit('searchResult', res);
	} catch (e) {
		console.error('Error search', e);
	}
};
</script>

<template>
	<form
		class="w-full flex p-3 gap-x-3 shadow-md"
		@submit.prevent="searchHandler"
	>
		<input
			v-model="form.name"
			class="w-full"
			type="text"
			placeholder="e.g. Дядя Ваня"
		/>
		<Filter v-model="form.genres" />
		<button type="submit">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
		</button>
	</form>
</template>
