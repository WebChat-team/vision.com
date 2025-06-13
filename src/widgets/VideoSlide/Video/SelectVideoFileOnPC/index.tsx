// imports ================================================== //
import type { ChangeEvent } from "react";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setVideo } from "@/app/store/slices/video";
import { SelectVideoForView as SelectVideoForViewType } from "./types";
import { addPanel } from "@/app/store/slices/panelManager";

// main ===================================================== //
const SelectVideoForView: SelectVideoForViewType = ({ mode, setVideoFile }) => {

    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.user.data);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {

        event.preventDefault();

        if (event.target.files?.length) {

            const file = event.target.files[0];

            setVideoFile(file);
            dispatch(
                setVideo({
                    data: {
                        id: "", // Генерируем уникальный ID
                        name: file.name.replace(/\.[^/.]+$/, ""), // Имя файла без расширения
                        unique_views: 0, // По умолчанию 0 просмотров
                        description: "", // Описание пока пустое
                        timestamp: new Date().toISOString(), // Текущая дата/время
                        channel: userData ? {
                            id: userData.id, // ID текущего пользователя
                            name: userData.name, // Можно получить из профиля
                            subscriptionCounter: userData.subscriber_count, // По умолчанию 0 подписчиков
                            avatar_url: userData.avatar_url, // Аватар по умолчанию
                        } : null,
                        age_limit: 0, // Без ограничений по возрасту
                        has_load: true, // Файл загружен
                        level_access: "private", // По умолчанию приватный доступ
                        user_view_duration: 0, // Время просмотра
                        is_viewed: false, // Еще не просмотрено
                        has_comments: false, // Комментарии отключены
                        total_comments: 0, // Нет комментариев
                        path: URL.createObjectURL(file)
                    },
                    mode: "personal_view"
                })
            );

        }

    }
    function handleClick() {
        if (mode === "platform_view") {
            dispatch(addPanel({ panelName: "search" }));
        }
    }

    return (
        <label onClick={handleClick}>
            <h3 className={styles.select_video_for_personal_view}>
                {mode === "personal_view" && "Выберите видео на вашем компьютере для просмотра"}
                {mode === "studio_view" && "Выберите видео на вашем компьютере для публикации на платформе"}
                {mode === "platform_view" && "Выберите видео на нашей платформе для просмотра"}
            </h3>
            {
                mode !== "platform_view" &&
                <input id="upload_file_input" type="file" accept="video/*" onChange={handleChange} hidden />
            }
        </label>
    );

};

// exports ================================================== //
export default SelectVideoForView;