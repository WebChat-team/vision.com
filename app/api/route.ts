"use server"

// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET() {

    const response = await fetchNext(
        "http://api.vision.com:3000/user/info?detail=account",
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com:3000"
            }
        }
    );

    return response;

}
