// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://s3.vision.com:3002/video/comments/total_length?video_id=${searchParams.get("video_id")}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Origin": "http://vision.com"
            }
        }
    );

}