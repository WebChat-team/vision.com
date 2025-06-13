"use client";

import { MutableRefObject } from "react";

export async function autoUpdateDurationPointVideo(
    idVideoRef: MutableRefObject<string>,
    videoApiRef: MutableRefObject<{ currentTime: number, paused: boolean, ended: boolean, readyState: number }>,
    isMounted: () => boolean
) {

    try {

        let previousId = idVideoRef.current;
        let sendTime = null;

        while (isMounted() && videoApiRef.current && typeof idVideoRef.current === "string") {


            if (previousId !== idVideoRef.current) {
                sendTime = null;
                previousId = idVideoRef.current;
            }

            const isPlayingVideo = (
                videoApiRef.current.currentTime > 0 &&
                !videoApiRef.current.paused &&
                !videoApiRef.current.ended &&
                videoApiRef.current.readyState > 2
            );

            if (isPlayingVideo || sendTime !== videoApiRef.current.currentTime) {
                sendTime = Math.round(videoApiRef.current.currentTime * 1000);
                await fetch(`/video/duration/api?id=${idVideoRef.current}&duration=${sendTime}`, { method: "PUT" });
            }

        }

    } catch (error) {
        console.error("!!!");
        return function () {};
    }

}

export async function viewVideo(id: string, duration: number) {

    return await fetch(
        `/video/views/api?id=${id}&duration=${duration}`,
        { method: "PUT" }
    );

}