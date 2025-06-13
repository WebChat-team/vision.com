export default async function getUserData() {

    const response = await fetch("http://vision.com:3005/api");
    return await response.json();

};