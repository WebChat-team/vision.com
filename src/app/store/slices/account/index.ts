// imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserDataSlice } from './types';

// main
const initialState = {
  data: null as null | UserDataSlice
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    setAccount(store, userData: PayloadAction<UserDataSlice>) {
      store.data = userData.payload;
    }
  },
});

// exports
export const { setAccount } = accountSlice.actions;
export default accountSlice;