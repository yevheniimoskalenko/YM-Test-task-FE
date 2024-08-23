<script setup lang="ts">
defineComponent({
	name: 'LayoutDefault',
});
</script>

<template>
	<main class="mx-auto max-w-4xl">
		<!-- header -->
		<slot />
		<!-- footer -->
	</main>
</template>
