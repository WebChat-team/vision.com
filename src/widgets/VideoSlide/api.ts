import { VideoSlice } from "@/app/store/slices/video/types";

export async function getVideoInfo(id: string): Promise<VideoSlice | null> {

    try {

        const data = await fetch(`http://s3.vision.com:3002/info?id=${id}`);

        return await data.json() as VideoSlice;

    } catch (error) {

        return null;

    }

}