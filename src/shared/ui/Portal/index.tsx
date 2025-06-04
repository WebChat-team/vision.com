"use client"

// imports ================================================== //
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Portal as PortalType } from './types';

// main ===================================================== // 
const Portal: PortalType = ({ children }) => {

    const element = document.createElement("div");

    useEffect(() => {
        const PopupContainer = document.getElementById("popup_container");
        if (PopupContainer) {
            PopupContainer.appendChild(element);
            return () => { PopupContainer.removeChild(element); };
        }
    }, []);

    return createPortal(children, element);

};

// export =================================================== //
export default Portal;