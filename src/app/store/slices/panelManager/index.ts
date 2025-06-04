// imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { GroupPanelNames, PanelManagerSlice } from './types';
import { AppName } from '@/features/AddApp/constants';
import removeGroupByIndex from './helpers';

// main
const initialState: PanelManagerSlice = {
  groups: [["watch", "account"]],
  activeIndex: 0,
  includes: { watch: 0, account: 0 },
};

const panelMangerSlice = createSlice({
  name: 'panel_manager',
  initialState: initialState,
  reducers: {
    addPanel(store, data: PayloadAction<{ indexPosition?: number, panelName: AppName }>) {

      let { indexPosition, panelName } = data.payload;

      if (typeof indexPosition !== 'number') {
        if (store.groups.length && store.groups[store.activeIndex].length == 2) {
          indexPosition = store.groups.length;
        } else {
          indexPosition = store.activeIndex;
        }
      }

      if (
        (0 <= indexPosition && indexPosition <= store.groups.length)
        && !(panelName in store.includes)
      ) {
        if (!store.groups[indexPosition]) {
          store.groups[indexPosition] = [panelName];
        } else {
          store.groups[indexPosition].push(panelName);
        }
        store.includes[panelName] = indexPosition;
        store.activeIndex = indexPosition;
      }

    },
    addGroup(store, data: PayloadAction<{ indexPosition: number, group: GroupPanelNames }>) {

      let { indexPosition, group } = data.payload;

      if (0 <= indexPosition && group.every(panelName => !(panelName in store.includes))) {
        store.groups.splice(indexPosition, 0, group);
        group.forEach(panelName => store.includes[panelName] = indexPosition);
        store.activeIndex = indexPosition;
      }

    },
    setActive(store, data: PayloadAction<number>) {

      if (0 <= data.payload && data.payload < store.groups.length) {
        store.activeIndex = data.payload;
      }

    },
    removeGroup(store, data: PayloadAction<number>) {

      if (store.groups[data.payload]) {
        removeGroupByIndex(store, data.payload);
      }

    },
    removePanel(store, data: PayloadAction<AppName>) {

      if (data.payload in store.includes) {
        const indexGroupApp = store.includes[data.payload];
        delete store.includes[data.payload];
        if (store.groups[indexGroupApp].length === 1) {
          removeGroupByIndex(store, indexGroupApp);
        } else {
          // @ts-ignore
          store.groups[indexGroupApp] = store.groups[indexGroupApp].filter(panelName => (data.payload !== panelName));
        }
      }

    }
  },
});

// exports
export const { addGroup, addPanel, setActive, removeGroup, removePanel } = panelMangerSlice.actions;
export default panelMangerSlice;