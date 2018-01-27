// 格式化Doclist， 宋鹏程 2016/06/26
import assignToEmpty from 'utilities/assign';
import { convertFromRaw } from 'draft-js';
import { LANG } from 'theme/Lang';

// 把Form里的字段整理成树型结构
export function parseFormFields(form) {
    let _formFields = Object.keys(form.fields).map((key) => {
        return JSON.parse(JSON.stringify(form.fields[key]));
    });
    _formFields = _formFields.sort((field1, field2) => {
        if (field1.path.length < field2.path.length) {
            return -1;
        }
        if (field1.path.length > field2.path.length) {
            return 1;
        }
        if (field1.order < field2.order) {
            return -1;
        }
        if (field1.order > field2.order) {
            return 1;
        }
        return 0;
    });
    const formFields = [];
    const fidMap = {};
    _formFields.forEach((field, index) => {
        fidMap[field.fid.toString()] = index;
        if (field.path.length === 1) {
            formFields.push(field);
        } else {
            const _tempField = _formFields[fidMap[field.path[field.path.length - 2].toString()]];
            if (!_tempField.fields) {
                _tempField.fields = [];
            }
            _tempField.fields.push(field);
        }
    });
    return formFields;
}

// 列表视图form字段显示顺序
export function fieldsSort(fields) {
    let _formFields = Object.keys(fields).map((key) => {
        return JSON.parse(JSON.stringify(fields[key]));
    });
    _formFields = _formFields.sort((field1, field2) => {
        const minLength = Math.min(field1.path.length, field2.path.length);
        for (let idx = 0; idx < minLength; idx++) {
            if (fields[field1.path[idx].toString()].order > fields[field2.path[idx].toString()].order) {
                return 1;
            } else if (fields[field1.path[idx].toString()].order < fields[field2.path[idx].toString()].order) {
                return -1;
            }
        }
        if (field1.path.length < field2.path.length) {
            return -1;
        }
        if (field1.path.length > field2.path.length) {
            return 1;
        }
        if (field1.order < field2.order) {
            return -1;
        }
        if (field1.order > field2.order) {
            return 1;
        }
        return 0;
    });
    let subFieldsIds = [];
    _formFields.map((item) => {
        if (item.prop.field_type === 'ref_doc' || item.prop.field_type === 'ref_name' || item.prop.field_type === 'loose_date'
            || item.prop.field_type === 'ref_dir_tree' || item.prop.field_type === 'address' || item.prop.field_type === 's_choice'
            || item.prop.field_type === 'district' || item.prop.field_type === 'ref_obj'
            || item.prop.field_type === 'datetime' || item.prop.field_type === 'user' || item.prop.field_type === 'group') {
            fields[item.fid].subFields = [];
            if (item.prop.sub_fid_list) {
                for (let idx = 0; idx < item.prop.sub_fid_list.length; idx ++) {
                    fields[item.fid.toString()].subFields.push(fields[item.prop.sub_fid_list[idx].toString()]);
                }
                if (item.prop.field_type === 'ref_doc' || item.prop.field_type === 'ref_obj') {
                    subFieldsIds = subFieldsIds.concat(item.prop.sub_fid_list, item.fid);
                } else {
                    subFieldsIds = subFieldsIds.concat(item.prop.sub_fid_list);
                }
            }
        } else if (item.prop.field_type === 'combo') {
            if (item.path.length > 1 && (fields[item.path[item.path.length - 2].toString()].prop.field_type === 'ref_dir_tree'
                || fields[item.path[item.path.length - 2].toString()].prop.field_type === 'district')) {
                fields[item.fid.toString()].subFields = [];
                if (item.prop.sub_fid_list) {
                    for (let idx = 0; idx < item.prop.sub_fid_list.length; idx ++) {
                        fields[item.fid.toString()].subFields.push(fields[item.prop.sub_fid_list[idx].toString()]);
                    }
                    subFieldsIds = subFieldsIds.concat(item.prop.sub_fid_list);
                }
            } else {
                fields[item.fid].subFields = [];
                if (item.prop.sub_fid_list) {
                    for (let idx = 0; idx < item.prop.sub_fid_list.length; idx ++) {
                        const tmpFid = item.prop.sub_fid_list[idx];
                        if (fields[tmpFid.toString()].prop.field_type === 'doc_img') {
                            subFieldsIds = subFieldsIds.concat(tmpFid);
                        }
                        fields[item.fid.toString()].subFields.push(fields[item.prop.sub_fid_list[idx].toString()]);
                    }
                }
                subFieldsIds = subFieldsIds.concat(item.fid);
            }
        } else if (item.prop.field_type === 'rich_text' || item.prop.field_type === 'file' || item.prop.field_type === 'image'
            || item.prop.field_type === 'doc_img') {
            subFieldsIds = subFieldsIds.concat(item.fid);
        }
    });
    for (let idx = _formFields.length - 1; idx >= 0; idx--) {
        if (subFieldsIds.indexOf(_formFields[idx].fid) !== -1) {
            _formFields.splice(idx, 1);
        }
    }
    return _formFields;
}

// 把Form里的字段整理成树型结构
export function parseViewFormFields(form) {
    let _formFields = Object.keys(form.fields).map((key) => {
        return JSON.parse(JSON.stringify(form.fields[key]));
    });
    _formFields = _formFields.sort((field1, field2) => {
        if (field1.path.length < field2.path.length) {
            return -1;
        }
        if (field1.path.length > field2.path.length) {
            return 1;
        }
        if (field1.order < field2.order) {
            return -1;
        }
        if (field1.order > field2.order) {
            return 1;
        }
        return 0;
    });
    const formFields = [];
    const fidMap = {};
    _formFields.forEach((field, index) => {
        fidMap[field.fid.toString()] = index;
        if (field.path.length === 1) {
            formFields.push(field);
        } else {
            const _tempField = _formFields[fidMap[field.path[field.path.length - 2].toString()]];
            if (!_tempField.fields) {
                _tempField.fields = [];
            }
            _tempField.fields.push(field);
        }
    });
    const lastFields = [];
    formFields.forEach((field) => {
        switch (field.prop.field_type) {
            case 'name':
            case 'single_line_text':
            case 'long_text':
            case 'link':
            case 'number':
            case 'phone':
            case 'multiple_select':
            case 'drop_list':
            case 'single_select':
            case 'tag':
            case 'ref_name':
            case 'ref_dir_tree':
            case 'loose_date':
            case 'ref_doc':
            case 'address':
            case 's_choice':
            case 's_attitude':
            case 'district':
                lastFields.push(field);
                break;
            case 'combo':
                field.prop.sub_fid_list.map((subFid) => {
                    if (form.fields[subFid.toString()]) {
                        lastFields.push(form.fields[subFid.toString()]);
                    }
                });
                break;
            default:
                break;
        }
    });
    return lastFields;
}

function findComboIndex(index, values) {
    for (let idx = 1; idx < index + 1; idx++) {
        if (!values[idx]) {
            const tempValue = JSON.parse(JSON.stringify(values[0]));
            tempValue.order = idx;
            values.push(tempValue);
        }
        if (idx === index) {
            return idx;
        }
    }
}
// 把schema里面order为0的全部删除
function removeZero(node) {
    if (node.values && node.values.length > 0) {
        if (node.values[0].order === 0) {
            node.values.shift();
        }
        for (let idx = 0; idx < node.values.length; idx++) {
            removeZero(node.values[idx]);
        }
    }
    if (node.value && node.value instanceof Array) {
        for (let idx = 0; idx < node.value.length; idx++) {
            removeZero(node.value[idx]);
        }
    }
}
// 把Data和Form里的字段整理成树型结构
export function parseDataValues(form, data) {
    let _formFields = Object.keys(form.fields).map((key) => {
        return JSON.parse(JSON.stringify(form.fields[key]));
    });
    _formFields = _formFields.sort((field1, field2) => {
        if (field1.path.length < field2.path.length) {
            return -1;
        }
        if (field1.path.length > field2.path.length) {
            return 1;
        }
        if (field1.order < field2.order) {
            return -1;
        }
        if (field1.order > field2.order) {
            return 1;
        }
        return 0;
    });
    const schema = {
        value: []
    };
    const fidMap = {};
    const fidOrder = {};
    _formFields.forEach((field, index) => {
        fidMap[field.fid.toString()] = index;
        if (field.path.length === 1) {
            fidOrder[field.fid.toString()] = schema.value.push(field) - 1;
        } else {
            const _tempValue = _formFields[fidMap[field.path[field.path.length - 2].toString()]];
            if (!_tempValue.fields) {
                _tempValue.fields = [];
            }
            _tempValue.fields.push(field);
            if (!_tempValue.values) {
                _tempValue.values = [{
                    'order': 0,
                    'value': []
                }];
            }
            fidOrder[field.fid.toString()] = _tempValue.values[0].value.push(field) - 1;
        }
    });
    let _dataValues = Object.keys(data.values).map((key) => {
        return data.values[key];
    }).filter((value) => {
        return typeof fidMap[value.fid.toString()] === 'number';
    });
    _dataValues = _dataValues.sort((value1, value2) => {
        if (fidMap[value1.fid.toString()] < fidMap[value2.fid.toString()]) {
            return -1;
        }
        if (fidMap[value1.fid.toString()] > fidMap[value2.fid.toString()]) {
            return 1;
        }
        if (value1.path[value1.fid.toString()] < value2.path[value2.fid.toString()]) {
            return -1;
        }
        if (value1.path[value1.fid.toString()] > value2.path[value2.fid.toString()]) {
            return 1;
        }
        return 0;
    });
    _dataValues.forEach((value) => {
        const _path = [... form.fields[value.fid.toString()].path];
        let _tempValue = schema;
        while (_path.length > 1) {
            const _fid = _path.shift();
            const _index = fidOrder[_fid.toString()];
            if (_index > -1) {
                _tempValue = _tempValue.value[_index];
                const _index2 = findComboIndex((value.path[_fid.toString()] ? value.path[_fid.toString()] : 1), _tempValue.values);
                _tempValue = _tempValue.values[_index2];
            }
        }
        _tempValue = _tempValue.value[fidOrder[_path.shift()]];
        if (!_tempValue.values) {
            _tempValue.values = [];
        }
        _tempValue.values.push(value);
    });
    removeZero(schema);
    return schema;
}

// ---------格式化库，目录，集，组织详情
export function formatBDSODetail(detail) {
    const _detail = assignToEmpty({}, detail.prop);
    const fidMap = {
        1: 'name',
        2: 'photo',
        3: 'tag',
        4: 'introduction'
    };
    const schema = parseDataValues(detail.form, detail.data);
    schema.value.forEach(item => {
        if (fidMap[item.fid.toString()]) {
            _detail[fidMap[item.fid.toString()]] = item.values;
        }
    });
    return _detail;
}

// 格式化视图
// export function parseView(data) {
//     for (const pos in data.positions) {
//         if (data.positions.hasOwnProperty(pos)) {
//             const tempV = [];
//             for (let idx = 0; idx < data.positions[pos].value.length; idx++) {
//                 tempV.push({'value': data.positions[pos].value[idx].value.value});
//             }
//             data.positions[pos].value = tempV;
//         }
//     }
//     return data;
// }

export function parseFormToRefFields(fields, selectedFids) {
    let _formFields = Object.keys(fields).map((key) => {
        return JSON.parse(JSON.stringify(fields[key]));
    });
    _formFields = _formFields.sort((field1, field2) => {
        const minLength = Math.min(field1.path.length, field2.path.length);
        for (let idx = 0; idx < minLength; idx++) {
            if (fields[field1.path[idx].toString()].order > fields[field2.path[idx].toString()].order) {
                return 1;
            } else if (fields[field1.path[idx].toString()].order < fields[field2.path[idx].toString()].order) {
                return -1;
            }
        }
        if (field1.path.length < field2.path.length) {
            return -1;
        }
        if (field1.path.length > field2.path.length) {
            return 1;
        }
        if (field1.order < field2.order) {
            return -1;
        }
        if (field1.order > field2.order) {
            return 1;
        }
        return 0;
    });
    let subFieldsIds = [];
    const fieldList = [];
    const refDocIds = [];
    _formFields.map((item) => {
        if (item.path.length === 1) {
            const tmpField = {
                'fid': item.fid,
                'name': item.prop.local[LANG].name,
                'indent': 10,
                'path': [...item.path],
                'selected': false
            };
            if (item.prop.field_type === 'ref_doc' || item.prop.field_type === 'link_doc_filter' || item.prop.field_type === 'ref_obj') {
                refDocIds.push(item.fid);
                tmpField.noSelect = true;
            } else if (item.prop.field_type === 'combo') {
                tmpField.noSelect = true;
            }
            fieldList.push(tmpField);
        } else {
            const tmpField = {
                'fid': item.fid,
                'name': item.prop.local && item.prop.local[LANG] && item.prop.local[LANG].name ? item.prop.local[LANG].name : '',
                'indent': 10 + 14 * item.path.length,
                'path': [...item.path],
                'selected': false
            };
            if (item.prop.field_type === 'ref_doc' || item.prop.field_type === 'link_doc_filter' || item.prop.field_type === 'ref_obj') {
                refDocIds.push(item.fid);
                tmpField.noSelect = true;
            } else if (item.prop.field_type === 'combo') {
                tmpField.noSelect = true;
            }
            fieldList.push(tmpField);
            // path中包含ref_doc ID的就是ref_doc的下级
            item.path.map((pathFid) => {
                if (refDocIds.indexOf(pathFid) !== -1) {
                    subFieldsIds.push(item.fid);
                }
            });
        }
        if (item.prop.field_type === 'ref_doc' || item.prop.field_type === 'ref_dir_tree'
            || item.prop.field_type === 'loose_date' || item.prop.field_type === 'address'
            || item.prop.field_type === 'district' || item.prop.field_type === 's_choice'
            || item.prop.field_type === 'ref_name' || item.prop.field_type === 'user' || item.prop.field_type === 'group') {
            if (item.prop.sub_fid_list) {
                subFieldsIds = subFieldsIds.concat(item.prop.sub_fid_list);
            }
        } else if (item.prop.field_type === 'combo') {
            if (item.path.length > 1 && (fields[item.path[item.path.length - 2].toString()].prop.field_type === 'ref_dir_tree' || fields[item.path[item.path.length - 2].toString()].prop.field_type === 'district')) {
                if (item.prop.sub_fid_list) {
                    subFieldsIds = subFieldsIds.concat(item.prop.sub_fid_list);
                }
            }
        }
    });
    for (let idx = fieldList.length - 1; idx >= 0; idx--) {
        if (selectedFids.indexOf(fieldList[idx].fid) !== -1) {
            fieldList[idx].selected = true;
        }
        if (subFieldsIds.indexOf(fieldList[idx].fid) !== -1) {
            fieldList.splice(idx, 1);
        }
    }
    return fieldList;
}

export function parseDataToNewForm(form, data) {
    // 修改表单后编辑条目时对齐字段path与值
    const tmpValues = data.values;
    const tmpFields = form.fields;
    const newData = {
        'data_prop': data.data_prop,
        'id': data.id,
        'values': {}
    };
    const pathArr = [];
    Object.keys(tmpValues).forEach((vid) => {
        // 判断value对应的字段是否还存在
        if (tmpFields[tmpValues[vid].fid.toString()] && tmpValues[vid].path[tmpValues[vid].fid.toString()]) {
            // 更新字段移动后的字段值的path
            const tmpPath = {};
            // 记录移动的字段的fid
            let moveFieldFid = 0;
            // 生成新的form对应的data替换旧的data
            newData.values[vid] = tmpValues[vid];
            tmpFields[tmpValues[vid].fid.toString()].path.forEach((fid) => {
                if (tmpValues[vid].path[fid]) {
                    if (!moveFieldFid) {
                        moveFieldFid = fid;
                    }
                    tmpPath[fid] = Number(tmpValues[vid].path[fid]);
                } else {
                    tmpPath[fid] = 1;
                }
            });
            // 字段移出组合项会导致有多个相同的path
            if (pathArr.indexOf(JSON.stringify(tmpPath)) === -1) {
                newData.values[vid].path = tmpPath;
                pathArr.push(JSON.stringify(tmpPath));
            } else {
                // value值属于复合字段（ref_name、ref_doc、combo、ref_dir_tree、district、address、loose_date、s_choice）
                if (tmpFields[moveFieldFid.toString()].type === 'combo') {
                    // 不可拓展字段
                    if (tmpFields[moveFieldFid.toString()].prop.field_type === 'loose_date' || tmpFields[moveFieldFid.toString()].prop.field_type === 'district'
                    || tmpFields[moveFieldFid.toString()].prop.field_type === 'address' || tmpFields[moveFieldFid.toString()].prop.field_type === 's_choice'
                    || tmpFields[moveFieldFid.toString()].prop.field_type === 'ref_dir_tree') {
                        delete newData.values[vid];
                    } else if (tmpFields[moveFieldFid.toString()].prop.field_type === 'ref_name' || tmpFields[moveFieldFid.toString()].prop.field_type === 'ref_doc' || tmpFields[moveFieldFid.toString()].prop.field_type === 'combo') {
                        // 可拓展字段
                        while (pathArr.indexOf(JSON.stringify(tmpPath)) !== -1) {
                            tmpPath[moveFieldFid] += 1;
                        }
                        pathArr.push(JSON.stringify(tmpPath));
                        newData.values[vid].path = tmpPath;
                    }
                } else {
                    while (pathArr.indexOf(JSON.stringify(tmpPath)) !== -1) {
                        tmpPath[moveFieldFid] += 1;
                    }
                    pathArr.push(JSON.stringify(tmpPath));
                    newData.values[vid].path = tmpPath;
                }
            }
        }
    });
    return newData;
}

function _deCipher(text) {
    let str = '';
    for (let idx = 0; idx < text.length; idx++ ) {
        str += String.fromCharCode(text.charCodeAt(idx) - 128);
    }
    return str;
}

// 判断组合项的下级是否发生变化
export function compareCombo(combo) {
    return combo.values && combo.values.some((item) => {
        return item.value && item.value.some((item1) => {
            if (item1.type === 'combo') {
                compareCombo(item1);
            } else {
                return item1.values && item1.values.some((item2) => {
                    return item2.version_diff;
                });
            }
        });
    });
}
// 判断组合项是够可以应用
export function applyCombo(combo) {
    return combo.values && combo.values.some((item) => {
        return item.value && item.value.some((item1) => {
            if (item1.type === 'combo') {
                applyCombo(item1);
            } else {
                return item1.values && item1.values.some((item2) => {
                    return item2.allow_apply;
                });
            }
        });
    });
}

export function compareHistoryVersion(docleft, docright) {
    const doc1 = JSON.parse(JSON.stringify(docleft));
    const doc2 = JSON.parse(JSON.stringify(docright));
    const doc1VidList = Object.keys(doc1.data.values).map((vid) => vid);
    const doc2VidList = Object.keys(doc2.data.values).map((vid) => vid);
    const docFidList = Object.keys(doc1.form.fields).filter((fid) => doc2.form.fields[fid] && doc1.form.fields[fid].path.join('') === doc2.form.fields[fid].path.join(''));
    const levelOneList1 = Object.keys(doc1.form.fields).filter((fid) => doc1.form.fields[fid].path.length === 1 && doc2.form.fields[fid] && doc2.form.fields[fid].path.length === 1)
        .sort((fid1, fid2) => {
            if (doc1.form.fields[fid1].order > doc1.form.fields[fid2].order) {
                return 1;
            } else if (doc1.form.fields[fid1].order < doc1.form.fields[fid2].order) {
                return -1;
            }
            return 0;
        });
    const levelOneList2 = Object.keys(doc1.form.fields).filter((fid) => doc1.form.fields[fid].path.length === 1 && doc2.form.fields[fid] && doc2.form.fields[fid].path.length === 1)
        .sort((fid1, fid2) => {
            if (doc2.form.fields[fid1].order > doc2.form.fields[fid2].order) {
                return 1;
            } else if (doc2.form.fields[fid1].order < doc2.form.fields[fid2].order) {
                return -1;
            }
            return 0;
        });
    // 比较两个版本中vid相同的字段
    function compareSameVid(value1, value2) {
        let diffStatus = false;
        if (JSON.stringify(value1.path) !== JSON.stringify(value2.path)) {
            diffStatus = true;
        } else {
            switch (doc1.form.fields[value1.fid.toString()].type) {
                case 'string':
                case 'digital':
                case 'boolean':
                    if (value1.value !== value2.value) {
                        diffStatus = true;
                    }
                    break;
                case 'date':
                    // if (value1.value && value2.value) {
                    //     diffStatus = true;
                    // }
                    break;
                case 'list':
                    if (JSON.stringify(value1.value) !== JSON.stringify(value2.value)) {
                        diffStatus = true;
                    }
                    break;
                case 'iString':
                    let _lang = LANG;
                    if (doc1.form.fields[value1.fid.toString()].prop.trans_type === 'uni') {
                        _lang = 'uni';
                    }
                    if (doc1.form.fields[value1.fid.toString()].prop.field_type === 'rich_text') {
                        if (convertFromRaw(JSON.parse(_deCipher(value1.value[_lang]))).getPlainText('\n') !== convertFromRaw(JSON.parse(_deCipher(value2.value[_lang]))).getPlainText('\n')) {
                            diffStatus = true;
                        }
                    } else {
                        if (typeof(value1.value[_lang]) === 'object' && typeof(value2.value[_lang]) === 'object' && value1.value[_lang] !== value2.value[_lang]) {
                            diffStatus = true;
                        } else if (JSON.stringify(value1.value) !== JSON.stringify(value2.value)) {
                            diffStatus = true;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return diffStatus;
    }
    docFidList.forEach((fid) => {
        // 名字改变对比
        if (doc1.form.fields[fid].prop.local && doc1.form.fields[fid].prop.local[LANG] && doc1.form.fields[fid].prop.local[LANG].name !== doc2.form.fields[fid].prop.local[LANG].name) {
            doc1.form.fields[fid].prop.order_diff = true;
            doc2.form.fields[fid].prop.order_diff = true;
        }
        // 字段在第一层，除去新增字段后的相对位置不同则移动了顺序
        if (doc1.form.fields[fid].path.length === 1) {
            if (levelOneList1.indexOf(fid) !== levelOneList2.indexOf(fid)) {
                doc1.form.fields[fid].prop.order_diff = true;
                doc2.form.fields[fid].prop.order_diff = true;
            }
        } else {
            if (doc1.form.fields[doc1.form.fields[fid].path[doc1.form.fields[fid].path.length - 2].toString()].prop.sub_fid_list && doc2.form.fields[doc2.form.fields[fid].path[doc2.form.fields[fid].path.length - 2].toString()].prop.sub_fid_list) {
                const subFidList1 = doc1.form.fields[doc1.form.fields[fid].path[doc1.form.fields[fid].path.length - 2].toString()].prop.sub_fid_list.filter((subFid1) => {
                    return doc2.form.fields[doc2.form.fields[fid].path[doc2.form.fields[fid].path.length - 2].toString()].prop.sub_fid_list.indexOf(subFid1) !== -1;
                }).sort((fid1, fid2) => {
                    if (doc1.form.fields[fid1].order > doc1.form.fields[fid2].order) {
                        return 1;
                    } else if (doc1.form.fields[fid1].order < doc1.form.fields[fid2].order) {
                        return -1;
                    }
                    return 0;
                });
                const subFidList2 = doc2.form.fields[doc2.form.fields[fid].path[doc2.form.fields[fid].path.length - 2].toString()].prop.sub_fid_list.filter((subFid2) => {
                    return doc1.form.fields[doc1.form.fields[fid].path[doc1.form.fields[fid].path.length - 2].toString()].prop.sub_fid_list.indexOf(subFid2) !== -1;
                }).sort((fid1, fid2) => {
                    if (doc2.form.fields[fid1].order > doc2.form.fields[fid2].order) {
                        return 1;
                    } else if (doc2.form.fields[fid1].order < doc2.form.fields[fid2].order) {
                        return -1;
                    }
                    return 0;
                });
                if (subFidList1.indexOf(Number(fid)) !== subFidList2.indexOf(Number(fid))) {
                    doc1.form.fields[fid].prop.order_diff = true;
                    doc2.form.fields[fid].prop.order_diff = true;
                }
            }
        }
    });
    doc1VidList.forEach((vid) => {
        // 两个版本同时存在的vid
        if (doc2VidList.indexOf(vid) !== -1) {
            // 字段在两个版本都存在
            if (doc1.form.fields[doc1.data.values[vid].fid.toString()] && doc2.form.fields[doc2.data.values[vid].fid.toString()]) {
                // 比较在两个版本中vid相同的字段值和path
                if (compareSameVid(doc1.data.values[vid], doc2.data.values[vid])) {
                    // 标红doc1、doc2中vid对应的字段值
                    doc1.data.values[vid].version_diff = true;
                    doc2.data.values[vid].version_diff = true;
                    // 标红doc1、doc2中vid对应path的字段名
                    Object.keys(doc1.data.values[vid].path).forEach((fid) => {
                        if (doc1.form.fields[fid].prop) {
                            doc1.form.fields[fid].prop.version_diff = true;
                        } else {
                            doc1.form.fields[fid].prop = {
                                version_diff: true
                            };
                        }
                        if (doc2.form.fields[fid].prop) {
                            doc2.form.fields[fid].prop.version_diff = true;
                        } else {
                            doc2.form.fields[fid].prop = {
                                version_diff: true
                            };
                        }
                    });
                }
            } else if (doc1.form.fields[doc1.data.values[vid].fid.toString()] && !doc2.form.fields[doc2.data.values[vid].fid.toString()]) {
                // 字段存在doc1中,不存在doc2
                doc1.data.values[vid].version_diff = true;
                Object.keys(doc1.data.values[vid].path).forEach((fid) => {
                    if (doc1.form.fields[fid].prop) {
                        doc1.form.fields[fid].prop.version_diff = true;
                    } else {
                        doc1.form.fields[fid].prop = {
                            version_diff: true
                        };
                    }
                });
            }
        } else {
            if (doc1.form.fields[doc1.data.values[vid].fid.toString()]) {
                // 标红doc1中vid对应的字段
                doc1.data.values[vid].version_diff = true;
                Object.keys(doc1.data.values[vid].path).forEach((fid) => {
                    if (doc1.form.fields[fid].prop) {
                        doc1.form.fields[fid].prop.version_diff = true;
                    } else {
                        doc1.form.fields[fid].prop = {
                            version_diff: true
                        };
                    }
                });
            }
        }
    });
    doc2VidList.forEach((vid) => {
        // 两个版本同时存在的vid
        if (doc1VidList.indexOf(vid) === -1 && doc2.form.fields[doc2.data.values[vid].fid.toString()]) {
            // 标红doc2中vid对应的字段
            doc2.data.values[vid].version_diff = true;
            Object.keys(doc2.data.values[vid].path).forEach((fid) => {
                if (doc2.form.fields[fid].prop) {
                    doc2.form.fields[fid].prop.version_diff = true;
                } else {
                    doc2.form.fields[fid].prop = {
                        version_diff: true
                    };
                }
            });
        }
    });
    return {
        leftDoc: doc1,
        rightDoc: doc2
    };
}

export function compareReviewDoc(docleft, docright) {
    const doc1 = JSON.parse(JSON.stringify(docleft));
    const doc2 = JSON.parse(JSON.stringify(docright));
    const doc1ValueMap = {};
    // docValueMap的结构示意
    // docValueMap = {
    //     fid1: {
    //         path1：value1
    //         path2: value2
    //     },
    //     fid2: {
    //         path3：value3
    //         path4: value4
    //     }
    // }
    // 记录所有ref_doc字段和它的子字段的fid
    let refDocLinkId = [];
    Object.keys(docleft.form.fields).forEach((fid) => {
        docleft.form.fields[fid].path.forEach((fid2, index) => {
            if (docleft.form.fields[fid2.toString()].prop.field_type === 'ref_doc') {
                refDocLinkId = refDocLinkId.concat(docleft.form.fields[fid].path.slice(index + 1));
            }
        });
    });
    Object.keys(doc1.data.values).forEach((vid) => {
        if (!doc1ValueMap[doc1.data.values[vid].fid]) {
            doc1ValueMap[doc1.data.values[vid].fid] = {};
        }
        const _path = JSON.stringify(doc1.data.values[vid].path);
        doc1ValueMap[doc1.data.values[vid].fid][_path] = doc1.data.values[vid];
    });
    const doc2ValueMap = {};
    Object.keys(doc2.data.values).forEach((vid) => {
        if (!doc2ValueMap[doc2.data.values[vid].fid]) {
            doc2ValueMap[doc2.data.values[vid].fid] = {};
        }
        const _path = JSON.stringify(doc2.data.values[vid].path);
        doc2ValueMap[doc2.data.values[vid].fid][_path] = doc2.data.values[vid];
    });
    function compareSamePath(value1, value2) {
        let diffStatus = false;
        switch (doc1.form.fields[value1.fid.toString()].type) {
            case 'string':
            case 'digital':
            case 'boolean':
            case 'datetime':
                if (value1.value !== value2.value) {
                    diffStatus = true;
                }
                break;
            case 'date':
                // if (value1.value && value2.value) {
                //     diffStatus = true;
                // }
                break;
            case 'list':
                if (JSON.stringify(value1.value) !== JSON.stringify(value2.value)) {
                    diffStatus = true;
                }
                break;
            case 'iString':
                let _lang = LANG;
                if (doc1.form.fields[value1.fid.toString()].prop.trans_type === 'uni') {
                    _lang = 'uni';
                }
                if (doc1.form.fields[value1.fid.toString()].prop.field_type === 'rich_text') {
                    if (convertFromRaw(JSON.parse(_deCipher(value1.value[_lang]))).getPlainText('\n') !== convertFromRaw(JSON.parse(_deCipher(value2.value[_lang]))).getPlainText('\n')) {
                        diffStatus = true;
                    }
                } else {
                    if (typeof(value1.value[_lang]) === 'object' && typeof(value2.value[_lang]) === 'object' && value1.value[_lang] !== value2.value[_lang]) {
                        diffStatus = true;
                    } else if (JSON.stringify(value1.value) !== JSON.stringify(value2.value)) {
                        diffStatus = true;
                    }
                }
                break;
            default:
                break;
        }
        return diffStatus;
    }
    Object.keys(doc1ValueMap).forEach((fid) => {
        // 两个版本同时存在的fid
        if (doc2ValueMap[fid]) {
            Object.keys(doc1ValueMap[fid]).forEach((path) => {
                if (doc2ValueMap[fid][path]) {
                    // doc2中存在与doc1位置一模一样的value
                    if (compareSamePath(doc1ValueMap[fid][path], doc2ValueMap[fid][path])) {
                        doc1ValueMap[fid][path].version_diff = true;
                        doc1.form.fields[fid].path.forEach((fid1) => {
                            if (doc1.form.fields[fid1.toString()].prop) {
                                doc1.form.fields[fid1.toString()].prop.version_diff = true;
                            } else {
                                doc1.form.fields[fid1.toString()].prop = { version_diff: true };
                            }
                        });
                    }
                    // 非ref_doc子字段可以应用修改到右侧
                    if (refDocLinkId.indexOf(Number(fid)) === -1) {
                        doc1ValueMap[fid][path].allow_apply = true;
                    } else {
                        doc1.form.fields[fid].path.forEach((fid2) => {
                            if (doc1.form.fields[fid2.toString()].prop.field_type === 'ref_doc') {
                                doc1.form.fields[fid2.toString()].prop.allow_apply = true;
                            }
                        });
                    }
                } else {
                    // doc2在这个path不存在value，不可以应用
                    doc1ValueMap[fid][path].version_diff = true;
                    doc1.form.fields[fid].path.forEach((fid1) => {
                        if (doc1.form.fields[fid1.toString()].prop) {
                            doc1.form.fields[fid1.toString()].prop.version_diff = true;
                        } else {
                            doc1.form.fields[fid1.toString()].prop = { version_diff: true };
                        }
                    });
                }
            });
        } else {
            if (doc1.form.fields[fid]) {
                // 标红doc1中对应的字段
                Object.keys(doc1ValueMap[fid]).forEach((path) => {
                    doc1ValueMap[fid][path].version_diff = true;
                    // 非ref_doc子字段可以应用修改到右侧
                    if (refDocLinkId.indexOf(Number(fid)) === -1) {
                        doc1ValueMap[fid][path].allow_apply = Object.keys(JSON.parse(path)).every((_fid) => {
                            return JSON.parse(path)[_fid] === 1;
                        });
                    } else {
                        doc1.form.fields[fid].path.forEach((fid2) => {
                            if (doc1.form.fields[fid2.toString()].prop.field_type === 'ref_doc') {
                                doc1.form.fields[fid2.toString()].prop.order_diff = true;
                            }
                        });
                    }
                });
                doc1.form.fields[fid].path.forEach((fid1) => {
                    doc1.form.fields[fid1.toString()].prop.version_diff = true;
                });
            }
        }
    });
    Object.keys(doc2ValueMap).forEach((fid) => {
        // 两个版本同时存在的fid
        if (doc1ValueMap[fid]) {
            Object.keys(doc2ValueMap[fid]).forEach((path) => {
                // doc2中的拓展项，在doc1中不存在
                if (!doc1ValueMap[fid][path]) {
                    // 标红字段名字
                    doc1.form.fields[fid].path.forEach((fid1, index) => {
                        const _pathObj = JSON.parse(path);
                        const _pathArr = doc1.form.fields[fid].path.slice(index);
                        _pathArr.forEach((fid2) => {
                            _pathObj[fid2] = 1;
                        });
                        if (doc1ValueMap[fid][JSON.stringify(_pathObj)]) {
                            if (refDocLinkId.indexOf(Number(fid1)) === -1) {
                                doc1.form.fields[fid1.toString()].prop.order_diff = true;
                            } else {
                                doc1.form.fields[fid1.toString()].path.forEach((fid2) => {
                                    if (doc1.form.fields[fid2.toString()].prop.field_type === 'ref_doc') {
                                        doc1.form.fields[fid2.toString()].prop.order_diff = true;
                                    }
                                });
                            }
                        }
                    });
                }
            });
        } else {
            if (doc1.form.fields[fid]) {
                doc1.form.fields[fid].path.forEach((fid1) => {
                    if (refDocLinkId.indexOf(Number(fid1)) === -1) {
                        doc1.form.fields[fid1.toString()].prop.order_diff = true;
                    } else {
                        doc1.form.fields[fid1].path.forEach((fid2) => {
                            if (doc1.form.fields[fid2.toString()].prop.field_type === 'ref_doc') {
                                doc1.form.fields[fid2.toString()].prop.order_diff = true;
                            }
                        });
                    }
                });
            }
        }
    });
    return doc1;
}
// 转换筛选条件  zhaoyue
// export function parseFilterCondition(conditionGenerator, schema, docId) {
//     const reg = /^\{[\s\S]*\}$/;
//     const filterCondition = JSON.parse(conditionGenerator);
//     filterCondition.qrOfFields.forEach((field) => {
//         field.qrOfField.forEach((_field) => {
//             const _qrValue = _field.qrValue;
//             if (reg.test(_qrValue)) {
//                 const fid = _qrValue.split('{')[1].split('}')[0];
//                 if (fid === 'SELF_ID') {
//                     _field.qrValue = docId;
//                 } else {
//                     const _fid = Number(fid);
//                     const refField = schema.value.filter((item) => {
//                         return item.fid === _fid;
//                     });
//                     if (refField[0].values) {
//                         if (refField[0].type === 'iString') {
//                             _field.qrValue = refField[0].values[0].value[LANG];
//                         }
//                         if (refField[0].type === 'digital') {
//                             _field.qrValue = refField[0].values[0].value;
//                         }
//                     }
//                 }
//             }
//         });
//     });
//     return filterCondition;
// }
function getTargetValue(idx, refPath, targetFld, zuFld, _fid) {
    if (idx === refPath - 1) {
        if (zuFld.values.length > 0) {
            const targetValue = zuFld.values[0].value.filter((subValue1) => {
                return subValue1.fid === _fid;
            });  // 在父级字段的value中找到被引用字段的value
            return targetValue;
        }
        return [];
    }
    if (zuFld.values.length > 0) {
        const fuFid = targetFld.path[idx];
        const fuFld = zuFld.values[0].value.filter((subValue) => {
            return subValue.fid === fuFid;
        })[0];
        return getTargetValue(idx + 1, refPath, targetFld, fuFld, _fid);
    }
    return [];
}
function getTargetValue1(idx, refPath, targetFld, zuFld, _fid, expend, val) {
    if (idx === refPath - 1) {
        if (zuFld.values.length > 0) {
            const targetValue = zuFld.values[expend - 1].value.filter((subValue1) => {
                return subValue1.fid === _fid;
            });  // 在父级字段的value中找到被引用字段的value
            return targetValue;
        }
        return [];
    }
    if (zuFld.values.length > 0) {
        const fuFid = targetFld.path[idx];
        const _expend = val.values[0].path[fuFid];
        const fuFld = zuFld.values[0].value.filter((subValue) => {
            return subValue.fid === fuFid;
        })[0];
        return getTargetValue1(idx + 1, refPath, targetFld, fuFld, _fid, _expend, val);
    }
    return [];
}
function checkPath(path1, path2) {
    for (let idx = 0; idx < path1.length - 1; idx ++) {
        if (path1[idx] !== path2[idx]) {
            return false;
        }
    }
    return true;
}
// 判断两字段path是否相同
function valiPath(path1, path2) {
    if (path1.length !== path2.length) {
        return false;
    }
    const flag = checkPath(path1, path2);
    return flag;
}
// 转换筛选条件  zhaoyue
export function parseFilterCondition(conditionGenerator, form, schema, val, docId) {
    const reg = /^\{[\s\S]*\}$/;
    const filterCondition = JSON.parse(conditionGenerator);
    const formFields = JSON.parse(JSON.stringify(form.fields));
    const linkPath = val.path.length;
    filterCondition.qrOfFields.forEach((field) => {
        field.qrOfField.forEach((_field) => {
            const _qrValue = _field.qrValue;
            if (reg.test(_qrValue)) {
                const fid = _qrValue.split('{')[1].split('}')[0];
                // 名称引用，引用自身Id
                if (fid === 'SELF_ID') {
                    _field.qrValue = docId;
                } else {
                    const _fid = Number(fid);
                    const targetFld = Object.values(formFields).filter((item1) => {
                        return item1.fid === _fid;
                    })[0];   // form 中找到被引用的字段
                    const refPath = targetFld.path.length;  // 获取被引用字段的path长度
                    const refField = schema.value.filter((item) => {
                        return item.fid === _fid;
                    });
                    // 在schema中可以找到，说明字段path为1
                    if (refField.length > 0 && refField[0].values) {
                        if (refField[0].type === 'iString') {
                            _field.qrValue = refField[0].values[0].value[LANG];
                        }
                        if (refField[0].type === 'digital') {
                            _field.qrValue = refField[0].values[0].value;
                        }
                    } else {
                        if (linkPath === 1) {
                            const zuFid = targetFld.path[0];
                            const zuFld = schema.value.filter((value) => {
                                return value.fid === zuFid;
                            })[0];
                            const targetValue = getTargetValue(1, refPath, targetFld, zuFld, _fid);
                            if (targetValue.length > 0 && targetValue[0].values) {
                                if (targetValue[0].type === 'iString') {
                                    _field.qrValue = targetValue[0].values[0].value[LANG];
                                }
                                if (targetValue[0].type === 'digital') {
                                    _field.qrValue = targetValue[0].values[0].value;
                                }
                            }
                        } else {
                            const zuFid = val.path[0];  // 筛选引用的父级字段
                            const zuFidRef = targetFld.path[0]; // 被引用字段的父级字段
                            const zuFld = schema.value.filter((value) => {
                                return value.fid === zuFidRef;
                            })[0];
                            const zuExpend = val.values[0].path[zuFid.toString()];  // 标识是组合项的第几次拓展
                            let targetValue = [];
                            // 在不同组合项
                            if (zuFid !== zuFidRef) {
                                targetValue = zuFld.values[0].value.filter((subValue1) => {
                                    return subValue1.fid === _fid;
                                });
                            } else {
                                // 两字段path相同
                                if (valiPath(val.path, targetFld.path)) {
                                    targetValue = getTargetValue1(1, refPath, targetFld, zuFld, _fid, zuExpend, val);
                                } else {
                                    targetValue = getTargetValue(1, refPath, targetFld, zuFld, _fid);
                                }
                            }
                            if (targetValue.length > 0 && targetValue[0].values) {
                                if (targetValue[0].type === 'iString') {
                                    _field.qrValue = targetValue[0].values[0].value[LANG];
                                }
                                if (targetValue[0].type === 'digital') {
                                    _field.qrValue = targetValue[0].values[0].value;
                                }
                            }
                        } // 筛选引用字段的path>1
                    } // 被应用字段的path>1
                } // 筛选引用字段的条件
            }
        });
    });
    return filterCondition;
}
