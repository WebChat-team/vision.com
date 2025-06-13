// main
interface UserDataSlice {
    name: string,
    avatar_url: string,
    email: string,
    id: string,
    bio: string,
    subscriptions_count: number,
    subscriber_count: number,
    subscribers_avatars: { user_id: number, avatar_url: string }[],
    subscriptions_avatars: { user_id: number, avatar_url: string }[]
}
interface UserProfile {
    name: string,
    avatar_url: string,
    id: string,
    subscribers_count: string
}

// exports
export type { UserDataSlice, UserProfile }