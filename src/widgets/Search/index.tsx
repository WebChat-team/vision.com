import SearchField from "@/features/SearchField";
import styles from "./index.module.css";
import type { Search as SearchType } from "./types";
import ListVideos from "@/entities/ListVideos";

const Search: SearchType = () => {

    return (
        <div className={styles.search_panel}>
            <SearchField />
            <ListVideos />
        </div>
    );

};

export default Search;