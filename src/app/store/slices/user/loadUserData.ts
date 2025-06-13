import { setUser } from ".";
import type { AppStore } from "../../types";
import fetchNext from "@/shared/lib/fetch";

export default async function loadUserData(store: AppStore) {

    try {

        console.log(
            `http://${process.env.HOST}:${process.env.PORT}`
        );
        
        const response = await fetchNext(
            `${process.env.API_SERVER_ADDRESS}/user/user?detail=account`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Origin": `http://${process.env.HOST}:${process.env.PORT}`
                }
            }
        );

        const userData = await response.json();

        store.dispatch(setUser(userData));

    } catch (error) {

    }

};