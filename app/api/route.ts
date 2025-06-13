"use server"

// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET() {

    return await fetchNext(
        `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/user/user?detail=account`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            }
        }
    );

}
