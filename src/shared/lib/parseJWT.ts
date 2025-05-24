"use server";

export default async function parseJwt (token: string) {

    let [__, base64Url, _] = token.split('.');
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');

    return JSON.parse(jsonPayload);

}