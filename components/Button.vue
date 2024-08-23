<template>
	<button
		v-bind="$attrs"
		class="hover:text-yellow-500"
	>
		<slot />
	</button>
</template>
