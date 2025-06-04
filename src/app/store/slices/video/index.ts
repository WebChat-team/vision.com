// imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { VideoSlice } from './types';

// main
const initialState = {
    data: null as VideoSlice | null 
};

const videoSlice = createSlice({
    name: 'video',
    initialState: initialState,
    reducers: {
        setVideo(store, data: PayloadAction<VideoSlice>) {
            store.data = Object.assign(data.payload, store.data || {});
        }
    },
});

// exports
export const { setVideo } = videoSlice.actions;
export default videoSlice;