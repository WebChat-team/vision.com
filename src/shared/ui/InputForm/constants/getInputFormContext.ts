// imports ================================================== //
import { PropsInput } from "@webchat_com/webchat_ui";
import { createContext } from "react";
import type { RefObject } from "react";

// types ==================================================== //
interface getInputFormContext {
    InputRef: RefObject<HTMLInputElement>,
    setInputProps: (props: Partial<PropsInput>) => void
}

// constants ================================================ //
const initialContext = {
    InputRef: { current: null },
    setInputProps: () => {}
};

// main ===================================================== //
const getInputFormContext = () => (
    createContext<getInputFormContext>(initialContext)
);

// exports ================================================== //
export default getInputFormContext;