export default function getErrorMessageByStatusCode(code: number) {

    if (200 < code && code < 300) {
        return "Успешно";
    } else if (400 < code && code < 500) {
        return "Неверный логин или пароль";
    } else if (500 < code && code < 600) {
        return "Приносим свои извинения, ошибка на сервере. Повторите свой запрос через пару минут :(";
    } else {
        return "Неизвестная ошибка";
    }

}