// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";
// import transferCookieToClient from "@/shared/lib/transferCookieToClient";
// import { NextResponse } from "next/server";

// main ===================================================== //
export async function POST(req: Request) {

    const { email, password } = await req.json();

    return  await fetchNext(
        `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/user/register`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            },
            body: JSON.stringify({ email, password })
        }
    );

    // if (response.ok) {
    //     const responseRedirect = new NextResponse(JSON.stringify({ redirect_url: `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` }));
    //     transferCookieToClient(responseRedirect.cookies, response.headers.getSetCookie());
    //     console.log(response);
    //     return responseRedirect;
    // } else {
    //     return response;
    // }

}