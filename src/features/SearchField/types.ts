// imports ================================================== //
import type { Dispatch, FC, SetStateAction } from "react";

// main ===================================================== //
interface Props {
    searchQuery: string,
    setSearchQuery: Dispatch<SetStateAction<string>>
}
type SearchField = FC<Readonly<Props>>

// exports ================================================== //
export type { SearchField };