import Cookies from "js-cookie";

export function getCookie(key: string): string {
  return Cookies.get(key) || "";
}

export function setCookie(
  key: string,
  value: string,
  config?: AnyObject
): void {
  const defaultConfig = {
    // domain: getDomain(),
  };
  if (config) {
    Cookies.set(key, value, Object.assign({}, defaultConfig, config));
  } else {
    Cookies.set(key, value, defaultConfig);
  }
}

export function removeCookie(key: string): void {
  Cookies.remove(key);
}
