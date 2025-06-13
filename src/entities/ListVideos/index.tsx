"use client"

import { useState, useEffect, useCallback, UIEventHandler } from "react";
import getListVideos from "./api";
import Loader from "@/shared/ui/Loader";
import PreviewVideo from "@/entities/previewVideo";
import styles from "./index.module.css";
import { Video } from "@/widgets/VideoSlide/Video/types";

export default function ListVideos({ search_query }: { search_query: string }) {

    const [videos, setVideos] = useState<Video[]>([]);
    const [limit, setLimit] = useState(6);
    const [offset, setOffset] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState<number | null>(null);

    const fetchVideos = useCallback(async () => {

        if (loading) return;

        setLoading(true);

        try {

            // @ts-ignore
            if (total == null || videos.length < total) {
                
                const newVideos = await getListVideos(search_query, limit, videos.length);

                setVideos(listVideos => [...listVideos, ...newVideos.videos]);

                setLimit(Number(newVideos.pagination.limit));
                setOffset(Number(newVideos.pagination.offset));
                setTotal(Number(newVideos.pagination.total));

            }

        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }

    }, [loading]);

    useEffect(() => {
        setVideos(() => []);
        setTotal(0);
        fetchVideos();
    }, [search_query]);

    const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
        let isEnd = !(
            // @ts-ignore
            Math.abs(Math.round(event.target.scrollHeight - event.target.scrollTop) - event.target.clientHeight) > 3
        );
        if(isEnd) { fetchVideos(); }
    };

    return (
        <>
            {loading && <Loader />}
            {
                videos &&
                <div className={styles.list_previews} onScroll={handleScroll}>
                    {/* @ts-ignore */}
                    {videos.map(data => <PreviewVideo key={data.id + " " + data.timestamp} {...data} />)}
                </div>
            }
        </>
    );

}