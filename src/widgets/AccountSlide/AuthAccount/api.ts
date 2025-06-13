export default async function getUserData() {

    const response = await fetch(`/api`);
    return await response.json();

};