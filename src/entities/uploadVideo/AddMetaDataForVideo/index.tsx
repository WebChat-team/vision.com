"use client"

import { FormEvent, useState } from "react";
import styles from "./index.module.css";
import Button from "@/shared/ui/Button";
import InputForm from "@/shared/ui/InputForm";
import Checkbox from "@/shared/ui/Checkbox";
import SelectForm from "@/shared/ui/SelectForm";
import Option from "@/shared/ui/SelectForm/components/Option";

export default function AddMetaDataForVideo({ videoFile }: { videoFile: File, }) {

    // let [indexSection, setIndexSection] = useState(0);
    // const increment = () => setIndexSection((index) => Math.min(2, index + 1));
    // const decrement = () => setIndexSection((index) => Math.max(0, index - 1));

    let [hrefPublishedWatchVideo, setHrefPublishedWatchVideo] = useState<string>();

    async function save(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        // @ts-ignore
        const { title, description, age_limit, hasComments, hasDownload, levelAccess } = event.target.elements as any;

        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("title", title.value);
        formData.append("description", description.value);
        formData.append("age_limit", age_limit.value);
        formData.append("hasComments", hasComments.value);
        formData.append("hasDownload", hasDownload.value);
        formData.append("levelAccess", levelAccess.value);

        const response = await fetch("http://studio.vision.com:3000/video/load/api", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.link) setHrefPublishedWatchVideo(data.link);
        }

    }

    return (
        <form className={styles.form} onSubmit={save}>
            {hrefPublishedWatchVideo && <a href={hrefPublishedWatchVideo}>Перейти к просмотру видео</a>}
            <div className={styles.content}>
                <InputForm
                    required
                    name="title"
                    defaultValue={videoFile.name.slice(0, videoFile.name.lastIndexOf("."))}
                    description="Название"
                    minLength={1}
                    placeholder="Яркие названия помогают привлечь внимание зрителей. Отличная идея – добавить в название ролика ключевые слова, по которым зрители ищут подобный контент."
                />
                <InputForm
                    name="description"
                    description="Описdание"
                    placeholder="Расскажите, о чём ваше видео"
                />
                {/* <SelectForm name="playlist" defaultValue="" description="Плейлист">
                <Option value="">Не выбран</Option>
                <Option value="section1">Фильмы</Option>
                <Option value="section2">Развлечения</Option>
                <Option value="section3">Танцевальная музыка</Option>
                <Option value="section4">Лучшее</Option>
            </SelectForm> */}
                <SelectForm name="age_limit" defaultValue="18+" description="Возрастные ограничения">
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
                />
                <SelectForm name="levelAccess" defaultValue="limited" description="Выбор уровня доступа">
                    <Option value="limited">Ограниченный</Option>
                    <Option value="public">Общедоступный</Option>
                    <Option value="link">По ссылке</Option>
                </SelectForm>
                <Checkbox
                    name="hasDownload"
                    title="Возможность загрузить видео"
                    description="Вы можете позволить пользователям скачать ваше видео на данной платформе"
                />
            </div>
            <div className={styles.down_nav}>
                {/* {
                    indexSection > 0 &&
                    <Button key="prev" type="button" level="tertiary" onClick={decrement}>
                        Назад
                    </Button>
                }
                {
                    indexSection === 2 ?
                        <Button key="upload" level="primary" type="submit">
                            Отправить на проверку
                        </Button> :
                        <Button key="next" type="button" level="secondary" onClick={increment}>
                            Далее
                        </Button>
                } */}
                <Button key="upload" level="primary" type="submit">
                    Отправить на проверку
                </Button>
            </div>
        </form>
    );

};