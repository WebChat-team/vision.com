// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";
import { cookies } from "next/headers";

// main ===================================================== //
export async function DELETE() {

    const listCookies = cookies();
    const token = (
        listCookies.get("access_token")?.value ||
        listCookies.get("refresh_token")?.value
    );

    const response = await fetchNext(
        `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/auth/terminate_session.php`,
        {
            method: "DELETE",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
                "Authorization": `Bearer ${token}`
            },
        }
    );

    return response;

}