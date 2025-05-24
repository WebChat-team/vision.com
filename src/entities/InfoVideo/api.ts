
export default async function getInfoVideo(id: string) {
    return (await fetch(`http://s3.vision.com:3002/info?id=${id}`)).json();
}