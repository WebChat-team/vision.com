// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `http://api.vision.com:3000/user/channel/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com"
            }
        }
    );

}
export async function POST(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `http://api.vision.com:3000/user/channel/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com"
            }
        }
    );

}
export async function DELETE(request: Request) {

    const { searchParams } = new URL(request.url);

    return await fetchNext(
        `http://api.vision.com:3000/user/channel/subscriptions?channel_id=${searchParams.get("channel_id")}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com"
            }
        }
    );

}