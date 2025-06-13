export default async function getVideoViews(id: string): Promise<number | null> {

    try {

        const data = await fetch(`http://${process.env.NEXT_PUBLIC_S3_STORAGE_ADDRESS}/views?id=${id}`);

        return await data.json() as number;

    } catch (error) {

        return null;

    }

}