// imports ================================================== //
import type {
    DetailedHTMLProps,
    InputHTMLAttributes,
    ButtonHTMLAttributes,
    FormHTMLAttributes,
    AnchorHTMLAttributes
} from 'react';

// main ===================================================== //

// form
type PropsForm = DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>

// input
type PropsInput = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

// button
type PropsButton = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

// anchor
type PropsAnchor = DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>

// exports ================================================== //
export type {
    PropsForm,
    PropsInput,
    PropsButton,
    PropsAnchor
};