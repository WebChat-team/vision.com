// imports ================================================== //
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

// helpers ================================================== //
function getOptionsResponseCookie(inputOptions: string[]) {

    const outputOptions = {};

    for (const option of inputOptions) {

        let [key, value] = option.split("=");

        // все параметры куки должны быть с прописной буквы
        key = key[0].toLowerCase() + key.slice(1);

        switch (key) {

            case "expires":
                // @ts-ignore: 
                outputOptions[key] = new Date(value);
                break;

            case "httpOnly":
            case "secure":
                // @ts-ignore: 
                outputOptions[key] = true;
                break;

            default:
                // @ts-expect-error idk what to do
                outputOptions[key] = value;
                break;

        }

    }

    return outputOptions;

}

// main ===================================================== //
export default function transferCookieToClient(
    responseCookies: ResponseCookies,
    setCookies: string[]
) {

    for (const setCookie of setCookies) {

        // необходимо удалить пробел после каждой ;
        const [payloadCookie, ...optionsCookie] = setCookie.split("; ");

        const [nameCookie, valueCookie] = payloadCookie.split("=");
        const optionsResponseCookie = getOptionsResponseCookie(optionsCookie);

        if (nameCookie && valueCookie) {
            responseCookies.set(nameCookie, valueCookie, optionsResponseCookie);
        }

    }

}