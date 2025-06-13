export default async function getTotalLength(id: string): Promise<{ total_length: number } | null> {

    try {

        const data = await fetch(`/video/comments/total_length/api?video_id=${id}`);

        return await data.json() as { total_length: number };

    } catch (error) {

        return null;

    }

}