// imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { GroupPanelNames, PanelManagerSlice } from './types';
import { AppName } from '@/features/AddApp/constants';
import removeGroupByIndex from './helpers';

// main
const initialState: PanelManagerSlice = {
  groups: [[ "watch" ]],
  activeIndex: 0,
  includes: { watch: 0 },
};

const panelMangerSlice = createSlice({
  name: 'panel_manager',
  initialState: initialState,
  reducers: {
    addPanel(store, data: PayloadAction<{ indexPosition?: number, panelName: AppName }>) {

      let { indexPosition, panelName } = data.payload;

      if (typeof indexPosition !== 'number') {
          if (panelName in store.includes) {
            store.activeIndex = store.includes[panelName];
            return;
          } else {
            indexPosition = store.groups.length;
          }
        // if (store.groups.length && store.groups[store.activeIndex].length == 2) {
        // } else {
          // indexPosition = store.activeIndex;
        // }
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
    setActive(store, data: PayloadAction<{ type: "index", index: number } | { type: "name", name: string }>) {

      switch (data.payload.type) {

        case "index":
          if (0 <= data.payload.index && data.payload.index < store.groups.length) {
            store.activeIndex = data.payload.index;
          }
          break;

        case "name":
          if (typeof store.includes[data.payload.name] === "number") {
            store.activeIndex = store.includes[data.payload.name];
          }
          break;

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