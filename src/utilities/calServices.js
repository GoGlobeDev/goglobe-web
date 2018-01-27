// import fetch from 'isomorphic-fetch';
// import { MATH_SERVER } from 'constants/AppConstants';
// 按需引入mathjs
import * as mathCore from 'mathjs/core';
const mathExp = mathCore.create();
mathExp.import(require('mathjs/lib/expression'));
mathExp.import(require('mathjs/lib/function/arithmetic'));

export function getValList(list, initList) {
    return list.reduce((pre, next) => {
        if ((next.type === 'number' || next.type === 'formula') && next.value.length > 0) {
            const fid = `f${next.fid}`;
            pre[fid] = parseFloat(next.value[0]);
            return pre;
        }
        // if (next.type === 'combo' && next.value.length > 0) {
        //     return next.value.reduce((pre2, next2) => {
        //         return getValList(next2, pre2);
        //     }, pre);
        // }
        // 只展开子表单中第0个拓展, 防止子表单的其它拓展覆盖第0个拓展的值
        if (next.type === 'combo' && next.value.length > 0) {
            return getValList(next.value[0], pre);
        }
        return pre;
    }, initList);
}

// 计算公式字段， 宋鹏程 2016/12/26
// change GET to POST by zyd on 2016/12/28
// 废弃, 改用本地计算
// export function calFormula(schema, exp) {
//     const valList = getValList(schema.value, {});
//     const _exp = exp.replace(/\$\d+\$/g, (field) => {
//         const fid = 'f' + field.slice(1, field.length - 1);
//         // 如果数值没填，当成0
//         return valList[fid] || 0;
//     });
//     return fetch(MATH_SERVER + '/mathjs', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             'expr': _exp
//         })
//     }).then(response => {
//         if (response.ok) {
//             return response.text();
//         }
//     });
// }

// 本地计算
export function calFormulaLocal(schema, exp) {
    const valList = getValList(schema.value, {});
    const _exp = exp.replace(/\$\d+\$/g, (field) => {
        const fid = 'f' + field.slice(1, field.length - 1);
        // 如果数值没填，当成0
        return valList[fid] || 0;
    });
    return mathExp.eval(_exp);
}

// 本地校验表达式是否合法
export function checkExpression(exp) {
    return mathExp.eval(exp);
}
