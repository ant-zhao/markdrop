<template>
	<div class="flex flex-col min-h-screen">
		<Header />
		<main class="flex-1 flex flex-col text-center items-center justify-center">
			<template v-if="error">
				<h1
					class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]"
				>
					{{ error.statusCode }}
				</h1>
				<h2 class="font-semibold mb-2 sm:text-3xl text-2xl">
					{{ error.message }}
				</h2>
				<p v-if="error.statusMessage" class="mb-4 px-2 text-[#64748B] text-md">
					{{ error.statusMessage }}
				</p>
				<div class="flex items-center justify-center w-full">
					<nuxt-link to="/">Go back home</nuxt-link>
				</div>
			</template>
			<template v-else>
				<h1
					class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]"
				>
					Error
				</h1>
				<h2 class="font-semibold mb-2 sm:text-3xl text-2xl">
					Something went wrong
				</h2>
				<div class="flex items-center justify-center w-full">
					<nuxt-link to="/">Go back home</nuxt-link>
				</div>
			</template>
		</main>
		<Footer />
	</div>
</template>
<script lang="ts" setup>
	import { computed } from 'vue';
	import Header from '~/components/header.vue';
	import Footer from '~/components/footer.vue';
	import { useCommonStore } from '~/stores/common';

	const commonStore = useCommonStore();
	const error = useError();

	const theme = computed(() => {
		return commonStore.theme;
	});
	const changeState = commonStore.changeState;
</script>
<style lang="less" scoped>
	.error-content {
		min-height: calc(100vh - 232px);
		text-align: center;
	}
</style>
