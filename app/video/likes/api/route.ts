// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://${process.env.NEXT_PUBLIC_S3_STORAGE_ADDRESS}/video/likes?video_id=${searchParams.get("video_id")}&is_like=${searchParams.get("is_like")}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            }
        }
    );

}
export async function POST(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://${process.env.NEXT_PUBLIC_S3_STORAGE_ADDRESS}/video/likes?video_id=${searchParams.get("video_id")}&is_like=${searchParams.get("is_like")}`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            }
        }
    );

}
export async function DELETE(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://${process.env.NEXT_PUBLIC_S3_STORAGE_ADDRESS}/video/likes?video_id=${searchParams.get("video_id")}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            }
        }
    );

}