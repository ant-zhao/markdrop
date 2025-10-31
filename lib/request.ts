// lib/request.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * 创建 axios 实例
 */
const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api", // 支持环境变量配置
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
    const token = typeof window !== "undefined" ? localStorage.getItem("Authorization") : null;
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
    // 后端返回 { code, data, message } 时可在这里统一解析
    const { data } = response;

    if (data?.code && data.code !== 200) {
      console.error(`[API Error] ${data.message}`);
      return Promise.reject(data);
    }

    return data?.data ?? data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          console.warn("No Authorization");
          if (typeof window !== "undefined") {
            localStorage.removeItem("Authorization");
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

type ResponseData<T> = {
  code: number;
  data: T;
  message: string;
};

/**
 * 简化的请求方法封装
 */
export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
  request.get<ResponseData<T>>(url, { params, ...config });

export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  request.post<ResponseData<T>>(url, data, config);

export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  request.put<ResponseData<T>>(url, data, config);

export const del = <T = any>(url: string, config?: AxiosRequestConfig) =>
  request.delete<ResponseData<T>>(url, config);

export default request;
