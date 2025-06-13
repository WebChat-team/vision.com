import styles from "./index.module.css";

export default function BeforeAddVideoText() {

    return (
        <>
            <span className={"icon-upload" + " " + styles.icon}></span>
            <p className={styles.main_text}>
                Перетащите файлы сюда или нажмите кнопку ниже, чтобы выбрать их на компьютере
            </p>
            <p className={styles.add_text}>
                Пока вы не опубликуете видео, доступ к ним будет ограничен
            </p>
        </>
    );

}