import { AnimationJS } from "moveton";

function show(element: HTMLElement): ReturnType<AnimationJS['start']> {

    element.style.display = "block";

    return new AnimationJS([element], { opacity: "0 -> 1" }).start("linear", 150);

}
function hide(element: HTMLElement): ReturnType<AnimationJS['start']> {

    return new AnimationJS([element], { opacity: "1 -> 0" })
        .start("linear", 150, 150)
        .then((elements) => {
            element.style.display = "none";
            return elements;
        });

}

export { show, hide };