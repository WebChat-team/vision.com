// main ==================================================== //
interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement,
    password: HTMLInputElement
}
interface CustomLoginForm extends HTMLFormElement {
    elements: FormElements
}

// exports ================================================= //
export type { CustomLoginForm };