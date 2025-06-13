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
    } | null,
    age_limit: number,
    has_load: boolean,
    level_access: "public" | "private",
    user_view_duration: number,
    is_viewed: boolean,
    has_comments: boolean,
    total_comments: number,
    path: string | null
    // likesCounter?: number,
    // commentsCounter?: number,
}
type VideoModes = "personal_view" | "platform_view" | "studio_view"

// exports
export type { VideoSlice, VideoModes }