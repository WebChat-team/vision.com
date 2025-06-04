import { AnimationJS } from "moveton";

export function show(element: HTMLElement) {

    element.style.display = "flex";

    return new AnimationJS([element], { opacity: "0 -> 1" }).start("linear", 150, 150);

};

export function hide(element: HTMLElement) {

    return new AnimationJS([element], { opacity: "1 -> 0" })
        .start("linear", 150)
        .then((elements) => {
            element.style.display = "none";
            return elements;
        });

};