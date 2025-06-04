import type { FC } from "react"

interface Props {
    has: boolean,
    hideListApps: Function
}
type ListApps = FC<Readonly<Props>>

export type { ListApps };