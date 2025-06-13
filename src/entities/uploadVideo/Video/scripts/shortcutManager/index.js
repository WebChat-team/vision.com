// sub modules ============================================== //

// ---------------------------------------------------------- //
// Список действий, которые должны выполняться при их вызове и
// подразделяются на секции (предстоит доработать).
// Предназначены для shortcut-ов, которые привязываются к
// уникальному имени действия (см. модуль ShortcutManager)
// Формат:
// unique_name_action -> { execute, description, section }
// ---------------------------------------------------------- //
// PS: переписать обработку секций - т.к действию не нужно
// хранить свою секцию - решение должно быть на уровне организации кода Map в Map
class ActionsManager extends Map {

    constructor(...atrs) { super(...atrs); }

    set(unique_action_name, description, execute, section) {

        if (super.has(unique_action_name)) {
            console.error(`Данное действие уже содержится: ${unique_action_name}`);
        } else {
            super.set(unique_action_name, { execute, description, section });
        }

        return this;

    }

    getBySection(section) {
        const filtered = Array.from(super.entries()).filter(([id, data]) => !section || data.section === section);
        return new Map(filtered);
    }

}

// ---------------------------------------------------------- //
// Список быстрых клавиш, которые привязываются к уникальному
// имени действия. Может декодировать и разкодировать shortcut-ы
// из строки, а также перевести shortcut в любом виде (кодированном 
// и разкодированном) в принятый удобочитаемый вид
// Формат:
// shortcut -> unique_name_action
// ---------------------------------------------------------- //
class ShortcutManager extends Map {

    constructor(...atrs) { super(...atrs); }

    get(shortcut) {

        if (Array.isArray(shortcut)) {
            shortcut = this.getEncodedShortcut(shortcut);
        }

        return super.get(shortcut);

    }
    has(shortcut) {

        if (Array.isArray(shortcut)) {
            shortcut = this.getEncodedShortcut(shortcut);
        }

        return super.has(shortcut);

    }
    set(shortcut, action_name) {

        if (Array.isArray(shortcut)) {
            shortcut = this.getEncodedShortcut(shortcut);
        }

        return super.set(shortcut, action_name);

    }
    delete(shortcut) {

        if (Array.isArray(shortcut)) {
            shortcut = this.getEncodedShortcut(shortcut);
        }

        return super.delete(shortcut);

    }
    getTextShortcut(shortcut) {

        if (typeof shortcut === "string") {
            shortcut = this.getDecodedShortcut(shortcut);
        }

        const textByShortcut = {

            "Space": "Пробел",
            "KeyA": "A",
            "KeyS": "S",
            "KeyD": "D",
            "KeyF": "F",
            "KeyG": "G",
            "KeyH": "H",
            "KeyJ": "J",
            "KeyK": "K",
            "KeyL": "L",
            "KeyZ": "Z",
            "KeyX": "X",
            "KeyC": "C",
            "KeyV": "V",
            "KeyB": "B",
            "KeyN": "N",
            "KeyM": "M",
            "KeyQ": "Q",
            "KeyW": "W",
            "KeyE": "E",
            "KeyR": "R",
            "KeyT": "T",
            "KeyY": "Y",
            "KeyU": "U",
            "KeyI": "I",
            "KeyO": "O",
            "KeyP": "P",

            "Slash": "/",
            "Backslash": "\\",
            "Period": ".",
            "Comma": ",",
            "Backquote": "`",
            "Quote": "'",
            "Semicolon": ";",
            "Semicolon": ";",
            "Semicolon": ";",
            "BracketLeft": "[",
            "BracketRight": "]",

            "Digit0": "0",
            "Digit1": "1",
            "Digit2": "2",
            "Digit3": "3",
            "Digit4": "4",
            "Digit5": "5",
            "Digit6": "6",
            "Digit7": "7",
            "Digit8": "8",
            "Digit9": "9",
            "Equal": "=",
            "Minus": "-",

            "ArrowUp": "↑",
            "ArrowDown": "↓",
            "ArrowLeft": "←",
            "ArrowRight": "→",

            "shift": "Shift",
            "alt": "Alt",
            "ctrl": "Ctrl",

        };

        return (
            shortcut
                .map((key) => textByShortcut[key] || key)
                .join(" + ")
        );

    }

    getEncodedShortcut(shortcut) {

        if (typeof shortcut === "string") return shortcut;

        const prioritet = { shift: 1, ctrl: 2, alt: 3 };
        return (
            shortcut
                .sort((a, b) => (prioritet[a] || 4) - (prioritet[b] || 4))
                .join(",")
        );

    }
    getDecodedShortcut(shortcut) {

        if (Array.isArray(shortcut)) return shortcut;

        return shortcut.split(",");

    }

}

// ---------------------------------------------------------- //
// Список заблокированных по умолчанию быстрых клавиш (shortcut-ов),
// которые могут быть зарезервированны операционной системой или 
// браузером
// ---------------------------------------------------------- //
const defaultBlockedShortcutsEncoded = new Set([

    // Ошибочные шорткаты
    "shift,ctrl,alt",
    "shift,ctrl",
    "shift,alt",
    "shift",
    "ctrl,alt",
    "ctrl",
    "alt",

    // Основные шорткаты для браузеров и ОС
    "ctrl,KeyC",
    "ctrl,KeyV",
    "ctrl,KeyX",
    "ctrl,KeyZ",
    "ctrl,KeyA",
    "ctrl,KeyS",
    "ctrl,KeyP",
    "ctrl,KeyT",
    "ctrl,KeyN",
    "ctrl,KeyW",
    "shift,ctrl,KeyT",
    "shift,ctrl,KeyN",
    "ctrl,KeyF",
    "ctrl,KeyR",
    "shift,ctrl,KeyR",
    "alt,Tab",
    "alt,ArrowLeft",
    "alt,ArrowRight",
    "alt,F4",
    "F1",
    "F5",
    "F11",
    "shift,ctrl,KeyI",

    // Шорткаты для навигации по сайту
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "shift,Tab",
    "PageUp",
    "PageDown",
    "Home",
    "End",

    // Специфичные для ОС (например, Windows / macOS)
    "cmd,KeyC",
    "cmd,KeyV",
    "cmd,KeyX",
    "cmd,Tab",

    // Шорткаты для управления вкладками
    "ctrl,1",
    "ctrl,2",
    "ctrl,3",
    "ctrl,4",
    "ctrl,5",
    "ctrl,6",
    "ctrl,7",
    "ctrl,8",
    "ctrl,9",
    "shift,ctrl,Tab",
    "ctrl,KeyW",
    "shift,ctrl,KeyW"

]);

// ---------------------------------------------------------- //
// Локальное хранилище для "запоминания" новых комбинаций 
// пользователя
// ---------------------------------------------------------- //
class LocalStorageManager {

    constructor(keyStorage, shortcutManager) {

        this.keyStorage = keyStorage;
        this.shortcutManager = shortcutManager;

        let storedShortcutsString = localStorage.getItem(this.keyStorage);
        if (storedShortcutsString) {
            const storedShortcuts = JSON.parse(storedShortcutsString);
            for (const [encodedShortcut, actionName] of storedShortcuts) {
                this.shortcutManager.set(encodedShortcut, actionName);
            }
        }

    }

    sync() {
        localStorage.setItem(
            this.keyStorage,
            JSON.stringify(Array.from(this.shortcutManager.entries()))
        );
    }

}

// main ===================================================== //
export default (() => {

    const actionsManager = new ActionsManager();
    const shortcutManager = new ShortcutManager();
    const localStorageManager = new LocalStorageManager("shortcut_manager_data", shortcutManager);

    // listen shortcut combination
    window.addEventListener("keydown", (event) => {
        const shortcut = getShortcutByKeydownEvent(event);
        const actionName = shortcutManager.get(shortcut);
        if (actionName) {
            const action = actionsManager.get(actionName);
            action.execute();
        };
    });


    function getShortcutByKeydownEvent(event) {

        const shortcut = [event.code];
        if (event.altKey) shortcut.push("alt");
        if (event.shiftKey) shortcut.push("shift");
        if (event.ctrlKey) shortcut.push("ctrl");

        return shortcut;

    }

    return {

        getActionsBySection: actionsManager.getBySection.bind(actionsManager), //

        add({ shortcut, actionName, description, action, section } = { shortcut: null, section: "default" }) {

            try {

                if (defaultBlockedShortcutsEncoded.has(shortcutManager.getEncodedShortcut(shortcut))) throw new Error("blocked");
                if (actionsManager.has(actionName)) throw new Error("exist action name");
                // if (shortcutManager.has(shortcut)) throw new Error("exist shortcut");

                actionsManager.set(actionName, description, action, section);
                if (shortcut) shortcutManager.set(shortcut, actionName);

            } catch (error) {
                console.error(error);
            } finally {
                return this;
            }

        }, //

        getTextShortcutByActionName(searchActionName) {

            for (let [encodedShortcut, actionName] of shortcutManager.entries()) {
                if (actionName === searchActionName) {
                    return shortcutManager.getTextShortcut(encodedShortcut);
                }
            }

            return "";

        }, //

        getTextShortcut: shortcutManager.getTextShortcut.bind(shortcutManager), //
        getShortcutByKeydownEvent, //

        setShortuct(shortcut, actionName) {

            try {

                if (defaultBlockedShortcutsEncoded.has(shortcutManager.getEncodedShortcut(shortcut))) throw new Error("blocked");
                if (!actionsManager.has(actionName)) throw new Error("not_found");

                shortcutManager.set(shortcut, actionName);
                if (localStorageManager) localStorageManager.sync();

            } catch (error) {
                console.error(error);
            } finally {
                return this;
            }

        }, //
        deleteShortcut(shortcut) {

            try {

                if (shortcutManager.has(actionName)) throw new Error("not_found");

                shortcutManager.delete(shortcut);

            } catch (error) {
                console.error(error);
            } finally {
                return this;
            }

        }, //

    };

})();