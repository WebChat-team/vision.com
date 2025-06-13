"use client";

import { useState } from "react";
import styles from "./index.module.css";
import BeforeAddVideoText from "./beforeAddVideoText";
import VideoUpload from "./Video";
import SelectVideoFile from "./SelectVideoFile";
import AddMetaDataForVideo from "./AddMetaDataForVideo";

export default function UploadVideo() {

    const [selectedVideoFile, setSelectedVideoFile] = useState<File>();

    if (selectedVideoFile) {

        return (
            <div className={styles.upload_video}>
                <div>
                    <VideoUpload file={selectedVideoFile} />
                </div>
                <AddMetaDataForVideo
                    videoFile={selectedVideoFile}
                />
            </div>
        );

    } else {
        return (
            <SelectVideoFile setSelectedVideoFile={setSelectedVideoFile}>
                <BeforeAddVideoText />
            </SelectVideoFile>
        );
    }

};