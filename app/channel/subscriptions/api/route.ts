// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `${process.env.API_SERVER_ADDRESS}/user/channel/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.HOST}:${process.env.PORT}`
            }
        }
    );

}
export async function POST(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `${process.env.API_SERVER_ADDRESS}/user/channel/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.HOST}:${process.env.PORT}`
            }
        }
    );

}
export async function DELETE(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `${process.env.API_SERVER_ADDRESS}/user/channel/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.HOST}:${process.env.PORT}`
            }
        }
    );

}