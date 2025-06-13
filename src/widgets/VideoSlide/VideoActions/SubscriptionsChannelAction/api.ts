export default async function getTotalLength(channel_id: string): Promise<{ total_subscribers: number, is_subscribed: boolean } | null> {

    try {

        const data = await fetch(`/channel/subscriptions/api?channel_id=${channel_id}`);

        return await data.json() as { total_subscribers: number, is_subscribed: boolean };

    } catch (error) {

        return null;

    }

}