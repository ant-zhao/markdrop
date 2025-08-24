// stores/common.ts
import { defineStore } from 'pinia';

interface UtilsState {
	loading: boolean;
	scrollTop: number;
	windowHeight: number;
	windowScrollHeight: number;
	isMobile: boolean;
	previewUrl: string;
	showPreview: boolean;
	direct: boolean;
	theme: string;
}

export const useCommonStore = defineStore('common', {
	state: () => ({
		loading: false,
		scrollTop: 0,
		windowHeight: 0,
		windowScrollHeight: 0,
		isMobile: false,
		previewUrl: '',
		showPreview: false,
		direct: true, // 1:向下滚动；0：向上
		theme: 'light',
	}),
	getters: {
		isDarkTheme: (state) => state.theme === 'dark',
	},
	actions: {
		changeState<K extends keyof UtilsState>({
			key,
			value,
		}: {
			key: K;
			value: any;
		}) {
			if (key == 'scrollTop') {
				const direct = value >= this.scrollTop;
				this.direct = direct;
			}
			this[key] = value;
		},
	},
});
