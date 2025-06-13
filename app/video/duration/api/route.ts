// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function PUT(req: Request) {

    const { searchParams } = new URL(req.url);

    const response = await fetchNext(
        `http://${process.env.NEXT_PUBLIC_S3_STORAGE_ADDRESS}/duration?id=${searchParams.get("id")}&duration=${searchParams.get("duration")}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
            }
        }
    );

    return response;

}