<template>
	<div :class="['header-box pr', isStance ? 'stance' : '']">
		<div
			:class="['header pa', scrollTop > 60 && !direct ? 'move' : '']"
			:style="`background-color: ${scrollTop > 60 && !direct ? mvBgColor : bgColor}`"
		>
			<div class="header-content al-center justBet container">
				<div class="left al-center">
					<h1><NuxtLink class="db" to="/" /></h1>
					<p>一站式信用问题服务平台</p>
				</div>
				<div class="al-center menus ac">
					<div
						v-for="(item, i) in menusList"
						:key="i"
						class="menus-item al-center"
					>
						<NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
					</div>
				</div>
			</div>
		</div>
		<div
			class="scrollbar"
			:style="`width: ${(scrollTop * 100) / (windowScrollHeight - windowHeight)}%;`"
		></div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue';
	import { useCommonStore } from '~/stores/common';
	import { getClientHeight, getScrollHeight } from '~/utils/index';

	interface MenuItem {
		name: string;
		path: string;
	}

	// props
	const props = defineProps({
		bgColor: { type: String, default: '#202020' },
		mvBgColor: { type: String, default: 'rgba(32, 32, 32, 0.8)' },
		isStance: { type: Boolean, default: true },
	});

	// store
	const commonStore = useCommonStore();
	const { scrollTop, windowHeight, windowScrollHeight, direct, changeState } =
		commonStore;

	// data
	const menusList = ref<MenuItem[]>([
		// { name: '首页', path: '/' },
		// { name: '解决方案', path: '/solution' },
		// { name: '新闻', path: '/news-1' },
		// { name: '合作', path: '/hezuo' },
		// { name: '我们', path: '/us' },
	]);

	// scroll handler
	function scrollFunc() {
		const st =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop;
		changeState({ key: 'scrollTop', value: st });
		changeState({ key: 'windowHeight', value: getClientHeight() });
		changeState({ key: 'windowScrollHeight', value: getScrollHeight() });
	}

	function goScroll() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMounted(() => {
		scrollFunc();
		window.addEventListener('scroll', scrollFunc, true);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', scrollFunc, true);
	});
</script>

<style lang="less" scoped>
	.header-box {
		width: 100%;
		&.stance {
			height: 60px;
			background-color: rgb(32, 32, 32);
		}
		.header {
			width: 100%;
			height: 60px;
			transition: background 0.3s;
			z-index: 20;
			&.move {
				box-shadow: 0 5px 60px 0 var(--shadowColor);
			}
			.header-content {
				height: 60px;
				.line {
					width: 2px;
					height: 40px;
					margin: 0 20px;
					background: var(--activeColor);
				}
				.left {
					h1 {
						width: 164px;
						height: 55px;
						margin-bottom: 0;
						// a {
						// 	width: 100%;
						// 	height: 100%;
						// 	background: url('~@/assets/imgs/logo.png') no-repeat center/auto
						// 		100%;
						// }
					}
					p {
						font-size: 20px;
						color: var(--activeColor);
					}
				}
				.menus {
					&-item {
						font-size: 18px;
						padding: 0 32px;
						a {
							color: #ffffff;
							&:hover,
							&.nuxt-link-exact-active {
								color: var(--activeColor);
							}
						}
					}
				}
			}
		}
		.scrollbar {
			background: orange;
			position: fixed;
			top: 0;
			height: 3px;
			transition: all 0.5s;
			z-index: 99999;
		}
	}
	@keyframes float {
		0% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-6px);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
