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

      if (!store.data) {
        store.data = {
          avatar_url: userData.payload.avatar_url,
          name: userData.payload.name,
          email: userData.payload.email
        };
      } else {
        store.data = Object.assign(store.data, userData.payload);
      }

    }
  },
});

// exports
export const { setUser } = userSlice.actions;
export default userSlice;