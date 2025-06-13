import { setUser } from ".";
import type { AppStore } from "../../types";
import fetchNext from "@/shared/lib/fetch";

export default async function loadUserData(store: AppStore) {

    try {

        const response = await fetchNext(
            `http://api.vision.com:3000/user/user?detail=account`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Origin": "http://vision.com"
                }
            }
        );

        const userData = await response.json();

        store.dispatch(setUser(userData));

    } catch (error) {

    }

};