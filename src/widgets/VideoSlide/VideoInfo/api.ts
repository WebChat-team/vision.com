export default async function getVideoViews(id: string): Promise<number | null> {

    try {

        const data = await fetch(`http://s3.vision.com:3002/views?id=${id}`);

        return await data.json() as number;

    } catch (error) {

        return null;

    }

}