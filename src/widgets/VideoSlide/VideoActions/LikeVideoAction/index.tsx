// imports ================================================== //
import ActionVideo from "@/shared/ui/ActionVideo";
import { useEffect, useState } from "react";
import type { LikeVideoAction as LikeVideoActionType } from "./types";
import { useAppSelector } from "@/app/store/hooks";
import getTotalLengthLikes, { deleteReaction, postLike } from "./api";
import getClassName from "@/shared/lib/getClassName";
import styles from "./index.module.css";

// main ===================================================== //
const LikeVideoAction: LikeVideoActionType = ({ id }) => {

    const [countLikes, setCountLikes] = useState<number | null>(null);
    const [countDislikes, setCountDislikes] = useState<number | null>(null);
    const [statusReaction, setStatusReaction] = useState<"empty" | "like" | "dislike">("empty")
    const userData = useAppSelector(state => state.user.data);

    useEffect(() => { setStatusReaction("empty") }, [id]);

    useEffect(
        () => {

            (async function () {
                let result = await getTotalLengthLikes(id, true);
                if (result) {
                    setCountLikes(result.total_likes);
                    if (result.has_user_reaction) setStatusReaction("like");
                }
                let nextResult = await getTotalLengthLikes(id, false);
                if (nextResult) {
                    setCountDislikes(nextResult.total_likes);
                    if (nextResult.has_user_reaction) setStatusReaction("dislike")
                }
            })();

        },
        [statusReaction]
    );

    async function handleClick(type: "like" | "dislike") {

        if (userData) {
            if (type === statusReaction) {
                const response = await deleteReaction(id);
                if (response.ok) setStatusReaction("empty");
            } else {
                const response = await postLike(id, type === "like" ? true : false);
                if (response.ok) setStatusReaction(type);
            }
        }

    }

    return (
        <>
            <ActionVideo
                icon={`/icons/like.svg`}
                onClick={() => handleClick("like")}
                className={getClassName(statusReaction === "like" ? styles.is_like : "")}
            >
                {countLikes}
            </ActionVideo>
            <ActionVideo
                icon={`/icons/dislike.svg`}
                onClick={() => handleClick("dislike")}
                className={getClassName(statusReaction === "dislike" ? styles.is_dislike : "")}
            >
                {countDislikes}
            </ActionVideo>
        </>
    );

};

// exports ================================================== //
export default LikeVideoAction;