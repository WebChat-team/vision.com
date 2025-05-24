// imports
import { AnimationJS } from "moveton";

// main
function getShowMenu(button: HTMLButtonElement) {

    const { top } = button.getBoundingClientRect();

    return function showMenu(specialMenu: HTMLElement): ReturnType<AnimationJS["start"]> {

        specialMenu.style.display = "block";
        specialMenu.style.opacity = "0";
        specialMenu.style.top = `${top - 5}px`;
    
        return new AnimationJS([specialMenu], { opacity: `0 -> 1` })
        .start("easeOutSine", 450, 150);
    
    }

}

function hideMenu(specialMenu: HTMLElement): ReturnType<AnimationJS["start"]> {

    // @ts-ignore
    return new AnimationJS([specialMenu], { opacity: `1 -> 0` })
        .start("easeOutSine", 450)
        .then(() => { specialMenu.style.display = "none"; });

}

// exports
export {
    getShowMenu,
    hideMenu
};