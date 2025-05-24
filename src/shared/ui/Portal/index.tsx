import { ReactNode } from "react";
import { createPortal } from "react-dom"

export default function Portal(children: ReactNode, domNode = document.body) {

    return createPortal(children, domNode);

}