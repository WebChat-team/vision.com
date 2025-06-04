// helpers ================================================== //
function sortedShortcut(shortcut) {
    const prioritet = { "shift": 1, "ctrl": 2, "alt": 3 };
    return shortcut.sort((a, b) => (prioritet[a] || 4) - (prioritet[b] || 4));
}

const getEncodedShortcut = (shortcut) => sortedShortcut(shortcut).join(",");
const getDecodedShortcut = (encoded_shortcut) => encoded_shortcut.split(",");
const getUniqueId = () => `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

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
const blockedShortcutsEncoded = new Set([
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

const getTextShortcut = (shortcut) => (
    shortcut
        .map((key) => textByShortcut[key] || key)
        .join(" + ")
);

// main ===================================================== //
// WARNING:
// Продумать как добавить localStorage для добавления shortcut-ов
// Как вариант, использовать заранее известные id (имена действий)
// и использовать их как ключи (см. SHORTCUT_MANAGER.__listShortcuts)
export default function getShortcutManager() {

    const SHORTCUT_MANAGER = {

        // список действий по id
        __listActions: new Map(),
        // привязываем shortcut к определённому действию (id)
        __listShortcuts: new Map(),
    

        add(shortcut, description, action, section) {
    
            const encoded_shortcut = getEncodedShortcut(shortcut);
            if (this.__listShortcuts.has(encoded_shortcut)) return "exist";
            if (blockedShortcutsEncoded.has(encoded_shortcut)) return "blocked";
    
            const action_id = getUniqueId();
            this.__listActions.set(action_id, { action, description, section });
            this.__listShortcuts.set(encoded_shortcut, action_id);
    
            return action_id;
    
        },
    
        // заменяет текущую комбинацию клавиш на другую
        // возвращает строковое значение обозначающее состояние
        // операции по завершению, где:
        // 'success' - комбинация успешно заменена
        // 'exist' - новая комбинация уже записана
        // 'not_found' - комбинация для замены не найдена
        // 'blocked' - комбинация находится в списке заблокированных
        change(current_shortcut, next_shortcut) {
    
            const encoded_current_shortcut = getEncodedShortcut(current_shortcut);
            const encoded_next_shortcut = getEncodedShortcut(next_shortcut);
    
            if (!this.__listShortcuts.has(encoded_current_shortcut)) return "not_found";
            if (this.__listShortcuts.has(encoded_next_shortcut)) return "exist";
            if (blockedShortcutsEncoded.has(encoded_next_shortcut)) return "blocked";
    
            const action_id = this.__listShortcuts.get(encoded_current_shortcut);
            this.__listShortcuts.delete(encoded_current_shortcut);
            this.__listShortcuts.set(encoded_next_shortcut, action_id);
    
            return "success";
    
        },
    
        // удаление комбинации
        // возвращает строковое значение обозначающее состояние
        // операции по завершению, где:
        // 'success' - комбинация успешно заменена
        // 'not_found' - комбинация не найдена
        remove(shortcut) {
            return (
                this.__listShortcuts.delete(getEncodedShortcut(shortcut)) ?
                    "success" :
                    "not_found"
            );
        },
    
        getShortcutsBySection(section) {
            return Object.fromEntries(
                [...this.__listActions].filter(([id_action, action]) => !section || action.section === section)
            );
        },
    
        getShortcutById(id) {
    
            const entry = [...this.__listShortcuts].find(([encoded_shortcut, id_action]) => id === id_action);
            if (!entry) return undefined;
    
            const [encoded_shortcut] = entry;
            const decoded_shortcut = getDecodedShortcut(encoded_shortcut);
            const action = this.__listActions.get(id);
            return (
                action ?
                    {
                        textShortcut: getTextShortcut(decoded_shortcut),
                        description: action.description,
                        shortcut: decoded_shortcut,
                    } :
                    undefined
            );
    
        },
    
        getShortcutByEvent(event) {
    
            const shortcut = [event.code];
            if (event.altKey) shortcut.push("alt");
            if (event.shiftKey) shortcut.push("shift");
            if (event.ctrlKey) shortcut.push("ctrl");
    
            return sortedShortcut(shortcut);
    
        },
    
    };

    window.addEventListener("keydown", (event) => {

        const shortcut = SHORTCUT_MANAGER.getShortcutByEvent(event);
        const encoded_shortcut = getEncodedShortcut(shortcut);
        const id_action = SHORTCUT_MANAGER.__listShortcuts.get(encoded_shortcut);

        if (id_action) {
            event.preventDefault();
            SHORTCUT_MANAGER.__listActions.get(id_action)?.action();
        }

    });

    return SHORTCUT_MANAGER;

};