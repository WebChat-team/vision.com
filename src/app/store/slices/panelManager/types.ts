import type { AppName } from "@/features/AddApp/constants"

// main
interface PanelManagerSlice {
    groups: Array<GroupPanelNames>,
    activeIndex: number,
    includes: { [key: AppName | string]: number }
}
type GroupPanelNames = [AppName] | [AppName, AppName]

// exports
export type { PanelManagerSlice, GroupPanelNames }