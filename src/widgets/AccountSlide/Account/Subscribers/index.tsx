// imports ================================================== //
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Subscribers as SubscribersType } from "./types";
import { UserProfile } from "@/app/store/slices/user/types";
import { pluralize } from "@/shared/lib/formatUploadDate";

// main ===================================================== //
const Subscribers: SubscribersType = ({ user_id }) => {

    const [subscribers, setSubscribers] = useState<UserProfile[]>();

    useEffect(() => {

        (async function () {

            const response = await fetch(`/subscribers/api?user_id=${user_id}`);
            const data = await response.json();

            if (data) setSubscribers(data);

        })();

    }, [user_id]);

    return (
        <div className={styles.subscribers}>
            {
                subscribers &&
                subscribers.map(({ id, name, avatar_url, subscribers_count }) => (
                    <button
                        onClick={() => {}}
                        key={id + "_" + name}
                        className={styles.subscriber}
                    >
                        <img
                            src={avatar_url}
                            alt={name}
                            className={styles.subscriber_avatar}
                        />
                        <h3 className={styles.subscriber_name}>{name}</h3>
                        <span className={styles.subs_count}>
                            {subscribers_count + " " + pluralize(Number(subscribers_count), "подписчик", "подписчика", "подписчиков")}
                        </span>
                    </button>
                ))
            }
        </div>
    );

};

// exports ================================================== //
export default Subscribers;