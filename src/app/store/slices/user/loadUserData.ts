import { setUser } from ".";
import type { AppStore } from "../../types";
import fetchNext from "@/shared/lib/fetch";

export default async function loadUserData(store: AppStore) {

    try {

        const response = await fetchNext("http://vision.com:3005/api");

        const userData = await response.json();

        store.dispatch(setUser(userData));

    } catch (error) {

    }

};