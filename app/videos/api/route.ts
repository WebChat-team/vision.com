// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `http://s3.vision.com:3002/videos?search_query=${searchParams.get("search_query")}&limit=${searchParams.get("limit")}&offset=${searchParams.get("offset")}${searchParams.has("by_user_id") ? `&by_user_id=${searchParams.get("by_user_id")}` : ""}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com:3000"
            }
        }
    );

}
