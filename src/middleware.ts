import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from '@/lib/cookieServer';
import { api } from "./services/api";

export async function middleware(req: NextRequest, res: NextResponse) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/_next") || pathname === "/") {
        return NextResponse.next();
    }

    const token = getCookieServer();

    const route = pathname.startsWith("/signup") || pathname.startsWith("/");
    /* Vai retornar true se no caminho e false em qualquer outro. */

    if (!route) {
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url))
        }

        const validToken = await validateToken(token);

        if (!validToken) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    return NextResponse.next();
}

async function validateToken(token: string) {
    if (!token) return false;

    try {
        await api.get("/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}