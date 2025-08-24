export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	delay: number,
) {
	let timer: number | null = null;

	return function (this: unknown, ...args: Parameters<T>) {
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = window.setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}

export function getRequest() {
	const url = location.search;
	const jsonList: Record<string, any> = {};
	if (url.indexOf('?') != -1) {
		const str = url.slice(url.indexOf('?') + 1);
		const strs = str.split('&');
		for (let i = 0; i < strs.length; i++) {
			const key = strs[i]?.split('=')?.[0];
			const value = strs[i]?.split('=')?.[1];
			if (key && value) {
				jsonList[key] = value;
			}
		}
	}
	return jsonList;
}

export function getQueryString(name: string) {
	//根据字段看网址是否拼接&字符串
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	const r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]!);
	return null;
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

export const throttle = (fn: Function, interval: number) => {
	let canRun = true;
	return function () {
		if (!canRun) return;
		canRun = false;
		setTimeout(function () {
			// @ts-ignore
			fn.apply(this, arguments);
			canRun = true;
		}, interval || 300);
	};
};
export const isNullOrUndefined = (obj: any) => {
	return obj === null || obj === undefined;
};

// export const dateFormat = (date: string | Date = new Date(), type="YYYY-MM-DD HH:mm:ss")=> {
//     if (typeof date === "string") {
//         date = date.replace(/-/g,"/");
//     }
//     let time = moment(new Date(date)).format(type);
//     return time;
// }

export const RandomColor = () => {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return {
		r,
		g,
		b,
	};
};

export const randomInt = (min: number, max: number) => {
	return Math.ceil(Math.random() * (max - min)) + min;
};

export const isWindows = () => {
	let agent = navigator.userAgent.toLowerCase();
	let flag = false;
	//let isMac = /macintosh|mac os x/i.test(navigator.userAgent);
	if (
		agent.indexOf('win32') >= 0 ||
		agent.indexOf('wow32') >= 0 ||
		agent.indexOf('win64') >= 0 ||
		agent.indexOf('wow64') >= 0
	) {
		flag = true;
	}
	return flag;
};

export const isMobile = () => {
	const ua = navigator.userAgent;
	const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	const isAndroid = ua.match(/(Android)\s+([\d.]+)/);
	const width = window.innerWidth;
	const isMobile = isIphone || isAndroid || width < 1000;
	//判断
	return isMobile;
};

export const isNumber = (value: any) => {
	return typeof value === 'number' && !isNaN(value);
};

export const timeOut = (call: Function, time: number) => {
	let timer: number | null = window.setTimeout(() => {
		if (timer !== null) {
			clearTimeout(timer);
			timer = null;
			call();
		}
	}, time);
	return timer;
};

export const getBase64 = (file: File) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

export const trim = (s: string) => {
	return s.replace(/(^\s*)|(\s*$)/g, '');
};

export const shareTowebo = (
	title: string,
	url: string,
	picurl: string,
	summary = '',
) => {
	let sharesinastring = `http://v.t.sina.com.cn/share/share.php?url=${url}&title=${title}&content=utf-8&sourceUrl=${url}&pic=${picurl}&summary=${summary}`;
	window.open(sharesinastring);
};
export const shareToQq = (
	title: string,
	url: string,
	picurl: string,
	summary = '',
) => {
	let shareqqstring = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&pics=${picurl}&summary=${summary}`;
	window.open(shareqqstring);
};
export const shareToQqZone = (
	title: string,
	url: string,
	picurl: string,
	summary = '',
) => {
	let shareqqzonestring = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&pics=${picurl}&summary=${summary}`;
	window.open(shareqqzonestring);
};

export const getClientHeight = () => {
	let clientHeight = 0;
	if (document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight =
			document.body.clientHeight < document.documentElement.clientHeight
				? document.body.clientHeight
				: document.documentElement.clientHeight;
	} else {
		clientHeight =
			document.body.clientHeight > document.documentElement.clientHeight
				? document.body.clientHeight
				: document.documentElement.clientHeight;
	}
	return clientHeight;
};
export const getScrollHeight = () => {
	return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
	);
};

/**
 * 截取指定字节长度字符串
 * @param {string} str 截取的字符串
 * @param {number} L 截取字节长度
 */
export const cutStr = (str: string, L: number) => {
	let result = '',
		strlen = str.length, // 字符串长度
		chrlen = str.replace(/[^\x00-\xff]/g, '**').length; // 字节长度

	if (chrlen <= L) {
		return str + '...';
	}
	for (let i = 0, j = 0; i < strlen; i++) {
		let chr = str.charAt(i);
		if (/[\x00-\xff]/.test(chr)) {
			j++; // ascii码为0-255，一个字符就是一个字节的长度
		} else {
			j += 2; // ascii码为0-255以外，一个字符就是两个字节的长度
		}
		if (j <= L) {
			// 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
			result += chr;
		} else {
			// 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
			return result + '...';
		}
	}
};
