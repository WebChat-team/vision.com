// main
interface VideoCommentsSlice {
    data: VideoComment[] | null,
    total_length: number,
}
interface VideoComment {
    id: string,
    user_id: string,
    name: string,
    avatar_url: string,
    text: string,
    created_at: string,
    updated_at: string,
    parent_id: string,
    reply_count: number,
    likes_count: number,
    is_liked_by_user: boolean
}

// exports
export type { VideoCommentsSlice, VideoComment };