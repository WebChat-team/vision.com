import type { Draft } from "@reduxjs/toolkit"
import { PanelManagerSlice } from "./types";

export default function removeGroupByIndex(store: Draft<PanelManagerSlice>, indexGroup: number) {

    const removedGroup = store.groups.splice(indexGroup, 1);
    removedGroup[0].forEach((panelName) => delete store.includes[panelName]);
    if (indexGroup < store.activeIndex) {
      store.activeIndex--;
    }
    
};