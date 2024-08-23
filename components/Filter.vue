<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
const { genres } = useGenres();
const props = defineProps({
	modelValue: {
		type: [String, Object],
		default: () => {},
	},
});
const inputValue = computed({
	get: () => props.modelValue,
	set: (value: object) => emit('update:modelValue', value),
});
</script>

<template>
	<HeadlessListbox v-model="inputValue">
		<div class="relative">
			<HeadlessListboxButton
				class="relative w-28 cursor-default rounded-lg border bg-white px-2 py-4 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
			>
				<span v-if="inputValue?.title" class="block truncate">{{ inputValue.title }}</span>
				<span v-else class="block truncate text-gray-400">Жанр</span>
			</HeadlessListboxButton>

			<transition
				leave-active-class="transition duration-100 ease-in"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<HeadlessListboxOptions
					class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
				>
					<HeadlessListboxOption
						v-for="[key, value] in Object.entries(genres)"
						v-slot="{ active, selected }"
						:key="key"
						:value="value"
						as="template"
					>
						<li
							:class="[
								active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
								'relative cursor-default select-none py-2 px-2',
							]"
						>
							<span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ value.title }}</span>
						</li>
					</HeadlessListboxOption>
				</HeadlessListboxOptions>
			</transition>
		</div>
	</HeadlessListbox>
</template>
