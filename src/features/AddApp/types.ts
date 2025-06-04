import type { FC } from "react"
import type { AppName } from "@/features/AddApp/constants";

interface Props {
   type: AppName,
   hideListApps: Function
}
type App = FC<Readonly<Props>>

export type { App };