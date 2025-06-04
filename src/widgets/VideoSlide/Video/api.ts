"use client";

// import fetchNext from "@/shared/lib/fetch";
import { MutableRefObject } from "react";

export async function autoUpdateDurationPointVideo(
    idVideoRef: MutableRefObject<string>,
    videoRef: MutableRefObject<{ currentTime: number, paused: boolean, ended: boolean, readyState: number }>,
    isStopped: Function
) {

    try {

        let previousId = idVideoRef.current;
        let sendTime = null;

        while (!isStopped() && videoRef.current && typeof idVideoRef.current === "string") {

            if (previousId !== idVideoRef.current) {
                sendTime = null;
                previousId = idVideoRef.current;
            }

            const isPlayingVideo = (
                videoRef.current.currentTime > 0 &&
                !videoRef.current.paused &&
                !videoRef.current.ended &&
                videoRef.current.readyState > 2
            );

            if (isPlayingVideo || sendTime !== videoRef.current.currentTime) {
                sendTime = Math.round(videoRef.current.currentTime * 1000);
                await fetch(
                    `http://s3.vision.com:3002/duration?id=${idVideoRef.current}&duration=${sendTime}`,
                    { method: "PUT" }
                );
            }

        }

    } catch (error) {
        console.error("!!!");
        return function () {};
    }

}
export async function putVideoView(id: string, duration: number) {

    await fetch(`http://s3.vision.com:3002/views?id=${id}&duration=${duration}`, { method: "PUT" });

}