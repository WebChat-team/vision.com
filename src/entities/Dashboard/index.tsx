import Navigation from "./components/Navgation";
import styles from "./index.module.css";
import PanelView from "./components/PanelView";

export default function Dashboard() {

    return (
        <div className={styles.dashboard}>
            <PanelView />
            <Navigation />
        </div>
    );

}