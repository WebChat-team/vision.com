// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://s3.vision.com:3002/video/likes?video_id=${searchParams.get("video_id")}&is_like=${searchParams.get("is_like")}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com"
            }
        }
    );

}
export async function POST(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://s3.vision.com:3002/video/likes?video_id=${searchParams.get("video_id")}&is_like=${searchParams.get("is_like")}`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com"
            }
        }
    );

}
export async function DELETE(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://s3.vision.com:3002/video/likes?video_id=${searchParams.get("video_id")}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com"
            }
        }
    );

}