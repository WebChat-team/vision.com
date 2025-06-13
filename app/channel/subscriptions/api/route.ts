// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/user/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            }
        }
    );

}
export async function POST(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/user/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            }
        }
    );

}
export async function DELETE(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/user/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            }
        }
    );

}