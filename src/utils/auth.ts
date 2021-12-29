import { TokenKey } from "@/types/const/storage";
import { getCookie, setCookie, removeCookie } from "@/utils/cookie";

export function getToken() {
  return getCookie(TokenKey);
}

export function setToken(token: string) {
  return setCookie(TokenKey, token);
}

export function removeToken() {
  return removeCookie(TokenKey);
}
