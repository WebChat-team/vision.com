import fetchNext from "@/shared/lib/fetch";

export async function getChannelData(channel_id: string) {
    return (await fetchNext(`http://us.vision.com:3001/channel?id=${channel_id}`)).json();
}