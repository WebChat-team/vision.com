// imports ================================================== //
import fetchNext from "@/shared/lib/fetch";

// main ===================================================== //
export async function PUT(req: Request) {

    const { searchParams } = new URL(req.url);

    const response = await fetchNext(
        `http://s3.vision.com:3002/duration?id=${searchParams.get("id")}&duration=${searchParams.get("duration")}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Origin": `http://${process.env.HOST}:${process.env.PORT}`
            }
        }
    );

    return response;

}