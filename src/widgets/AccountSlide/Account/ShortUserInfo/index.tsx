import { pluralize } from "@/shared/lib/formatUploadDate";
import styles from "./index.module.css";
import { ShortUserInfo as ShortUserInfoType } from "./types";
import getClassName from "@/shared/lib/getClassName";

const ShortUserInfo: ShortUserInfoType = ({ setSection, name, email, avatar_url, bio, subscriber_count, subscriptions_count, subscribers_avatars, subscriptions_avatars, videos_count }) => {

    return (
        <div className={styles.profile_container}>
            <img className={styles.avatar} src={avatar_url} alt={name} />

            <h2 className={styles.username}>{name}</h2>
            <span className={styles.email_user}>{email}</span>

            <p className={styles.bio}>{bio}</p>

            {
                subscriber_count > 0 &&
                <button
                    className={styles.stats_row}
                    onClick={() => setSection("subscribers")}
                >
                    <>
                        <div className={styles.avatars_stack}>
                            {subscribers_avatars?.slice(0, 3).map((user, index) => (
                                <img
                                    key={user.user_id}
                                    className={styles.avatar_stack_item}
                                    src={user.avatar_url}
                                    alt=""
                                    style={{ zIndex: 3 - index }}
                                />
                            ))}
                        </div>
                        <span className={styles.stat}>
                            {subscriber_count + " " + pluralize(subscriber_count, "подписка", "подписки", "подписок")}
                        </span>
                    </>
                </button>
            }
            {
                subscriptions_count > 0 &&
                <button className={styles.stats_row} onClick={() => setSection("subscribers")}>
                    <div className={styles.avatars_stack}>
                        {subscriptions_avatars?.slice(0, 3).map((user, index) => (
                            <img
                                key={user.user_id}
                                className={styles.avatar_stack_item}
                                src={user.avatar_url}
                                alt=""
                                style={{ zIndex: 3 - index }}
                            />
                        ))}
                    </div>
                    <span className={styles.stat}>
                        {subscriptions_count + " " + pluralize(subscriptions_count, "подписчик", "подписчика", "подписчиков")}
                    </span>
                </button>
            }
            {
                videos_count > 0 &&
                <button className={getClassName(styles.stats_row, styles.count_videos)} onClick={() => setSection("videos")}>
                    <span className={styles.stat}>
                        {videos_count + " " + pluralize(videos_count, "видео", "видео", "видео")}
                    </span>
                </button>
            }
        </div>
    );

};

export default ShortUserInfo;