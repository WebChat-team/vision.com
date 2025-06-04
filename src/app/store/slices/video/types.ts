// main
interface VideoSlice {
    id: string,
    name: string,
    unique_views: number,
    description: string,
    timestamp: string,
    channel: {
        id: string,
        name: string,
        subscriptionCounter: number,
        avatar_url: string,
    },
    age_limit: number,
    has_load: boolean,
    level_access: "public" | "private",
    user_view_duration: number,
    is_viewed: boolean,
    // likesCounter?: number,
    // commentsCounter?: number,
}

// exports
export type { VideoSlice }