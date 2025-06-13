export async function addComment(
    video_id: string,
    text: string,
    parent_id?: string
) {

    return await fetch(
        `/video/comments/api?video_id=${video_id}&text=${text}${parent_id ? `&parent_id=${parent_id}` : ""}`,
        { method: "POST" }
    );
};