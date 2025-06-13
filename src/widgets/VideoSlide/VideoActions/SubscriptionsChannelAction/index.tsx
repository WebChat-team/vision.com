// imports ================================================== //
import ActionVideo from "@/shared/ui/ActionVideo";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import type { SubscriptionsChannelAction as SubscriptionsChannelActionType } from "./types";
import getTotalLength from "./api";
import { useAppSelector } from "@/app/store/hooks";

// main ===================================================== //
const SubscriptionsChannelAction: SubscriptionsChannelActionType = ({ channel_id }) => {

    const [totalLength, setTotalLength] = useState<number | null>(null);
    const [isSubscriber, setIsSubscriber] = useState(false);
    const userData = useAppSelector(state => state.user.data);

    useEffect(
        () => {

            (async function () {
                if (channel_id) {
                    const result = await getTotalLength(channel_id);
                    if (result) {
                        setTotalLength(result.total_subscribers);
                        setIsSubscriber(result.is_subscribed);
                    }
                }
            })();

        },
        [channel_id]
    );

    async function handleClick() {
        
        if (userData && channel_id !== null) {
            if (isSubscriber) {
                const response = await fetch(`/channel/subscriptions/api?channel_id=${channel_id}`, { method: "DELETE" });
                if (response.ok) setIsSubscriber(false);
            } else {
                const response = await fetch(`/channel/subscriptions/api?channel_id=${channel_id}`, { method: "POST" });
                if (response.ok) setIsSubscriber(true);
            }
        }

    }

    return (
        <ActionVideo
            icon="/icons/star.svg"
            className={isSubscriber ? styles.is_subscribed : ""}
            onClick={handleClick}
        >
            {totalLength}
        </ActionVideo>
    );

};

// exports ================================================== //
export default SubscriptionsChannelAction;