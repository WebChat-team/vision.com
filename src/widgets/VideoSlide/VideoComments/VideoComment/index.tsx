// imports ================================================== //
import { useAppSelector } from "@/app/store/hooks";
import styles from "./index.module.css";
import { VideoComment as VideoCommentType } from "./types";
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

// main ===================================================== //
const VideoComment: VideoCommentType = ({
    id,
    avatar_url,
    name,
    is_liked_by_user,
    reply_count,
    likes_count,
    user_id,
    parent_id,
    text,
    created_at,
    updated_at,
    setIsUpdateComments
}) => {

    const userData = useAppSelector(state => state.user.data);

    async function handleDelete() {
        
        if (userData) {
            const response = await fetch(`/video/comments/api?id=${id}`, { method: "DELETE" });
            if (response.ok) setIsUpdateComments(true);
        }

    }

    return (
        <div className={styles.comment}>
            <div className={styles.avatarContainer}>
                <img 
                    src={avatar_url} 
                    alt={name}
                    className={styles.avatar}
                />
            </div>
            
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.authorName}>{name}</span>
                    <span className={styles.timestamp}>
                        {formatDistanceToNow(new Date(created_at), { addSuffix: true, locale: ru })}
                        {updated_at > created_at && ' (изменено)'}
                    </span>
                </div>
                
                <div className={styles.text}>{text}</div>
                
                <div className={styles.actions}>
                    {
                        (userData && userData.id === user_id) &&
                        <button
                            className={styles.actionButton}
                            onClick={handleDelete}
                        >
                            <img src="/icons/delete.svg" alt="" />
                        </button>
                    }
                    {/* <button className={styles.actionButton}>
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M10,9V5l-7,7l7,7v-4.1c5,0,8.5,1.6,11,5.1c-1-5-4-10-11-11z"/>
                        </svg>
                        Ответить
                    </button> */}
                    
                    {/* {reply_count > 0 && (
                        <button className={styles.repliesToggle}>
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path fill="currentColor" d="M7,10l5,5l5-5H7z"/>
                            </svg>
                            {reply_count} ответов
                        </button>
                    )} */}
                </div>
            </div>
        </div>
    );
};

// exports ================================================== //
export default VideoComment;