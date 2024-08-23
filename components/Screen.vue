<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute();
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	data: {
		type: Object,
		default: null,
	},
});
const error = ref(null);
const response = ref(null);
const activeSeat = ref({ row: null, col: null });
const inputValue = computed({
	get: () => props.modelValue,
	set: (value: boolean) => emit('update:modelValue', value),
});
function closeModal() {
	inputValue.value = false;
	error.value = null;
	response.value = null;
	activeSeat.value = { row: null, col: null };
}

const checkPlace = async (row: number, seat: number) => {
	try {
		const { data, status } = await $api({
			url: '/bookPlace',
			method: 'POST',
			data: {
				movie_id: +route.params.id,
				row: row,
				seat: seat,
				showdate: props.data.date,
				daytime: props.data.time,
			},
		});
		if (status === 200) {
			response.value = data.data;
			activeSeat.value = { row: row, col: seat };
			error.value = null;
		}
	} catch (err) {
		console.error('Error: problem Check for free places', err);
		error.value = err.response.statusText;
	}
};
</script>

<template>
	<Teleport to="body">
		<HeadlessTransitionRoot
			appear
			:show="inputValue"
			as="template"
		>
			<HeadlessDialog
				as="div"
				class="relative z-10"
				:open="inputValue"
				@close="closeModal"
			>
				<HeadlessTransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black/25" />
				</HeadlessTransitionChild>

				<div class="fixed inset-0 overflow-y-auto">
					<div class="flex min-h-full items-center justify-center p-4 text-center">
						<HeadlessTransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95"
						>
							<HeadlessDialogPanel
								class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
							>
								<HeadlessDialogTitle
									as="h3"
									class="text-lg font-medium leading-6 text-gray-900"
								>
									{{ data.title }}
								</HeadlessDialogTitle>
								<div class="mt-2">
									<div class="flex items-center justify-around">
										<button class="flex items-center gap-x-2 border px-3 py-2 rounded-md">
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
													d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
												/>
											</svg>
											<span> {{ data.date }}</span>
										</button>
										<button class="flex items-center gap-x-2 border px-3 py-2 rounded-md">
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
													d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
												/>
											</svg>
											<span>{{ data.time }}</span>
										</button>
									</div>
									<div class="text-center">
										<h1>Екран</h1>
									</div>
									<div class="screen" />
									<div class="mt-5">
										<div
											v-for="(row, index) in 12"
											:key="index"
											class="grid grid-cols-[repeat(auto-fit,minmax(30px,1fr))] gap-x-1"
										>
											<span>{{ ++index }}</span>
											<Button
												v-for="(col, idx) in 15"
												:key="idx"
												class="w-full bg-red-300 my-1 rounded-md hover:text-red-600 hover:bg-red-400"
												:class="{
													'bg-green-400': activeSeat.row === row && activeSeat.col === col,
												}"
												@click="checkPlace(row, col)"
											>
												{{ col }}
											</Button>
										</div>
										<div class="mt-3">
											<div
												v-if="error"
												class="text-2xl flex w-full bg-red-100 p-2 justify-between items-center"
											>
												<span>{{ error }}</span>
												<button @click="error = null">
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
															d="M6 18 18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</div>
											<div
												v-else-if="response"
												class="text-2xl flex w-full bg-green-100 p-2 justify-between items-center"
											>
												<span>seat is booking - {{ response.ticketkey }}</span>
												<button @click="response = null">
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
															d="M6 18 18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</div>
										</div>
									</div>
								</div>
							</HeadlessDialogPanel>
						</HeadlessTransitionChild>
					</div>
				</div>
			</HeadlessDialog>
		</HeadlessTransitionRoot>
	</Teleport>
</template>
