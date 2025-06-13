export default function isProxy(obj: object) {
    try {
        // Пытаемся получить дескриптор свойства (если это Proxy, это может вызвать ловушку)
        Object.getOwnPropertyDescriptor(obj, 'someNonExistentProperty');
        return false;
    } catch (e) {
        // Если была вызвана ловушка getOwnPropertyDescriptor, возможно, это Proxy
        return true;
    }
}