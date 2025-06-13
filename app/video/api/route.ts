
// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://s3.vision.com:3002/info?id=${searchParams.get("id")}`,
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

    return await fetchNext("http://s3.vision.com:3002/video", {
        method: "POST",
        credentials: "include",
        headers: {
            "Origin": "http://vision.com",
            'Content-Type': 'multipart/form-data'
        },
        body: await request.formData(),
        // @ts-ignore
        duplex: "half",
    });

}
export async function PUT(request: Request) {

    return await fetchNext("http://s3.vision.com:3002/video", {
        method: "PUT",
        credentials: "include",
        headers: {
            "Origin": "http://vision.com",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(await request.json()),
    });

}