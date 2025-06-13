export default async function getListVideos(search_query: string, limit: number, offset: number, user_id: string) {
    const response = await fetch(`/videos/api?search_query=${search_query}&limit=${limit}&offset=${offset}&by_user_id=${user_id}`);
    return await response.json();
}