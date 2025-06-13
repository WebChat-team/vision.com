export default async function getListVideos(search_query: string, limit: number, offset: number) {
    const response = await fetch(`/videos/api?search_query=${search_query}&limit=${limit}&offset=${offset}`);
    return await response.json();
}