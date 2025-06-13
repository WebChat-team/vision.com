// imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { VideoModes, VideoSlice } from './types';

// main
const initialState = {
    data: null as VideoSlice | null,
    mode: "personal_view" as VideoModes
};

const videoSlice = createSlice({
    name: 'video',
    initialState: initialState,
    reducers: {
        setVideo(store, data: PayloadAction<{ data: VideoSlice, mode: VideoModes}>) {
            store.data = data.payload.data;
            store.mode = data.payload.mode || store.mode;
        },
        setVideoMode(store, data: PayloadAction<VideoModes>) {
            store.mode = data.payload;
        },
    },
});

// exports
export const { setVideo, setVideoMode } = videoSlice.actions;
export default videoSlice;