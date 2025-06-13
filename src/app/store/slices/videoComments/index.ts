// imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoComment, VideoCommentsSlice } from './types';

// main
const initialState: VideoCommentsSlice = {
    data: null,
    total_length: 0
};

const videoCommentsSlice = createSlice({
    name: 'video_comments',
    initialState: initialState,
    reducers: {
        setVideoComments(store, data: PayloadAction<VideoComment[]>) {
            store.data = data.payload;
        },
        setTotalLength(store, data: PayloadAction<number>) {
            store.total_length = data.payload;
        },
    },
});

// exports
export const { setVideoComments, setTotalLength } = videoCommentsSlice.actions;
export default videoCommentsSlice;