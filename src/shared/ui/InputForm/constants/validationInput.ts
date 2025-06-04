// types ==================================================== //
interface Validation {
    pattern: string,
    message: string,
}
interface ValidationInput {
    password: Validation,
    [key: string]: Validation
}

// main ===================================================== //
const validationInput: ValidationInput = {

    // I found this regular expression on
    // https://uibakery.io/regex-library/email
    // email: {
    //     pattern: (
    //         "[a-z0-9!#$%&'*+/=?\\^_`{|}~\-]+(?:\.[a-z0-9!#$%&'*+/=?\\^_`{|}~\\-])*" + // email name
    //         "@" +
    //         "(?:[a-z0-9](?:[a-z0-9\\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\\-]*[a-z0-9])?"   // domen name
    //     ),
    //     message: (
    //         "Почта не верно заполнена"
    //     )
    // },

    // I found this regular expression on
    // https://uibakery.io/regex-library/password
    password: {
        pattern: (
            "(?=.*[0-9])" + // digits
            "(?=.*[A-Z])" + // uppercase_letters
            "(?=.*[a-z])" + // lowercase_letters
            "(?=.*[#?!@$_%&*\\^\\-])" +   // spec_symbol
            ".{8,16}"
        ),
        message: (
            "Пароль должен содержать цифры, " +
            "строчные и заглавные латинские буквы и " +
            "специальные символы (#?!@$_%&*^-). " +
            "Длина пароля от 8 до 16 символов"
        )
    }

};

// export =================================================== //
export default validationInput;