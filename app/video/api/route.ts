
// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);

    return await fetchNext(
        `http://${process.env.NEXT_PUBLIC_S3_STORAGE_ADDRESS}/info?id=${searchParams.get("id")}`,
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

    return await fetchNext(`http://${process.env.NEXT_PUBLIC_S3_STORAGE_ADDRESS}/video`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
        },
        body: await request.formData(),
        // @ts-ignore
        duplex: "half",
    });

}
export async function PUT(request: Request) {

    return await fetchNext(`http://${process.env.NEXT_PUBLIC_S3_STORAGE_ADDRESS}/video`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(await request.json()),
    });

}