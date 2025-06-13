"use client";

import SearchField from "@/features/SearchField";
import styles from "./index.module.css";
import type { Search as SearchType } from "./types";
import ListVideos from "@/entities/ListVideos";
import { useState } from "react";

const Search: SearchType = () => {

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className={styles.search_panel}>
            <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ListVideos search_query={searchQuery} />
        </div>
    );

};

export default Search;