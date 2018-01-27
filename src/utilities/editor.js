// @file 编辑器的公用函数
// @author SPC
import { LANG } from 'theme/Lang';
import { ContentState, convertToRaw } from 'draft-js';

// 对生成的富文本字段进行加密，防止注入攻击
function _enCipher(text) {
    let str = '';
    for (let idx = 0; idx < text.length; idx++ ) {
        str += String.fromCharCode(text.charCodeAt(idx) + 128);
    }
    return str;
}
// 判断一个值是否在目标值的后面
export function afterValue(sourcePath, fieldPath, path) {
    for (let idx = 0; idx < fieldPath.length; idx++ ) {
        const fid = fieldPath[idx].toString();
        if (!path[fid]) {
            return false;
        }
        if (path[fid] !== sourcePath[fid] && idx !== fieldPath.length - 1 ) {
            return false;
        }
        if (path[fid] > sourcePath[fid] && idx === fieldPath.length - 1) {
            return true;
        }
    }
    return false;
}

// 判断一个值是否在目标值的下级
export function inValue(sourcePath, fieldPath, path) {
    for (let idx = 0; idx < fieldPath.length; idx++ ) {
        const fid = fieldPath[idx].toString();
        if (!path[fid]) {
            return false;
        }
        if (path[fid] !== sourcePath[fid] && idx !== fieldPath.length - 1 ) {
            return false;
        }
        if (path[fid] === sourcePath[fid] && idx === fieldPath.length - 1) {
            return true;
        }
    }
    return false;
}
// 生成一个字段的默认值
export function getDefaultValue(val, path) {
    const defaultValue = {
        fid: val.fid,
        path: { ... path }
    };
    if (val.type === 'iString') {
        defaultValue.value = {};
        let _lang = LANG;
        if (val.prop.trans_type === 'uni') {
            _lang = 'uni';
        }
        const local = val.prop.local && val.prop.local[_lang] ? val.prop.local[_lang] : {};
        if (val.prop.field_type === 'rich_text') {
            const text = convertToRaw(ContentState.createFromText(''));
            defaultValue.value[_lang] = _enCipher(JSON.stringify(text));
        } else {
            defaultValue.value[_lang] = local.default_value ? local.default_value : '';
        }
    } else if (val.type === 'string') {
        defaultValue.value = val.prop.default_value ? val.prop.default_value : '';
    } else if (val.type === 'list') {
        defaultValue.value = val.prop.default_value ? val.prop.default_value : [];
    } else if (val.type === 'digital') {
        defaultValue.value = (typeof val.prop.default_value === 'number') ? val.prop.default_value : '';
    } else if (val.type === 'boolean') {
        defaultValue.value = val.prop.default_value ? val.prop.default_value : false;
    } else if (val.type === 'datetime') {
        defaultValue.value = val.prop.default_value ? val.prop.default_value : '0000-01-01 00:00:00';
    }
    defaultValue.path[val.fid.toString()] = val.values ? val.values.length + 1 : 1;
    return defaultValue;
}

// 生成一个子表单的默认值
export function getComboDefaultValue(val, path, initial) {
    if (!val.fields) {
        return [];
    }
    const _path = { ... path};
    if (!_path[val.fid.toString()]) {
        if (val.values && val.values.length > 0) {
            _path[val.fid.toString()] = val.values[0].order === 0 ? val.values.length : val.values.length + 1;
        } else {
            _path[val.fid.toString()] = 1;
        }
    }
    const fields = [];
    // ref_doc在不是获取默认值时，只初始化ref_id子字段
    if (val.prop.field_type === 'ref_doc' && !initial) {
        fields.push(getDefaultValue(val.fields[0], _path));
    } else {
        val.fields.forEach((field) => {
            switch (field.type) {
                case 'combo': {
                    getComboDefaultValue(field, _path, initial).forEach(subField => {
                        fields.push(subField);
                    });
                    return;
                }
                default:
                    fields.push(getDefaultValue(field, _path));
            }
        });
    }
    return fields;
}

// 生成一个空Data
export function getEmptyData(formId) {
    const data = {
        'data_prop': {
            'last_vid': 1,
            'lang': [
                LANG
            ],
            'init_lang': LANG,
            'version': '0.0.0',
            'form_id': formId
        },
        'values': {
            '1': {
                'fid': 1,
                'path': {
                    '1': 1
                },
                'vid': 1,
                value: {}
            }
        }
    };
    data.values['1'].value[LANG] = '';
    return data;
}
