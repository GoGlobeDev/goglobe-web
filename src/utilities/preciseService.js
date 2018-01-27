// 数值精度转换 by zyd on 2016.12.29

export function preciseConvert(num = 0, precise) {
    const array = num.toString().split('') || [];
    if (array.indexOf('.') === -1) {
        array.push('.');
    }
    array.push('0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    const pointIndex = array.indexOf('.');
    const newArray = array.slice(0, pointIndex + precise + 1);
    if (newArray[newArray.length - 1] === '.') {
        // 精度为零时候去掉结尾的小数点
        newArray.pop();
    }
    return (newArray.join(''));
}
