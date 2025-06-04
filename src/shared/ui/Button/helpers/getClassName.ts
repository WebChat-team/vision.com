// imports ================================================== //
import type { LevelButton } from '../types';
import styles from '../index.module.css';

// types ==================================================== //
type getClassName = (
    wide: boolean,
    level: LevelButton,
    className?: string
) => string

// constants ================================================ //
const classNamesByTypeButton = {
    "primary": styles.primary,
    "secondary": styles.secondary,
    "tertiary": styles.tertiary
};

// main ===================================================== //
const getClassName: getClassName = (wide, level, className) => (
    `
        ${className ? className : ""}
        ${styles.button}
        ${classNamesByTypeButton[level]} 
        ${wide && styles.wide}
    `
);

// exports ================================================= //
export default getClassName;