"use server";

// imports ================================================== //
import getTransferedCookiesToServer from "./getTransferedCookieToServer";
import transferCookieToClient from "./transferCookieToClient";
import { NextResponse } from "next/server";

// main ===================================================== //
// PS: использовать данную функцию можно только так где
// можно перезаписать cookie:
// https://nextjs.org/docs/app/api-reference/functions/cookies
//
// Так как все взаимодействие с сервером проходит через сервер
// фреймворка Next (он выступает как прокси-сервер), то и
// данные будут приходить на него. Из-за этого куки приходится
// вручную перемещать из результата одного запроса в другой!
//
// Пример:
// BACKEND  -------->     NEXT_SERVER     -------->  FRONTEND
//          <--------                     <--------
//           cookie        fetchNext        cookie
//
// Функция ниже позволит вам переместить куки как от сервера
// (бекенда) на клиента, так и наоборот.
const fetchNext: typeof fetch = async (input, init = {}) => {

    "use server";

    init.headers = {
        cookie: getTransferedCookiesToServer(),
        ...init.headers,
    };

    const responseDefaultFetch = await fetch(input, init);
    const response = new NextResponse(
        responseDefaultFetch.body,
        {
            status: responseDefaultFetch.status,
            statusText: responseDefaultFetch.statusText,
            headers: responseDefaultFetch.headers,
        }
    );
    transferCookieToClient(response.cookies, response.headers.getSetCookie())
    return response;

};

// exports ================================================== //
export default fetchNext;