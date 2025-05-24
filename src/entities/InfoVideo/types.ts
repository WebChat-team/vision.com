
interface InfoVideo {

    user_id: string,

    timestamp: string,
    name: string,
    description: string,

    has_comments: "1" | "0",
    has_load: "1" | "0"

}

export type { InfoVideo };