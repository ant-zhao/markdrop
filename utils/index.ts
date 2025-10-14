// utils/getPathname.ts
import { headers } from "next/headers";

/**
 * 获取当前请求的 pathname
 * - 可在 Server Component 中使用
 * - 刷新、SSR、SSG 均可
 */
export async function getPathname(): Promise<string> {
  try {
    const h = await headers();

    // 尝试从标准 headers 获取完整 URL
    const host = h.get("host");
    const proto = h.get("x-forwarded-proto") || "http";

    if (!host) return "/";

    // 1. 如果存在自定义 x-invoke-path（Vercel Edge Function）
    const invokePath = h.get("x-invoke-path");
    if (invokePath) return new URL(invokePath, `${proto}://${host}`).pathname;

    // 2. 尝试使用 referer
    const referer = h.get("referer");
    if (referer) return new URL(referer).pathname;

    // 3. fallback: 直接使用 SSR 请求的 url
    // headers 中的 ":path" 是 Node.js/Edge 特有，可用作最后 fallback
    const rawPath = h.get(":path") || "/";
    return new URL(rawPath, `${proto}://${host}`).pathname;
  } catch (err) {
    console.warn("getPathname error:", err);
    return "/";
  }
}
