import fetchNext from "@/shared/lib/fetch";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `http://api.vision.com:3000/user/subscribers?user_id=${searchParams.get("user_id")}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com"
            }
        }
    );

}