// imports ================================================== //
import type { FC, MouseEventHandler } from 'react';

// main ===================================================== //
interface Props {
    onClick?: MouseEventHandler
}
type VisiblePasswordInput = FC<Readonly<Props>>

// exports ================================================== //
export type { VisiblePasswordInput };