// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	app: {
		head: {
			title: 'Mark Drop', // 默认备用标题
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-touch-fullscreen', content: 'yes' },
				{ name: 'flexible', content: 'maximum-dpr=2' },
				{ name: 'og:type', content: 'website' },
				{ name: 'keywords', content: `MarkDrop` },
				{ name: 'description', content: 'MarkDrop' },
			],
			link: [
				{ rel: 'stylesheet', id: 'theme', href: '/css/light.css' },
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
			],
			script: [
				{
					src: 'https://hm.baidu.com/hm.js?a9e1a4fe064bcc1669d59f20f4ce334a',
					type: 'text/javascript',
				},
			],
		},
	},
	css: ['~/assets/style/common.less'],
	modules: ['@pinia/nuxt'],
});
