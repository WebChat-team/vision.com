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
        "http://api.vision.com:3000/auth/terminate_session.php",
        {
            method: "DELETE",
            headers: {
                "Origin": "http://vision.com",
                "Authorization": `Bearer ${token}`
            },
        }
    );

    return response;

}