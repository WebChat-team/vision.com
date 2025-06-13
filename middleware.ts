// imports ================================================== //
import transferCookieToClient from "@/shared/lib/transferCookieToClient";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// main ===================================================== //
export default async function middleware(request: NextRequest) {

    const { pathname } = new URL(request.url);
    const responseNext = NextResponse.next();

    if (pathname.endsWith("/api")) return responseNext;

    // 1. проверка наличия и подлинности access токена
    const accessToken = request.cookies.get("access_token");
    if (accessToken) {

        const responseAuthServer = await fetch(
            `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/auth/is_valid_access_token.php`,
            {
                method: "POST",
                headers: {
                    "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token: accessToken.value })
            }
        );

        if (responseAuthServer.ok) {
            transferCookieToClient(responseNext.cookies, responseAuthServer.headers.getSetCookie());
        } else {
            responseNext.cookies.delete("access_token");
        }

    }

    // 2. проверка наличия и подлинности refresh токена. обновление токенов
    const refreshToken = request.cookies.get("refresh_token");
    if (!responseNext.cookies.has("access_token") && refreshToken) {

        const responseAuthServer = await fetch(
            `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/auth/update_tokens.php`,
            {
                method: "POST",
                headers: {
                    "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    refresh_token: refreshToken.value
                })
            }
        );

        if (responseAuthServer.ok) {
            transferCookieToClient(responseNext.cookies, responseAuthServer.headers.getSetCookie());
        }

    }

    return responseNext;

};

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}