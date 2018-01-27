import { convertFromRaw } from 'draft-js';
import moment from 'moment';
import { LANG } from 'theme/Lang';

/* eslint-disable */
export function isFieldEmpty(field) {
    let voidVali = new Array();
    let voidStatus = false;
    if (field.prop.field_type === 'splitter' || field.prop.field_type === 'link_doc_filter') {
        return false;
    }
    if (!field.values || field.values.length === 0 || field.prop.invisible) {
        return true;
    }
    // if ( field.prop.value_list && field.values[0] === -1) {
    //     return true;
    // }

    // if (field.values[0].name === '') {
    //     return true;
    // }
    // if (field.prop.field_type === 'date' && field.values[0] === -1) {
    //     return true;
    // }
    if (field.prop.field_type === 'combo' || field.prop.field_type === 'ref_dir_tree' || field.prop.field_type === 'address'
        || field.prop.field_type === 'loose_date' || field.prop.field_type === 'ref_doc' || field.prop.field_type === 'ref_obj'
        || field.prop.field_type === 'opt_setting' || field.prop.field_type === 's_choice' || field.prop.field_type === 'district'
        || field.prop.field_type === 'ref_name' || field.prop.field_type === 'user' || field.prop.field_type === 'group') {
        compfieldVali(field, voidVali);
        for (let i = 0; i < voidVali.length; i++) {
            voidStatus = voidStatus || voidVali[i];
        }
        if (voidStatus === false) {
            return true;
        }
    } else {
        if (!simpfieldVali(field)) {
            return true;
        }
    }
    return false;
}
/* 验证简单字段是否为空的函数 zhuzhiyong 20170413*/
export function simpfieldVali(field, fatherField) {
    let result = false;
    if (!field.values || field.values.length === 0) {
        return result;
    }
    if (field.prop.field_type === 'single_select' || field.prop.field_type === 'drop_list' || field.prop.field_type === 'multiple_select') {
        for (let i = 0; i < field.values[0].value.length; i++) {
            if (field.values[0].value[i] === -1 || field.values[0].value[i] === '' || field.values[0].value[i] === null) {
                result = false;
            } else {
                result = true;
                return result;
            }
        }
    } else if (field.prop.field_type === 'rich_text') {
        for (let i = 0; i < field.values.length; i++) {
            let _lang = LANG;
            if (field.prop.trans_type === 'uni') {
                _lang = 'uni';
            }
            const value = convertFromRaw(JSON.parse(_deCipher(field.values[i].value[_lang]))).getPlainText('\n');
            if (value === '' || value === null) {
                result = false;
            } else {
                result = true;
                return result;
            }
        }
    } else if (field.type === 'iString') {
        if (fatherField && fatherField.values[0].value[1].values[0].value.length === 0) {
            result = false;
            return result;
        } else {
            for (let i = 0; i < field.values.length; i++) {
                let _lang = LANG;
                if (field.prop.trans_type === 'uni') {
                    _lang = 'uni';
                }
                if (field.values[i].value[_lang] === '' || field.values[i].value[_lang] === null || field.values[i].value[_lang] === undefined) {
                    result = false;
                } else {
                    result = true;
                    return result;
                }
            }
        }
    } else if (field.prop.field_type === 's_attitude') {
        for (let i = 0; i < field.values[0].value.length; i++) {
            if (field.values[0].value[i] > 100 || field.values[0].value[i] < -100 || field.values[0].value[i] === '' || field.values[0].value[i] === null) {
                result = false;
            } else {
                result = true;
                return result;
            }
        }
    } else {
        for (let i = 0; i < field.values.length; i++) {
            if (field.values[i].value === '' || field.values[i].value === null || field.values[i].value === undefined) {
                result = false;
            } else {
                result = true;
                return result;
            }
        }
    }
    return result;
}
/* 验证复合字段是否为空的函数 */
function compVoidVali(field, resultArr) {
    if (!field.values || field.values.length === 0) {
        return false;
    }
    for (let i = 0; i < field.values.length; i++) {
        for (let j = 0; j < field.values[i].value.length; j++) {
            if (field.values[i].value[j].prop.field_type === 'combo' || field.values[i].value[j].prop.field_type === 'address'
                || field.values[i].value[j].prop.field_type === 'loose_date' || field.values[i].value[j].prop.field_type === 'ref_name'
                || field.values[i].value[j].prop.field_type === 'ref_doc' || field.values[i].value[j].prop.field_type === 'ref_dir_tree'
                || field.values[i].value[j].prop.field_type === 'user' || field.values[i].value[j].prop.field_type === 'group') {
                if (compVoidVali(field.values[i].value[j], [])) {
                    resultArr[i] = true;
                    break;
                } else {
                    let fieldresult = false;
                    for (let z = 0; z < field.values.length; z++) {
                        fieldresult = fieldresult || resultArr[z];
                    }
                    if (fieldresult) {
                        resultArr[i] = true;
                        break;
                    } else {
                        resultArr[i] = false;
                    }
                }
            } else {
                if (simpfieldVali(field.values[i].value[j])) {
                    resultArr[i] = true;
                    break;
                } else {
                    resultArr[i] = false;
                }
            }
        }
    }
    let result = false;
    for (let item = 0; item < field.values.length; item++) {
        result = result || resultArr[item];
    }
    return result;
}
/* 验证复合字段必填的函数 */
export function compfieldVali(field, resultArr) {
    if (!field.values || field.values.length === 0) {
        return false;
    }
    for (let i = 0; i < field.values.length; i++) {
        for (let j = 0; j < field.values[i].value.length; j++) {
            if (field.values[i].value[j].prop.field_type === 'combo' || field.values[i].value[j].prop.field_type === 'ref_dir_tree'
                || field.values[i].value[j].prop.field_type === 'address' || field.values[i].value[j].prop.field_type === 'loose_date'
                || field.values[i].value[j].prop.field_type === 'ref_name' || field.values[i].value[j].prop.field_type === 'user'
                || field.values[i].value[j].prop.field_type === 's_choice' || field.values[i].value[j].prop.field_type === 'district'
                || field.values[i].value[j].prop.field_type === 'ref_obj' || field.values[i].value[j].prop.field_type === 'ref_doc'
                || field.values[i].value[j].prop.field_type === 'group') {
                if (compVoidVali(field.values[i].value[j], [])) {
                    resultArr[i] = true;
                    break;
                } else {
                    resultArr[i] = false;
                }
            } else {
                if (field.prop.field_type === 's_choice') {
                    const _field = field;
                    if (simpfieldVali(field.values[i].value[j], _field)) {
                        resultArr[i] = true;
                        break;
                    } else {
                        resultArr[i] = false;
                    }
                } else {
                    if (simpfieldVali(field.values[i].value[j])) {
                        resultArr[i] = true;
                        break;
                    } else {
                        resultArr[i] = false;
                    }
                }
            }
        }
    }
    let result = true;
    for (let i = 0; i < field.values.length; i++) {
        result = result && resultArr[i];
    }
    return result;
}

/* 验证是否必填的function */
export function requiredVali(obj, fields, data) {
    if (!obj.prop.invisible) {
        if (obj.path.length > 1) {
            const fatherField = fields[obj.path[obj.path.length - 2].toString()];
            if (obj.path.length > 2) {
                // 表单引用本地填写了里面的必填字段就一定要填写
                const grandFatherField = fields[obj.path[obj.path.length - 3].toString()];
                if (grandFatherField.prop.field_type === 'ref_doc') {
                    if (grandFatherField.value && !obj.value) {
                        return false;
                    } else if (obj.value) {
                        let objValueLen = Object.keys(obj.value).length;
                        let fatherValueLen = 0;
                        for (let path in grandFatherField.value) {
                            fatherValueLen += grandFatherField.value[path].length;
                        }
                        if (objValueLen < fatherValueLen) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            // 验证子表单内必填
            if (fatherField.prop.field_type === 'combo' || fatherField.prop.field_type === 'opt_setting' || fatherField.prop.field_type === 'ref_doc'
                || fatherField.prop.field_type === 'ref_name' || fatherField.prop.field_type === 'user' || fatherField.prop.field_type === 'group') {
                if (fatherField.value && !obj.value) {
                    return false;
                } else if (obj.value) {
                    // 验证时间戳子表单内必填
                    // if (obj.prop.field_type === 'datetime') {
                    //     for (let path in obj.value) {
                    //         for (let idx = 0; idx < obj.value[path].length; idx++) {
                    //             const value = data[obj.value[path][idx].toString()].value;
                    //             if (!value || value === '0000-01-01 00:00:00') {
                    //                 return false;
                    //             }
                    //         }
                    //     }
                    // }
                    // 验证时间戳子表单内必填end
                    let objValueLen = Object.keys(obj.value).length;
                    let fatherValueLen = 0;
                    for (let path in fatherField.value) {
                        fatherValueLen += fatherField.value[path].length;
                    }
                    if (objValueLen < fatherValueLen) {
                        return false;
                    }
                }
                return true;
            } else {
                if (!obj.value) {
                    return false;
                }
                return true;
            }
        } else {
            if (obj.prop.field_type === 'ref_fld') {
                for (let path in obj.value) {
                    for (let idx = 0; idx < obj.value[path].length; idx++) {
                        if (JSON.parse(data[obj.value[path][idx].toString()].value).selected_fields.length === 0) {
                            return false;
                        }
                    }
                }
            // } else if (obj.prop.field_type === 'datetime') {
            //     for (let path in obj.value) {
            //         for (let idx = 0; idx < obj.value[path].length; idx++) {
            //             const value = data[obj.value[path][idx].toString()].value;
            //             if (!value || value === '0000-01-01 00:00:00') {
            //                 return false;
            //             }
            //         }
            //     }
            } else if (!obj.value) {
                return false;
            }
            return true;
        }
    }
    return true;
}
/* 老版的验证是否必填的function */
// export function requiredVali(obj) {
//     if (!obj.prop.invisible) {
//         if (!obj.values || obj.values.length === 0) {
//             return false;
//         }
//         /* 验证子表单必填 */
//         if (obj.prop.field_type === 'combo' || obj.prop.field_type === 'address' || obj.prop.field_type === 'loose_date') {
//             if (!compfieldVali(obj, [])) {
//                 return false;
//             }
//             return true;
//         } else if (obj.prop.field_type === 'single_select' || obj.prop.field_type === 'drop_list') {
//             for (let i = 0; i < obj.values[0].value.length; i++) {
//                 if (obj.values[0].value[i] === -1 || obj.values[0].value[i] === '' || obj.values[0].value[i] === null) {
//                     return false;
//                 }
//             }
//         } else if (obj.prop.field_type === 'multiple_select') {
//             for (let i = 0; i < obj.values[0].value.length; i++) {
//                 if (obj.values[0].value[i] === -1 && obj.values[0].value.length === 1) {
//                     return false;
//                 }
//             }
//         } else if (obj.type === 'iString') {
//             for (let i = 0; i < obj.values.length; i++) {
//                 if (obj.values[i].value[LANG] === "" || obj.values[i].value[LANG] === null) {
//                     return false;
//                 }
//             }
//         } else {
//             for (let i = 0; i < obj.values.length; i++) {
//                 if (obj.values[i].value === "" || obj.values[i].value === null) {
//                     return false;
//                 }
//             }
//         }
//     }
//     return true;
// }
function _deCipher(text) {
    let str = '';
    for (let i = 0; i < text.length; i++) {
        str += String.fromCharCode(text.charCodeAt(i) - 128);
    }
    return str;
}
/* 验证是否大于最小长度的function */
export function minLengthVali(obj, minLength) {
    if (obj.type === 'iString') {
        for (let i = 0; i < obj.values.length; i++) {
            let _lang = LANG;
            if (obj.prop.trans_type === 'uni') {
                _lang = 'uni';
            }
            if (obj.prop.field_type === 'rich_text' && obj.values[i].value[_lang] !== '') {
                const value = convertFromRaw(JSON.parse(_deCipher(obj.values[i].value[_lang]))).getPlainText('\n');
                if (value.length < minLength) {
                    return false;
                }
            } else if (obj.values[i].value[_lang] !== '' && obj.values[i].value[_lang].length < minLength) {
                return false;
            }
        }
    } else {
        for (let i = 0; i < obj.values.length; i++) {
            if (obj.values[i].value !== '' && obj.values[i].value.length < minLength) {
                return false;
            }
        }
    }
    return true;
}
export function minLengthSaveVali(obj, minLength, fields, data) {
    if (minLength !== 0) {
        if (requiredVali(obj, fields, data)) {
            if (obj.value) {
                if (obj.type === 'iString') {
                    for (let path in obj.value) {
                        for (let idx = 0; idx < obj.value[path].length; idx++) {
                            let _lang = LANG;
                            if (obj.prop.trans_type === 'uni') {
                                _lang = 'uni';
                            }
                            if (obj.prop.field_type === 'rich_text') {
                                const value = convertFromRaw(JSON.parse(_deCipher(data[obj.value[path][idx].toString()].value[_lang]))).getPlainText('\n');
                                if (value.length < minLength) {
                                    return false;
                                }
                            } else if (data[obj.value[path][idx].toString()].value[_lang].length < minLength) {
                                return false;
                            }
                        }
                    };
                } else {
                    for (let path in obj.value) {
                        for (let idx = 0; idx < obj.value[path].length; idx++) {
                            if (data[obj.value[path][idx].toString()].value.length < minLength) {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }
    return true;
}


/* 验证是否小于最大长度的function */
export function maxLengthVali(obj, maxLength) {
    if (obj.type === 'iString') {
        for (let i = 0; i < obj.values.length; i++) {
            let _lang = LANG;
            if (obj.prop.trans_type === 'uni') {
                _lang = 'uni';
            }
            if (obj.prop.field_type === 'rich_text') {
                const value = convertFromRaw(JSON.parse(_deCipher(obj.values[i].value[_lang]))).getPlainText('\n');
                if (value.length > maxLength) {
                    return false;
                }
            } else if (obj.values[i].value[_lang] !== '') {
                if (obj.values[i].value[_lang].length > maxLength) {
                    return false;
                }
            }
        }
    } else {
        for (let i = 0; i < obj.values.length; i++) {
            if (obj.values[i].value !== '') {
                if (obj.values[i].value.length > maxLength) {
                    return false;
                }
            }
        }
    }
    return true;
}
export function maxLengthSaveVali(obj, maxLength, data) {
    if (obj.value) {
        if (obj.type === 'iString') {
            for (let path in obj.value) {
                for (let idx = 0; idx < obj.value[path].length; idx++) {
                    let _lang = LANG;
                    if (obj.prop.trans_type === 'uni') {
                        _lang = 'uni';
                    }
                    if (obj.prop.field_type === 'rich_text') {
                        const value = convertFromRaw(JSON.parse(_deCipher(data[obj.value[path][idx].toString()].value[_lang]))).getPlainText('\n');
                        if (value.length > maxLength) {
                            return false;
                        }
                    } else if (data[obj.value[path][idx].toString()].value[_lang].length > maxLength) {
                        return false;
                    }
                }
            }
        } else {
            for (let path in obj.value) {
                for (let idx = 0; idx < obj.value[path].length; idx++) {
                    if (data[obj.value[path][idx].toString()].value.length > maxLength) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

/* 验证文本字数的function */
export function wordLengthVali(obj, wordLength) {
    for (let i = 0; i < obj.values.length; i++) {
        let _lang = LANG;
        if (obj.prop.trans_type === 'uni') {
            _lang = 'uni';
        }
        if (wordLength !== 0 && obj.values[i].value[_lang].length !== 0 && obj.values[i].value[_lang].length !== wordLength) {
            return false;
        }
    }
    return true;
}
export function wordLengthSaveVali(obj, wordLength, data) {
    if (obj.value) {
        for (let path in obj.value) {
            for (let idx = 0; idx < obj.value[path].length; idx++) {
                let _lang = LANG;
                if (obj.prop.trans_type === 'uni') {
                    _lang = 'uni';
                }
                if (data[obj.value[path][idx]].value[_lang].length !== wordLength) {
                    return false;
                }
            }
        }
    }
    return true;
}

/* 验证填写次数是否大于最小填写次数的function */
export function minRecordVali(value, minRecord) {
    if (value.length < minRecord) {
        return false;
    }
    return true;
}

export function minRecordSaveVali(obj, minRecord) {
    // if (obj.type === 'combo') {
    //     if (Object.keys(obj.value).length < minRecord) {
    //         return false;
    //     }
    // } else {
    for (let path in obj.value) {
        if (obj.value[path].length < minRecord) {
            return false;
        }
    }
    return true;
}

/* 验证填写次数是否小于最大填写次数的function */
export function maxRecordVali(value, maxRecord) {
    if (value.length <= maxRecord || maxRecord === 0) {
        return true;
    }
    return false;
}
export function maxRecordSaveVali(obj, maxRecord) {
    if (maxRecord !== 0) {
        // if (obj.type === 'combo') {
        //     if (Object.keys(obj.value).length > maxRecord) {
        //         return false;
        //     }
        // } else {
        for (let path in obj.value) {
            if (obj.value[path].length > maxRecord) {
                return false;
            }
        }
    }
    return true;
}

export function minLevelSaveVali(obj, minLevel) {
    for (let path in obj.value) {
        if (obj.value[path].length < minLevel) {
            return false;
        }
    }
    return true;
}
export function maxLevelSaveVali(obj, maxLevel) {
    if (maxLevel !== 0) {
        for (let path in obj.value) {
            if (obj.value[path].length > maxLevel) {
                return false;
            }
        }
    }
    return true;
}

/* 验证数字是否符合要求（整数或实数）*/
export function numberVali(value, numType) {
    for (let i = 0; i < value.length; i++) {
        if (numType === 'int') {
            if (parseInt(value[i].value, 10) !== Number(value[i].value) && value[i].value !== null && value[i].value !== '') {
                return false;
            }
        }
    }
    return true;
}
export function numberSaveVali(value, numType, data) {
    for (let path in value) {
        for (let i = 0; i < value[path].length; i++) {
            if (numType === 'int') {
                if (parseInt(data[value[path][i].toString()].value, 10) !== Number(data[value[path][i].toString()].value)) {
                    return false;
                }
            }
        }
    }
    return true;
}

/* 验证数字格式是否正确 */
export function numTypeVali(value) {
    for (let i = 0; i < value.length; i++) {
        if (value[i].value === undefined) {
            return false;
        }
    }
    return true;
}

export function numSizeVali(value) {
    for (let i = 0; i < value.length; i++) {
        if (value[i].value > 100 || value[i].value < -100) {
            return false;
        }
    }
    return true;
}


export function numberRangeVali(value, numType, data) {
    for (let path in value) {
        for (let i = 0; i < value[path].length; i++) {
            if (numType === 'int') {
                if (parseInt(data[value[path][i].toString()].value, 10) > 100 || parseInt(data[value[path][i].toString()].value, 10) < -100) {
                    return false;
                }
            }
        }
    }
    return true;
}

/* 验证松散日期的月是否正确 */
export function monthVali(value) {
    if (!value) {
        return true;
    }
    if (value.value === null || value.value === '' || (value.value > 0 && value.value <= 12)) {
        return true;
    }
    return false;
}
export function yearSaveVali(yearField, data) {
    if (yearField.value) {
        for (let path in yearField.value) {
            for (let i = 0; i < yearField.value[path].length; i++) {
                if (data[yearField.value[path][i].toString()].value === 0) {
                    return false;
                }
            }
        }
    }
    return true;
}
export function monthSaveVali(monthField, data) {
    if (monthField.value) {
        for (let path in monthField.value) {
            for (let i = 0; i < monthField.value[path].length; i++) {
                if (data[monthField.value[path][i].toString()].value <= 0 || data[monthField.value[path][i].toString()].value > 12) {
                    return false;
                }
            }
        }
    }
    return true;
}

/* 验证松散日期的日是否正确 */
export function dayVali(value) {
    if (!value) {
        return true;
    }
    if (value.value === null || value.value === '' || (value.value > 0 && value.value <= 31)) {
        return true;
    }
    return false;
}
export function daySaveVali(dayField, data) {
    if (dayField.value) {
        for (let path in dayField.value) {
            for (let i = 0; i < dayField.value[path].length; i++) {
                if (data[dayField.value[path][i].toString()].value <= 0 || data[dayField.value[path][i].toString()].value > 31) {
                    return false;
                }
            }
        }
    }
    return true;
}

/* 验证文件大小是否小于最小值 */
export function minFileSizeVali(value, minFileSize) {
    if (typeof (minFileSize) !== 'number') {
        minFileSize = 0;
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i].fileSize < minFileSize * 1024 * 1024) {
            return false;
        }
    }
    return true;
}

/* 验证文件大小是否大于最大值值 */
export function maxFileSizeVali(value, maxFileSize) {
    if (typeof (maxFileSize) !== 'number') {
        maxFileSize = 1;
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i].fileSize > maxFileSize * 1024 * 1024) {
            return false;
        }
        return true;
    }
}
/* 验证子表单的函数 */
// export function valiCombo(combo) {
//     return fieldCheck(combo).then(() => {
//         if (combo.values) {
//             const promise = [];
//             for (let i = 0; i < combo.values.length; i++) {
//                 for (let j = 0; j < combo.values[i].value.length; j++) {
//                     if (combo.values[i].value[j].type === 'combo') {
//                         promise.push(valiCombo(combo.values[i].value[j]));
//                     } else {
//                         promise.push(fieldCheck(combo.values[i].value[j]));
//                     }
//                 }
//             }
//             return Promise.all(promise);
//         }
//     });
// }

// 把data里面为空值的value全部删除
function removeVoidValue(dataValues, fields) {
    const removeIndex = [];
    dataValues.map((item, index) => {
        if (item.value === undefined || item.value === null || !fields[item.fid]) {
            removeIndex.push(index);
        } else {
            switch (fields[item.fid.toString()].type) {
                case 'string':
                    if (item.value === '' || typeof (item.value) !== 'string' || fields[item.fid.toString()].prop.field_type === 'splitter') {
                        removeIndex.push(index);
                    }
                    break;
                case 'list':
                    if (!Array.isArray(item.value) || item.value.length === 0) {
                        removeIndex.push(index);
                    }
                    break;
                case 'digital':
                    if (typeof (item.value) !== 'number') {
                        removeIndex.push(index);
                    }
                    break;
                case 'boolean':
                    if (typeof (item.value) !== 'boolean' || (typeof (item.value) === 'boolean' && !item.value)) {
                        removeIndex.push(index);
                    }
                    break;
                case 'iString':
                    let _lang = LANG;
                    if (fields[item.fid.toString()].prop.trans_type === 'uni') {
                        _lang = 'uni';
                    }
                    if (typeof (item.value) !== 'object' || item.value[_lang] === '') {
                        removeIndex.push(index);
                    } else if (fields[item.fid.toString()].prop.field_type === 'rich_text') {
                        const value = convertFromRaw(JSON.parse(_deCipher(item.value[_lang]))).getPlainText('\n');
                        if (value === '') {
                            removeIndex.push(index);
                        }
                    }
                    break;
                case 'date':
                    if (typeof (item.value) !== 'string' || item.value === '') {
                        removeIndex.push(index);
                    }
                    break;
                default:
                    break;
            }
        }
    });
    for (let idx = removeIndex.length - 1; idx >= 0; idx--) {
        dataValues.splice(removeIndex[idx], 1);
    }
}

// 把Data的Vid整理成树型结构
export function parseValuesVid(form, data) {
    let _formFields = JSON.parse(JSON.stringify(form.fields));
    let _dataValues = Object.keys(data.values).map((key) => {
        return data.values[key];
    });
    removeVoidValue(_dataValues, form.fields);
    Object.keys(_formFields).map((fieldKey) => {
        const field = _formFields[fieldKey];
        _dataValues.map((item) => {
            if (item.path[field.fid.toString()]) {
                if (field.fid === item.fid) {
                    let tmpPath = '';
                    if (field.path.length > 1) {
                        for (let idx = 0; idx < field.path.length - 1; idx++) {
                            tmpPath += item.path[field.path[idx].toString()].toString();
                        }
                    } else {
                        tmpPath = '1';
                    }
                    if (!field.value) {
                        field.value = {};
                        field.value[tmpPath] = [];
                    } else if (!field.value[tmpPath]) {
                        field.value[tmpPath] = [];
                    }
                    field.value[tmpPath].push(item.vid);
                } else {
                    let tmpPath = '';
                    if (field.path.length > 1) {
                        for (let idx = 0; idx < field.path.length - 1; idx++) {
                            tmpPath += item.path[field.path[idx].toString()].toString();
                        }
                    } else {
                        tmpPath = '1';
                    }
                    if (!field.value) {
                        field.value = {};
                        field.value[tmpPath] = [];
                    } else if (!field.value[tmpPath]) {
                        field.value[tmpPath] = [];
                    }
                    if (field.value[tmpPath].indexOf(item.path[field.fid.toString()]) === -1) {
                        field.value[tmpPath].push(item.path[field.fid.toString()]);
                    }
                }
            }
        });
    });
    return _formFields;
}

/* 编辑或者新建资源，字段验证函数 */
export function validationSchema(form, data) {
    const fields = parseValuesVid(form, data);
    let promise = [];
    promise = Object.keys(fields).map((fieldKey) => {
        return saveFieldCheck(fields[fieldKey], fields, data.values, form);
    });
    promise.push(checkFieldSchema(fields, data.values));
    return Promise.all(promise);
}

// 数组查重
function isRepeat(arr) {
    const obj = {};
    for (let idx in arr) {
        if (obj[arr[idx]]) {
            return true;
        }
        obj[arr[idx]] = true;
    }
    return false;
}

/* 字段表单编辑验证函数 */
export function checkFieldSchema(fields, data) {
    return new Promise(function (resolve, reject) {
        let validation = true;
        let errorText = '';
        // 表单中字段之间关系的验证
        let prop = {};
        for (let path in fields) {
            const propName = fields[path].prop.prop_name;
            switch (propName) {
                case 'min_length':
                    prop.min_length = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                case 'max_length':
                    prop.max_length = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                case 'min_record':
                    prop.min_record = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                case 'max_record':
                    prop.max_record = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                case 'greater_equal':
                    prop.greater_equal = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                // wc 2017.12.25 注了，原因是如果把最大（是最大，不知道为什么起个名是less）定为默认值为0，只设最小值的时候就会报错
                // case 'less_equal':
                //     prop.less_equal = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                //     break;
                case 'min_file_size':
                    prop.min_file_size = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                case 'max_file_size':
                    prop.max_file_size = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                case 'min_level':
                    prop.min_level = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                case 'max_level':
                    prop.max_level = fields[path].value ? data[fields[path].value['1'][0].toString()].value : 0;
                    break;
                case 'min_choice':
                    prop.min_choice = fields[path].value ? data[fields[path].value['1'].toString()].value : 0;
                    break;
                case 'max_choice':
                    prop.max_choice = fields[path].value ? data[fields[path].value['1'].toString()].value : 0;
                    break;
                case 'target_base':
                    if (fields[path].value) {
                        prop.target_base = Object.keys(fields[path].value).map((item) => {
                            return data[fields[path].value[item][0].toString()].value;
                        });
                    } else {
                        prop.target_base = [];
                    }
                    break;
                case 'date_format':
                    prop.date_format = fields[path].value ? data[fields[path].value['1'][0].toString()].value : [];
                    break;
                default:
                    break;
            }
        }
        if (prop.max_record && Number(prop.max_record) !== 0 && Number(prop.max_record) < Number(prop.min_record)) {
            validation = false;
            errorText = '最大填写次数必须大于或等于最小填写次数';
            reject(errorText);
        } else if (prop.max_length && Number(prop.max_length) < Number(prop.min_length)) {
            validation = false;
            errorText = '最大字数必须大于或等于最小字数';
            reject(errorText);
        // 数值字段
        } else if (prop.greater_equal && Number(prop.greater_equal) > Number(prop.less_equal)) {
            validation = false;
            errorText = '最大数值必须大于或等于最小数值';
            reject(errorText);
        } else if (prop.max_choice && Number(prop.max_choice) < Number(prop.min_choice)) {
            validation = false;
            errorText = '最大数值必须大于或等于最小数值';
            reject(errorText);
            // } else if (prop.word_length && (Number(prop.word_length) < Number(prop.min_length) || Number(prop.word_length) > Number(prop.max_length))) {
            //     validation = false;
            //     errorText = '固定字数应该在最小字数和最大字数之间';
            //     reject(errorText);
        } else if (prop.max_file_size && Number(prop.max_file_size) < Number(prop.min_file_size)) {
            validation = false;
            errorText = '文件最大值必须大于或等于文件最小值';
            reject(errorText);
        } else if (prop.max_level && parseInt(prop.max_level, 10) < 0) {
            validation = false;
            errorText = '最大下拉级数必须是正整数';
            reject(errorText);
        } else if (prop.min_level && parseInt(prop.min_level, 10) < 0) {
            validation = false;
            errorText = '最小下拉级数必须是正整数';
            reject(errorText);
            // } else if (prop.max_level > 5) {
            //     validation = false;
            //     errorText = '最大下拉级数不能大于5级';
            //     reject(errorText);
            // } else if (prop.ref_level < prop.min_level) {
            //     validation = false;
            //     errorText = '下拉级数必须大于或等于最小下拉级数';
            //     reject(errorText);
            // } else if (prop.ref_level > prop.max_level) {
            //     validation = false;
            //     errorText = '下拉级数必须小于或等于最大下拉级数';
            //     reject(errorText);
        } else if (prop.max_level && Number(prop.min_level) > Number(prop.max_level)) {
            validation = false;
            errorText = '最大下拉级数必须大于或等于最小下拉级数';
            reject(errorText);
        } else if (Number(prop.min_choice) < 0 || Number(prop.max_choice) < 0 || Number(prop.min_level) < 0 || Number(prop.max_level) < 1 || Number(prop.min_length) < 0 || Number(prop.max_length) < 0 || Number(prop.min_record) < 0 || Number(prop.max_record) < 0) {
            validation = false;
            errorText = '所填数字必须为自然数';
            reject(errorText);
        } else if (isRepeat(prop.target_base)) {
            validation = false;
            errorText = '不能设置两个相同的源数据库';
            reject(errorText);
        } else if (prop.date_format && prop.date_format.length === 0) {
            validation = false;
            errorText = '日期格式：年月日至少选择一项';
            reject(errorText);
        }
        if (validation) {
            resolve(validation);
        } else {
            reject(errorText);
        }
    });
}

export function fieldCheck(obj, modNum) {
    return new Promise(function (resolve, reject) {
        let validation = true;
        let errorText = '';
        let objName = obj.prop.local && obj.prop.local[LANG] ? obj.prop.local[LANG].name : obj.prop.field_type;
        /* 验证是否大于最小长度 */
        if (obj.prop.min_length && obj.values) {
            if (!minLengthVali(obj, obj.prop.min_length)) {
                validation = false;
                errorText = '所填内容长度必须大于' + obj.prop.min_length;
                reject(objName + '：' + errorText);
            }
        }

        /* 验证是否小于最大长度 */
        if (obj.prop.max_length && obj.values && obj.prop.max_length !== 0) {
            if (!maxLengthVali(obj, obj.prop.max_length)) {
                validation = false;
                errorText = '所填内容长度必须小于' + obj.prop.max_length;
                reject(objName + '：' + errorText);
            }
        }

        /* 验证文本固定长度 */
        if (obj.prop.word_length) {
            if (!wordLengthVali(obj, obj.prop.word_length)) {
                validation = false;
                errorText = '所填内容字数必须等于' + obj.prop.word_length;
                reject(objName + '：' + errorText);
            }
        }

        /* 验证是否大于最小填写次数 */
        // if (obj.prop.min_record) {
        //     if (!obj.values || !minRecordVali(obj.values, obj.prop.min_record)) {
        //         validation = false;
        //         errorText = '填写次数必须大于' + obj.prop.min_record;
        //         reject(objName + '：' + errorText);
        //     }
        // }

        /* 验证是否小于最大填写次数 */
        // if (obj.prop.max_record) {
        //     if (obj.prop.field_type !== 'ref_dir') {
        //         if (obj.values) {
        //             if (!maxRecordVali(obj.values, obj.prop.max_record)) {
        //                 validation = false;
        //                 errorText = '填写次数必须小于' + obj.prop.max_record;
        //                 reject(objName + '：' + errorText);
        //             }
        //         }
        //     }
        // }

        /* 验证数字类型和格式是否正确 */
        if (obj.prop.field_type === 'number') {
            if (obj.values) {
                if (!numberVali(obj.values, obj.prop.number_type)) {
                    validation = false;
                    errorText = '数字格式出错';
                    reject(objName + '：' + errorText);
                }
                if (!numTypeVali(obj.values)) {
                    validation = false;
                    errorText = '数字格式出错';
                    reject(objName + '：' + errorText);
                }
                if (modNum && !numSizeVali(obj.values)) {
                    validation = false;
                    errorText = '数字须在-100到100之间';
                    reject(objName + '：' + errorText);
                }
            }
        }

        /* 验证松散日期格式是否正确 */
        if (obj.prop.field_type === 'loose_date') {
            if (obj.prop.date_format.indexOf(1) > -1) {
                if (!monthVali(obj.values[0].value[1].values && obj.values[0].value[1].values[0])) {
                    validation = false;
                    errorText = '月必须在1~12之间';
                    reject(objName + '：' + errorText);
                }
            }
            if (obj.prop.date_format.indexOf(2) > -1) {
                if (!dayVali(obj.values[0].value[2].values && obj.values[0].value[2].values[0])) {
                    validation = false;
                    errorText = '日必须在1~31之间';
                    reject(objName + '：' + errorText);
                }
            }
        }

        // /* 验证文件大小和状态是否正确 */
        // if (obj.type === 'file') {
        //     if (obj.values.length !== 0) {
        //         if (!minFileSizeVali(obj.value, obj.prop.min_file_size)) {
        //             validation = false;
        //             errorText = '文件大小必须大于最小值';
        //         }
        //         if (!maxFileSizeVali(obj.value, obj.prop.max_file_size)) {
        //             validation = false;
        //             errorText = '文件大小必须小于最大值';
        //         }
        //     }
        // }
        /* 验证手机号格式是否正确 */
        if (obj.prop.field_type === 'phone' && obj.values) {
            for (let i = 0; i < obj.values.length; i++) {
                if (obj.values[i].value) {
                    const validateReg = /^((\+?86-)|(\(\+86-\)))?1\d{10}$/;
                    if (!validateReg.test(obj.values[i].value)) {
                        validation = false;
                        errorText = "手机号填写有误";
                        reject(objName + '：' + errorText);
                    }
                }
            }
        }
        /* 验证datetime日期时间是否正确 */
        if (obj.prop.field_type === 'datetime' && obj.values) {
            for (let i = 0; i < obj.values.length; i++) {
                const value = obj.values[i].value || '';
                if (value && value !== '0000-01-01 00:00:00') {
                    // 格式设置
                    // 1:日期和时间
                    // 2:仅日期
                    // 3:仅时间
                    const formatType = obj.prop.format_spec || 1;
                    switch (formatType) {
                        case 1:
                            // 全部校验
                            if (!moment(value, "YYYY-MM-DD HH:mm:ss").isValid()) {
                                validation = false;
                                errorText = "时间戳填写有误";
                                reject(objName + '：' + errorText);
                            }
                            break;
                        case 2:
                            // 只校验日期
                            if (!moment(value.split(' ')[0], "YYYY-MM-DD").isValid()) {
                                validation = false;
                                errorText = "时间戳填写有误";
                                reject(objName + '：' + errorText);
                            }
                            break;
                        case 3:
                            // 只校验时间
                            if (!moment(value.split(' ')[1], "HH:mm:ss").isValid()) {
                                validation = false;
                                errorText = "时间戳填写有误";
                                reject(objName + '：' + errorText);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        if (validation) {
            resolve(obj);
        } else {
            reject(objName + '：' + errorText);
        }
    });
}

// 保存编辑时的整体校验
export function saveFieldCheck(obj, fields, data, form) {
    return new Promise(function (resolve, reject) {
        let validation = true;
        let errorText = '';
        let objName = obj.prop.local && obj.prop.local[LANG] ? obj.prop.local[LANG].name : obj.prop.field_type;
        /* 验证必填项是否填写 */
        if (obj.prop.required) {
            if (!requiredVali(obj, fields, data)) {
                validation = false;
                errorText = '必填字段';
                reject(objName + '：' + errorText);
            }
        }
        /* 验证是否大于最小长度 */
        if (obj.prop.min_length) {
            if (!minLengthSaveVali(obj, obj.prop.min_length, fields, data)) {
                validation = false;
                errorText = '所填内容长度必须大于' + obj.prop.min_length;
                reject(objName + '：' + errorText);
            }
        }

        /* 验证是否小于最大长度 */
        if (obj.prop.max_length) {
            if (!maxLengthSaveVali(obj, obj.prop.max_length, data)) {
                validation = false;
                errorText = '所填内容长度必须小于' + obj.prop.max_length;
                reject(objName + '：' + errorText);
            }
        }

        /* 验证文本固定长度 */
        if (obj.prop.word_length) {
            if (!wordLengthSaveVali(obj, obj.prop.word_length, data)) {
                validation = false;
                errorText = '所填内容字数必须等于' + obj.prop.word_length;
                reject(objName + '：' + errorText);
            }
        }

        /* 验证是否大于最小填写次数 */
        if (obj.prop.min_record) {
            if (obj.path.length > 1) {
                const fatherField = fields[obj.path[obj.path.length - 2].toString()];
                if (fatherField.prop.field_type === 'combo') {
                    if (fatherField.value && !obj.value || !minRecordSaveVali(obj, obj.prop.min_record)) {
                        validation = false;
                        errorText = '填写次数不能小于' + obj.prop.min_record;
                        reject(objName + '：' + errorText);
                    }
                } else if (!obj.value || !minRecordSaveVali(obj, obj.prop.min_record)) {
                    validation = false;
                    errorText = '填写次数不能小于' + obj.prop.min_record;
                    reject(objName + '：' + errorText);
                }
            } else {
                if (!obj.value || !minRecordSaveVali(obj, obj.prop.min_record)) {
                    validation = false;
                    errorText = '填写次数不能小于' + obj.prop.min_record;
                    reject(objName + '：' + errorText);
                }
            }
        }

        /* 验证是否小于最大填写次数 */
        if (obj.prop.max_record) {
            if (obj.value) {
                if (!maxRecordSaveVali(obj, obj.prop.max_record)) {
                    validation = false;
                    errorText = '填写次数必须小于' + obj.prop.max_record;
                    reject(objName + '：' + errorText);
                }
            }
        }

        /* 验证是否小于最大填写级数 */
        if (obj.prop.min_level) {
            if (fields[obj.prop.sub_fid_list[0].toString()].value) {
                if (!minLevelSaveVali(fields[obj.prop.sub_fid_list[0].toString()], obj.prop.min_level)) {
                    validation = false;
                    errorText = '填写级数必须大于' + obj.prop.min_level;
                    reject(objName + '：' + errorText);
                }
            }
        }
        /* 验证是否小于最大填写级数 */
        if (obj.prop.max_level) {
            if (fields[obj.prop.sub_fid_list[0].toString()].value) {
                if (!maxLevelSaveVali(fields[obj.prop.sub_fid_list[0].toString()], obj.prop.max_level)) {
                    validation = false;
                    errorText = '填写级数必须小于' + obj.prop.max_level;
                    reject(objName + '：' + errorText);
                }
            }
        }

        /* 验证数字类型和格式是否正确 */
        if (obj.prop.field_type === 'number') {
            if (obj.value) {
                if (!numberSaveVali(obj.value, obj.prop.number_type, data)) {
                    validation = false;
                    errorText = '数字格式出错';
                    reject(objName + '：' + errorText);
                }
                if (form.id === 'jsonfield_s_attitude') {
                    if (!numberRangeVali(obj.value, obj.prop.number_type, data)) {
                        validation = false;
                        errorText = '数字须在-100到100之间';
                        reject(objName + '：' + errorText);
                    }
                }
            }
        }

        /* 验证松散日期格式是否正确 */
        if (obj.prop.field_type === 'loose_date' && obj.value) {
            if (obj.prop.date_format.indexOf(0) > -1) {
                // if (!fields[obj.prop.sub_fid_list[0].toString()].value) {
                //     validation = false;
                //     errorText = '日期必须填写完整';
                //     reject(objName + '：' + errorText);
                // } else
                if (!yearSaveVali(fields[obj.prop.sub_fid_list[0].toString()], data)) {
                    validation = false;
                    errorText = '年份不能填0';
                    reject(objName + '：' + errorText);
                }
            }
            if (obj.prop.date_format.indexOf(1) > -1) {
                // if (!fields[obj.prop.sub_fid_list[1].toString()].value) {
                //     validation = false;
                //     errorText = '日期必须填写完整';
                //     reject(objName + '：' + errorText);
                // } else
                if (!monthSaveVali(fields[obj.prop.sub_fid_list[1].toString()], data)) {
                    validation = false;
                    errorText = '月必须在1~12之间';
                    reject(objName + '：' + errorText);
                }
            }
            if (obj.prop.date_format.indexOf(2) > -1) {
                // if (!fields[obj.prop.sub_fid_list[2].toString()].value) {
                //     validation = false;
                //     errorText = '日期必须填写完整';
                //     reject(objName + '：' + errorText);
                // } else
                if (!daySaveVali(fields[obj.prop.sub_fid_list[2].toString()], data)) {
                    validation = false;
                    errorText = '日必须在1~31之间';
                    reject(objName + '：' + errorText);
                }
            }
        }
        /* 验证手机号格式是否正确 */
        if (obj.prop.field_type === 'phone' && obj.value) {
            for (let path in obj.value) {
                for (let i = 0; i < obj.value[path].length; i++) {
                    const validateReg = /^((\+?86-)|(\(\+86-\)))?1\d{10}$/;
                    if (!validateReg.test(data[obj.value[path][i].toString()].value)) {
                        validation = false;
                        errorText = "手机号填写有误";
                        reject(objName + '：' + errorText);
                    }
                }
            }
        }
        /* 验证s_choice 暂留吧，其他选项填了，但没选择其他项*/
        // if (obj.prop.field_type === 's_choice' && obj.value) {
        //     const subFid = obj.prop.sub_fid_list[1].toString();
        //     Object.keys(fields).forEach((key) => {
        //         if (key === subFid && !fields[key].value) {
        //             validation = false;
        //             errorText = "必须选择其中一项";
        //             reject(objName + '：' + errorText);
        //         }
        //     })
        // }
        /* 验证最小数值 */
        if (obj.prop.greater_equal && obj.value) {
            for (let path in obj.value) {
                for (let i = 0; i < obj.value[path].length; i++) {
                    if (data[obj.value[path][i].toString()].value < obj.prop.greater_equal) {
                        validation = false;
                        errorText = "填写数值必须大于" + obj.prop.greater_equal;
                        reject(objName + '：' + errorText);
                    }
                }
            }
        }
        /* 验证最大数值 */
        if (obj.prop.less_equal && obj.value) {
            for (let path in obj.value) {
                for (let i = 0; i < obj.value[path].length; i++) {
                    if (data[obj.value[path][i].toString()].value > obj.prop.less_equal) {
                        validation = false;
                        errorText = "填写数值必须小于" + obj.prop.less_equal;
                        reject(objName + '：' + errorText);
                    }
                }
            }
        }
        /* 验证最少选择个数 */
        if (obj.prop.min_choice) {
            if (!obj.value) {
                validation = false;
                errorText = "最少选择" + obj.prop.min_choice + '个';
                reject(objName + '：' + errorText);
            } else {
                for (let path in obj.value) {
                    for (let i = 0; i < obj.value[path].length; i++) {
                        if (data[obj.value[path][i].toString()].value.length < obj.prop.min_choice) {
                            validation = false;
                            errorText = "最少选择" + obj.prop.min_choice + '个';
                            reject(objName + '：' + errorText);
                        }
                    }
                }
            }
        }
        /* 验证最多选择个数 */
        if (obj.prop.max_choice && obj.value) {
            for (let path in obj.value) {
                for (let i = 0; i < obj.value[path].length; i++) {
                    if (data[obj.value[path][i].toString()].value.length > obj.prop.max_choice) {
                        validation = false;
                        errorText = "最多选择" + obj.prop.max_choice + '个';
                        reject(objName + '：' + errorText);
                    }
                }
            }
        }
        /* 验证datetime日期时间是否正确 */
        if (obj.prop.field_type === 'datetime' && obj.value) {
            for (let path in obj.value) {
                for (let i = 0; i < obj.value[path].length; i++) {
                    const datetime = data[obj.value[path][i]].value;
                    if (datetime && datetime !== '0000-01-01 00:00:00') {
                        // 格式设置
                        // 1:日期和时间
                        // 2:仅日期
                        // 3:仅时间
                        const formatType = obj.prop.format_spec || 1;
                        switch (formatType) {
                            case 1:
                                // 全部校验
                                if (!moment(datetime, "YYYY-MM-DD HH:mm:ss").isValid()) {
                                    validation = false;
                                    errorText = "时间戳填写有误";
                                    reject(objName + '：' + errorText);
                                }
                                break;
                            case 2:
                                // 只校验日期
                                if (!moment(datetime.split(' ')[0], "YYYY-MM-DD").isValid()) {
                                    validation = false;
                                    errorText = "时间戳填写有误";
                                    reject(objName + '：' + errorText);
                                }
                                break;
                            case 3:
                                // 只校验时间
                                if (!moment(datetime.split(' ')[1], "HH:mm:ss").isValid()) {
                                    validation = false;
                                    errorText = "时间戳填写有误";
                                    reject(objName + '：' + errorText);
                                }
                                break;
                            default:
                                break;
                        }
                    }

                }
            }
        }
        if (validation) {
            resolve(obj);
        } else {
            reject(objName + '：' + errorText);
        }
    });
}
// 验证手机号、邮箱 by wangchao 2016.11.24
export function checkAccount(account) {
    const phone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    const email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return new Promise(function (resolve, reject) {
        if (account.length > 0 && (phone.test(account) || email.test(account))) {
            resolve(account);
        } else if (account.length === 0) {
            reject('手机/邮箱不能为空');
        } else {
            reject('手机/邮箱格式错误');
        }
    });
}

// ---------验证密码----王超 2016.12。09------

export function checkPwd(pwd) {
    return new Promise(function (resolve, reject) {
        if (pwd.length >= 6 && pwd.length <= 20) {
            resolve(pwd);
        } else if (pwd.length === 0) {
            reject('密码不能为空,请重新输入');
        } else if (pwd.length > 20) {
            reject('密码不能大于20位,请重新输入');
        } else {
            reject('密码不能小于六位,请重新输入');
        }
    });
}
export function checkPwdNotNull(pwd) {
    return new Promise(function (resolve, reject) {
        if (pwd.length > 0) {
            resolve(pwd);
        } else {
            reject('密码不能为空,请重新输入');
        }
    });
}
// export function checkTwoPwd() {
//     if ( this.state.passwd2 !== this.state.passwd ) {
//         showAlert.bind(this)('两次输入密码不一致，请重新输入');
//     } else {
//         this.setState({ vldPwd2: true });
//         return;
//     }
//     this.setState({ vldPwd2: false });
// }
export function checkTwoPwd(pwd, pwd2) {
    return new Promise(function (resolve, reject) {
        if (pwd != pwd2) {
            reject('两次输入密码不一致，请重新输入');
        } else {
            resolve();
        }
    });
}


// ---------验证昵称----赵月 2017.3.13------
export function checkNickName(nickname) {
    return new Promise(function (resolve, reject) {
        if (nickname.length === 0) {
            reject('昵称不能为空');
        } else if (nickname.length > 20) {
            reject('昵称应不大于20个字符');
        } else {
            resolve(nickname);
        }
    });
}
// ---------验证用户名----赵月 2017.3.13------
export function checkUserName(username) {
    const reg = /^[a-zA-Z0-9_]+$/;
    return new Promise(function (resolve, reject) {
        if (username.length === 0) {
            reject('用户名不能为空');
        } else if (username.length > 20) {
            reject('用户名应不大于20个字符');
        } else if (!reg.test(username)) {
            reject('用户名只能是数字、字母、下划线组合');
        } else {
            resolve(username);
        }
    });
}
// ---------验证个人简介----赵月 2017.3.13------
export function checkSynopsis(synopsis) {
    return new Promise(function (resolve, reject) {
        if (synopsis.length > 150) {
            reject('个人简介应不大于150个字符');
        } else {
            resolve(synopsis);
        }
    });
}
// ---------验证充值数目----赵月 2017.3.15------
export function checkAmount(amount) {
    return new Promise(function (resolve, reject) {
        if (amount < 50) {
            reject('金额最低50元');
        } else {
            resolve(amount);
        }
    });
}
// ---------验证手机号----赵月 2017.4.26------
export function checkPhone(phone) {
    const phoneStandard = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return new Promise(function (resolve, reject) {
        if (phone.length > 0 && phoneStandard.test(phone)) {
            resolve(phone);
        } else if (phone.length === 0) {
            reject('手机号不能为空');
        } else {
            reject('手机号格式错误');
        }
    });
}

// ---------验证卡片视图的标题字段----赵月 2017.4.26------
export function checkNameField(name) {
    return new Promise(function (resolve, reject) {
        if (name !== -1) {
            resolve(name);
        } else {
            reject('标题字段不能为空');
        }
    });
}

// -----------验证地理坐标---------zhaoyue  2017.7.19----------
export function checkCoordinate(coordinate) {
    // const coordinateReg = /^[\-\+]?(0?\d{1,2}\.\d*|1[0-7]?\d{1}\.\d*|180\.0*),[\-\+]?([0-8]?\d{1}\.\d*|90\.0*)$/;
    const coordinateReg = /^lat:[\-\+]?([0-8]?\d{1}\.\d*|90\.0*),lon:[\-\+]?(0?\d{1,2}\.\d*|1[0-7]?\d{1}\.\d*|180\.0*)$/;
    return new Promise(function (resolve, reject) {
        if (coordinate.length > 0 && coordinateReg.test(coordinate)) {
            resolve(coordinate);
        } else {
            reject('坐标格式错误');
        }
    });
}

// 验证组合项是否只有筛选引用字段  zhaoyue 2017.8.29
// 验证是否都是隐藏字段
export function valiComboFields(fields) {
    return new Promise(function (resolve, reject) {
        let allHide = true;
        Object.keys(fields).forEach((fid) => {
            const _field = fields[fid];
            if (!_field.prop.invisible) {
                allHide = false;
            }
            if (_field.prop.field_type === 'combo') {
                // 组合项里只有一个子字段
                if (_field.prop.sub_fid_list.length === 1) {
                    const subFid = _field.prop.sub_fid_list[0];
                    if (fields[subFid].prop.field_type === 'link_doc_filter') {
                        reject('子表单不能只包含筛选引用一种子字段');
                    } else {
                        // 保存
                        resolve(fields);
                    }
                } else {
                    // 组合项里有多个子字段
                    let index = 0;
                    _field.prop.sub_fid_list.forEach((_subFid) => {
                        if (fields[_subFid].prop.field_type === 'link_doc_filter') {
                            index++;
                        }
                    });
                    if (index === _field.prop.sub_fid_list.length) {
                        reject('子表单不能只包含筛选引用一种子字段');
                    } else {
                        // 保存
                        resolve(fields);
                    }
                }
            }
        });
        if (allHide) {
            reject('表单不能隐藏所有字段');
        }
        resolve(fields);
    });
}
