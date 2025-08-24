// stores/user.ts
import { defineStore } from 'pinia';

interface UserState {
	token: string;
	info: null | { name: string; email: string };
}

export const useUserStore = defineStore('user', {
	state: (): UserState => ({
		token: '',
		info: null as null | { name: string; email: string },
	}),
	getters: {
		isLoggedIn: (state) => !!state.token,
	},
	actions: {
		setToken(token: string) {
			this.token = token;
		},
		setUserInfo(info: { name: string; email: string }) {
			this.info = info;
		},
		logout() {
			this.token = '';
			this.info = null;
		},
	},
});
