import Search from "@/features/search";
import ShowMenu from "@/features/showMenu";
import styles from "./index.module.css";

export default function Header() {

    return (
        <div className={styles.header_container}>
            <header id="header" className={styles.header + " " + styles.container_special}>
                <Search />
                <ShowMenu />
            </header>
        </div>
    );

}