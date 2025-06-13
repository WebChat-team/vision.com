export default async function getTotalLengthLikes(id: string, is_like: boolean): Promise<{ total_likes: number, has_user_reaction: boolean } | null> {

    try {

        const data = await fetch(`/video/likes/api?video_id=${id}&is_like=${is_like ? "1" : "0"}`);

        return await data.json() as { total_likes: number, has_user_reaction: boolean };

    } catch (error) {

        return null;

    }

}
export async function postLike(id: string, is_like: boolean): Promise<Response> {
    return await fetch(`/video/likes/api?video_id=${id}&is_like=${is_like ? "1" : "0"}`, { method: "POST" });
}
export async function deleteReaction(id: string): Promise<Response> {
    return await fetch(`/video/likes/api?video_id=${id}`, { method: "DELETE" });
}