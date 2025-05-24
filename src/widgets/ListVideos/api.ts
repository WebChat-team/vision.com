
export default async function getListVideos() {
    return (await fetch("http://s3.vision.com:3002/videos")).json();
}