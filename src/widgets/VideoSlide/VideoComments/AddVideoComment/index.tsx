// imports ================================================== //
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";
import styles from "./index.module.css";
import { AddVideoComment as AddVideoCommentType } from "./types";
import { addComment } from "./api";
import getClassName from "@/shared/lib/getClassName";

// main ===================================================== //
const AddVideoComment: AddVideoCommentType = ({ parent_id, video_id, setIsUpdateComments }) => {

    const [userComment, setUserComment] = useState("");
    const [rows, setRows] = useState(1);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {

        event.preventDefault();

        setUserComment(event.target.value);
        if (buttonRef.current) {
            let value = Math.ceil(event.target.scrollHeight / 32);
            setRows(Math.min(6, value));
        }

    };

    const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {

        event.preventDefault();

        setIsLoading(true);

        if (String(userComment).trim().length > 0) {

            const result = await addComment(video_id, userComment, parent_id);
            if (result.ok) {
                setIsUpdateComments(true);
                setUserComment("");
                setRows(1);
            }
    
        } else {
            setUserComment("");
            setRows(1);
        }

        setIsLoading(false);

    };

    return (
        <div className={getClassName(styles.add_video_comment, isLoading ? styles.is_loading : "")}>
            <textarea
                placeholder="Оставьте ваш комментарий"
                className={styles.comment}
                value={userComment}
                onChange={handleChange}
                rows={Math.min(10, rows)}
            />
            <button
                className={styles.send_comment_button}
                ref={buttonRef}
                onClick={handleClick}
                disabled={isLoading}
            >
                <img src="/icons/send.svg" alt="" />
            </button>
        </div>
    );

};

// exports ================================================== //
export default AddVideoComment;