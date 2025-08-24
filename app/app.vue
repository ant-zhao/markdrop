<template>
	<div class="markdrop">
		<Header />
		<NuxtLayout :key="route.fullPath">
			<NuxtPage />
		</NuxtLayout>
		<Footer />
	</div>
</template>
<script lang="ts" setup>
	import Header from '~/components/header.vue';
	import Footer from '~/components/footer.vue';

	const route = useRoute();
</script>
<style lang="less"></style>
