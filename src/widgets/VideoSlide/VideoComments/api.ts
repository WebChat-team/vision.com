import type { VideoComment } from "@/app/store/slices/videoComments/types";

interface ReturnType {
    data: VideoComment[];
    pagination: { limit: number, offset: number }
}

export default async function getVideoComments(id: string, limit: number = 10, offset: number = 0): Promise<ReturnType | null> {

    try {

        const data = await fetch(`/video/comments/api?video_id=${id}&limit=${limit}&offset=${offset}`);

        return await data.json() as ReturnType;
        
    } catch (error) {

        return null;

    }

}