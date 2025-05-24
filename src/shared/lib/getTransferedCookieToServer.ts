import { cookies } from "next/headers";

export default function getTransferedCookiesToServer() {
    return (
        cookies()
            .getAll()
            .map((cookie) => encodeURIComponent(cookie.name) + "=" + encodeURIComponent(cookie.value))
            .join("; ")
    );
}