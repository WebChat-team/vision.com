import fetchNext from "@/shared/lib/fetch";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `${process.env.API_SERVER_ADDRESS}/user/subscribers?user_id=${searchParams.get("user_id")}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.HOST}:${process.env.PORT}`
            }
        }
    );

}