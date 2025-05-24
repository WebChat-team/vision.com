export default async function getShortInfoUser() {
    return (await fetch("http://vision.com:3005/api")).json();
}