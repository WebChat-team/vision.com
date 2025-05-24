import { AnimationJS } from "moveton";

function show(darkenssElement: HTMLElement): ReturnType<AnimationJS['start']> {

    return new AnimationJS([darkenssElement], { opacity: "0 -> 1" }).start("linear", 150);

}
function hide(darkenssElement: HTMLElement): ReturnType<AnimationJS['start']> {

    return new AnimationJS([darkenssElement], { opacity: "1 -> 0" }).start("linear", 150);

}

export { show, hide };