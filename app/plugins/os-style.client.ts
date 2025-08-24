import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin(() => {
	if (!/Macintosh|Mac OS X/i.test(navigator.userAgent)) {
		import('~/assets/style/scroll.css');
	}
});
