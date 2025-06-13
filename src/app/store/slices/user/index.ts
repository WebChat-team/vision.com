// imports
import { createSlice } from '@reduxjs/toolkit';
import type { UserDataSlice } from './types';

// main
const initialState = {
  data: null as null | UserDataSlice
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(store, userData) {
      
      store.data = userData.payload;

      // if (!store.data) {
      //   store.data = userData.payload;
      // } else {
      //   store.data = Object.assign(store.data, userData.payload);
      // }

    }
  },
});

// exports
export const { setUser } = userSlice.actions;
export default userSlice;