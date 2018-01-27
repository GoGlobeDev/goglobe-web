// 深度拷贝
/* eslint-disable */
export function deepCopy(obj ,copy) {
    obj = JSON.parse(JSON.stringify(copy));
    return obj;
}