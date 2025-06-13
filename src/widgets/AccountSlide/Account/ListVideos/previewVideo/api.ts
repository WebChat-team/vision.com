"use server";

import fetchNext from "@/shared/lib/fetch";

export async function getChannelData(channel_id: string) {
    return (await fetchNext(`http://${process.env.NEXT_PUBLIC_USER_SERVER_ADDRESS}/channel?id=${channel_id}`)).json();
}