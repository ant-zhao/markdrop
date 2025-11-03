import { MD5, SHA256 } from "crypto-js";

export function md5(str: string): string {
  return MD5(str).toString();
}


export function hashSHA256(data: string) {
  return SHA256(data).toString();
}