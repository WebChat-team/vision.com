export default function getClassName(...classNames: Array<string | null | undefined>) {

    let resultClassName = "";

    for (const className of classNames) {
        resultClassName += " " + className;
    }

    return resultClassName;

}