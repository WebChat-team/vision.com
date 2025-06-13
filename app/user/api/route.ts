import fetchNext from "@/shared/lib/fetch";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

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