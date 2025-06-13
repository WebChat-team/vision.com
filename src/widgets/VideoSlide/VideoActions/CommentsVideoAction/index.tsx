// imports ================================================== //
import ActionVideo from "@/shared/ui/ActionVideo";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import type { CommentsVideoAction as CommentsVideoActionType } from "./types";
import getTotalLength from "./api";

// main ===================================================== //
const CommentsVideoAction: CommentsVideoActionType = ({ video_id, hasComments, setHasComments }) => {

    const [totalLength, setTotalLength] = useState<number | null>(null);

    useEffect(
        () => {

            (async function a() {
                const result = await getTotalLength(video_id);
                if (result) { setTotalLength(result.total_length); }
            })();

        },
        [video_id]
    );

    function handleClick() {
        setHasComments(hasComments => !hasComments);
    }

    return (
        <ActionVideo
            icon="/icons/comments.svg"
            onClick={handleClick}
            className={hasComments ? styles.has_comments : ""}
        >
            {totalLength}
        </ActionVideo>
    );

};

// exports ================================================== //
export default CommentsVideoAction;