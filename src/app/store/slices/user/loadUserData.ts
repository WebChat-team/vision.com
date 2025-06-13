import { setUser } from ".";
import type { AppStore } from "../../types";
import fetchNext from "@/shared/lib/fetch";

export default async function loadUserData(store: AppStore) {

    try {

        const response = await fetchNext(
            `http://${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/user/user?detail=account`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Origin": `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
                }
            }
        );

        const userData = await response.json();

        store.dispatch(setUser(userData));

    } catch (error) {

    }

};