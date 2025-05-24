
export async function getChannelData(channel_id: string) {
    return (await fetch(`http://us.vision.com:3001/channel?id=${channel_id}`)).json();
}