// imports ================================================== //
import transferCookieToClient from "@/shared/lib/transferCookieToClient";
import { NextResponse } from "next/server";

// main ===================================================== //
export async function POST(req: Request) {

    const { email, password } = await req.json();

    const response = await fetch(
        "http://api.vision.com:3000/user/register",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://vision.com"
            },
            body: JSON.stringify({ email, password })
        }
    );

    if (response.ok) {
        const responseRedirect = new NextResponse(JSON.stringify({ redirect_url: "http://vision.com:3005" }));
        transferCookieToClient(responseRedirect.cookies, response.headers.getSetCookie());
        return responseRedirect;
    } else {
        return response;
    }

}