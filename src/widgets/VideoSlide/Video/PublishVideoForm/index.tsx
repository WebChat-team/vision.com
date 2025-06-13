"use client";

// imports ================================================== //
import InputForm from "@/shared/ui/InputForm";
import styles from "./index.module.css";
import { PublishVideoForm as PublishVideoFormType } from "./types";
import SelectForm from "@/shared/ui/SelectForm";
import Option from "@/shared/ui/SelectForm/components/Option";
import Checkbox from "@/shared/ui/Checkbox";
import Button from "@/shared/ui/Button";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setVideo } from "@/app/store/slices/video";
import { getVideoInfo } from "../../api";

// main ===================================================== //
const PublishVideoForm: PublishVideoFormType = ({ videoFile }) => {

    const videoData = useAppSelector(state => state.video.data!);
    const dispatch = useAppDispatch();

    // @ts-ignore
    async function save(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        // @ts-ignore
        const { title, description, age_limit, hasComments, hasDownload, levelAccess } = event.target.elements as any;

        const formData = new FormData();

        let response;

        if (videoFile) {
            formData.append("video", videoFile);
            formData.append("title", title.value);
            formData.append("description", description.value);
            formData.append("age_limit", age_limit.value);
            formData.append("hasComments", hasComments.checked);
            formData.append("hasDownload", hasDownload.checked);
            formData.append("levelAccess", levelAccess.value);
            response = await fetch("/video/api", {
                method: "POST",
                body: formData
            });
        } else {
            response = await fetch("/video/api", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    videoId:        videoData.id,
                    title:          title.value,
                    description:    description.value,
                    age_limit:      age_limit.value,
                    hasComments:    hasComments.checked,
                    hasDownload:    hasDownload.checked,
                    levelAccess:    levelAccess.value,
                })
            });
        }

        if (response.ok) {

            const data = await response.json() as { link: string };
            const id_video = new URLSearchParams(new URL(data.link).searchParams).get("v");

            if (id_video) {
                const dataVideoInfo = await getVideoInfo(id_video);
                if (dataVideoInfo) {
                    dispatch(setVideo({ data: Object.assign(dataVideoInfo, { path: `http://s3.vision.com:3002/video?v=${dataVideoInfo.id}` }), mode: "platform_view" }));
                }
            }
        }

    }

    return (
        <form className={styles.publish_video_form} onSubmit={save}>
            <div className={styles.content}>
                <InputForm
                    required
                    name="title"
                    defaultValue={videoData.name}
                    description="Название"
                    minLength={1}
                    placeholder="Яркие названия помогают привлечь внимание зрителей. Отличная идея – добавить в название ролика ключевые слова, по которым зрители ищут подобный контент."
                />
                <InputForm
                    name="description"
                    description="Описdание"
                    placeholder="Расскажите, о чём ваше видео"
                    defaultValue={videoData.description}
                />
                {/* <SelectForm name="playlist" defaultValue="" description="Плейлист">
                <Option value="">Не выбран</Option>
                <Option value="section1">Фильмы</Option>
                <Option value="section2">Развлечения</Option>
                <Option value="section3">Танцевальная музыка</Option>
                <Option value="section4">Лучшее</Option>
            </SelectForm> */}
                <SelectForm value={String(videoData.age_limit)} name="age_limit" description="Возрастные ограничения">
                    <Option value="0">Для всех возрастов (0+)</Option>
                    <Option value="6">Для детей (6+)</Option>
                    <Option value="12">Для подростков (12+)</Option>
                    <Option value="16">Для старших подростков (16+)</Option>
                    <Option value="18">Для взрослых (18+)</Option>
                </SelectForm>
                <Checkbox
                    name="hasComments"
                    title="Наличие комментариев"
                    description="Вы можете отключить комментарии под своим видео"
                    checked={videoData.has_comments}
                />
                <SelectForm value={videoData.level_access} name="levelAccess" description="Выбор уровня доступа">
                    <Option value="private">Ограниченный</Option>
                    <Option value="public">Общедоступный</Option>
                    <Option value="link">По ссылке</Option>
                </SelectForm>
                <Checkbox
                    name="hasDownload"
                    title="Возможность загрузить видео"
                    description="Вы можете позволить пользователям скачать ваше видео на данной платформе"
                    checked={videoData.has_load}
                />
            </div>
            <div className={styles.down_nav}>
                <Button key="upload" level="primary" type="submit">
                    Отправить на проверку
                </Button>
            </div>
        </form>
    );

};

// exports ================================================== //
export default PublishVideoForm;