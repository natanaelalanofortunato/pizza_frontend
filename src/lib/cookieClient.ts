import { getCookie, getCookies } from "cookies-next";

export function getCookieClient() {
    const token = getCookie("session");

    return token || null;
}
