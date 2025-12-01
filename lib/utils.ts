import { hashSHA256 } from "@/utils";
import { CacheKey } from "@/utils/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 生成随机字符串（PKCE verifier）
function generateCodeVerifier() {
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// base64 URL 安全编码
function base64UrlEncode(str: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// 生成 code_challenge(S256)
async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(digest);
}

export const googleOAuthURL = async (redirectUri: string) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  // 生成 PKCE 参数
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // 存储 codeVerifier（登录回调时换token用）
  localStorage.setItem(hashSHA256(CacheKey.GOOGLE_CODE_VERIFIER), codeVerifier);

  const params = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    access_type: "offline",
    response_type: "code",
    prompt: "select_account",
    scope: "openid profile email",
    state: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  };

  return `${rootUrl}?${new URLSearchParams(params).toString()}`;
};
