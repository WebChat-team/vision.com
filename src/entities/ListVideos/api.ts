import fetchNext from "@/shared/lib/fetch";

export default async function getListVideos() {
    return (await fetchNext("http://s3.vision.com:3002/videos")).json();
}