// lib/request.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { hashSHA256 } from "@/utils";

const baseURL =
  typeof window === "undefined"
    ? process.env.SERVER_API_BASE_URL // 服务端使用
    : process.env.NEXT_PUBLIC_API_BASE_URL; // 客户端使用

/**
 * 创建 axios 实例
 */
const request: AxiosInstance = axios.create({
  baseURL, // 支持环境变量配置
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可在这里统一附加 token
    const token = typeof window !== "undefined" ? localStorage.getItem(hashSHA256('accessToken')) : null;
    if (token && config.headers) {
      config.headers.Token = token;
      // 统一处理额外请求头
      // config.headers["X-Requested-With"] = "XMLHttpRequest";
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status } = response;
    
    if (status !== 200) {
      console.error(`[API Error] ${data.message}`);
      return Promise.reject(data);
    }

    if (data.code === 11002 && !window.location.href.includes('/auth/')) {
      window.location.href = `/auth/login?redirect_uri=${encodeURIComponent(window.location.href)}`;
    }
    
    // 后端返回 { code, data, message } 时可在这里统一解析
    return data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          console.warn("No Authorization");
          if (typeof window !== "undefined") {
            localStorage.removeItem(hashSHA256('accessToken'));
          }
          break;
        case 403:
          console.error("Forbidden");
          break;
        case 500:
          console.error("Internal Server Error");
          break;
        default:
          console.error(`HTTP Error: ${status}`);
      }
    } else {
      console.error("Network Error or Server Unresponsive");
    }
    return Promise.reject(error);
  }
);

export type ResponseData<T> = {
  code: number;
  data: T;
  message: string;
};

/**
 * 简化的请求方法封装
 */
export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
  request.get(url, { params, ...config }) as Promise<ResponseData<T>>;

export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => 
  request.post(url, data, config) as Promise<ResponseData<T>>;

export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  request.put(url, data, config) as Promise<ResponseData<T>>;

export const del = <T = any>(url: string, config?: AxiosRequestConfig) =>
  request.delete(url, config) as Promise<ResponseData<T>>;

export default request;
