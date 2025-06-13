"use server"

// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET() {

    const response = await fetchNext(
        `${process.env.API_SERVER_ADDRESS}/user/user?detail=account`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.HOST}:${process.env.PORT}`
            }
        }
    );

    return response;

}
