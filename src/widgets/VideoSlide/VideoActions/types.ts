import type { Dispatch, FC, SetStateAction } from "react";

interface Props {
    hasComments: boolean,
    setHasComments: Dispatch<SetStateAction<boolean>>
}
type VideoActions = FC<Readonly<Props>>

export type { VideoActions };