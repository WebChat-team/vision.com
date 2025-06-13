"use client";

export default async function getUserData() {
    const response = await fetch(`http://id.vision.com:3000/account/api`);
    return await response.json();
}