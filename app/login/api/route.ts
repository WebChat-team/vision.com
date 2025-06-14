// imports ================================================== //
import transferCookieToClient from "@/shared/lib/transferCookieToClient";
import { NextResponse } from "next/server";

// main ===================================================== //
export async function POST(req: Request) {

    const { email, password } = await req.json();

    const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/user/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "Application/json",
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            },
            body: JSON.stringify({ email, password })
        }
    );

    if (response.ok) {
        const responseRedirect = new NextResponse(JSON.stringify({ redirect_url: `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` }));
        transferCookieToClient(responseRedirect.cookies, response.headers.getSetCookie());
        return responseRedirect;
    } else {
        return response;
    }

}