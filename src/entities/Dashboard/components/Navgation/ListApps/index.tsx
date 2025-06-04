import styles from "./index.module.css";
import App from "@/features/AddApp";
import { ListApps as ListAppsType } from "./types";
import Animate from "@/shared/ui/Animate";
import { hide, show } from "./animations";
import Blur from "@/shared/ui/Blur";
import { type AppName, Apps } from "@/features/AddApp/constants";

const ListApps: ListAppsType = ({ has, hideListApps }) => {

    return (
        <>
            <Animate
                has={has}
                onShow={show}
                onHide={hide}
            >
                <div className={styles.position_container_apps}>
                    <div className={styles.container_apps}>
                        {
                            Object.keys(Apps).map((appName) => (
                                <App
                                    type={appName as AppName}
                                    hideListApps={hideListApps}
                                    key={appName}
                                />
                            ))
                        }
                    </div>
                </div>
            </Animate>
            <Blur has={has} />
        </>
    );

};

export default ListApps;