// main ==================================================== //
interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement,
    password: HTMLInputElement,
    confirm_password: HTMLInputElement
}
interface CustomRegisterForm extends HTMLFormElement {
    elements: FormElements
}

// exports ================================================= //
export type { CustomRegisterForm };