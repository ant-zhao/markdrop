<template>
	<div class="markdrop-container">
		<slot />
	</div>
</template>
<script lang="ts" setup>
	import { isMobile } from '~/utils/index';

	const commonStore = useCommonStore();
	const changeState = commonStore.changeState;
	const route = useRoute();

	const theme = computed(() => {
		return commonStore.theme;
	});

	onMounted(() => {
		changeState({ key: 'isMobile', value: isMobile() });
	});
</script>
<style lang="less" scoped></style>
