"use client"

import { useSearchParams } from "next/navigation";
import Video from "@/entities/Video";
import ListVideos from "@/widgets/ListVideos";
import InfoVideo from "@/entities/InfoVideo";

export default function VideoWatch() {

    const searchParams = useSearchParams();
    const video_id = searchParams.get("v");

    return (
        video_id ?
            <>
                <Video id={video_id} />
                <InfoVideo video_id={video_id} />
                <ListVideos />
            </> :
            "Nope"

    );

}