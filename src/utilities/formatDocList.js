// 对表格不同字段进行处理,郝兆行,2016.10.21
// 添加富文本字段支持 宋鹏程, 2016.12.29
/* eslint-disable */
import { convertFromRaw } from 'draft-js';
import { LANG } from 'theme/Lang';
import moment from 'moment';
// import { preciseConvert } from './preciseService';
// import { parseDataValues } from 'utilities/parseService';
// 这个方法会被打包到富文本字段里
function _deCipher(text) {
    let str = '';
    for (let index = 0; index < text.length; index++ ) {
        str += String.fromCharCode(text.charCodeAt(index) - 128);
    }
    return str;
}

function formatValue( value, fields, tempDoc, loose_date_order ) {
    if (fields[value.fid.toString()]) {
        let key = '';
        let tempValue = '';
        if (fields[value.fid.toString()].path.length > 1 && (fields[fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 2].toString()].prop.field_type !== 'combo' || fields[value.fid.toString()].path.length > 2 && fields[fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 2].toString()].prop.field_type === 'combo' &&
        (fields[fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 3].toString()].prop.field_type === 'ref_dir_tree' || fields[fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 3].toString()].prop.field_type === 'district'))) {
            let tmpPath = fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 2].toString();
            if (fields[value.fid.toString()].path.length > 3 && fields[fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 4].toString()].prop.field_type === 'address') {
                tmpPath = fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 4].toString();
            } else if (fields[value.fid.toString()].path.length > 2 && (fields[fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 3].toString()].prop.field_type === 'ref_dir_tree' || fields[fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 3].toString()].prop.field_type === 'district')) {
                tmpPath = fields[value.fid.toString()].path[fields[value.fid.toString()].path.length - 3].toString();
            }
            key = fields[tmpPath].prop.field_type + tmpPath;
            if (tempDoc[key]) {
                tempValue = tempDoc[key];
            }
            switch (fields[tmpPath].prop.field_type) {
                case 'ref_name':
                case 'user':
                case 'group':
                    if (fields[tmpPath].subFields[0] && fields[tmpPath].subFields[0].fid === value.fid) {
                        if (tempValue === '') {
                            tempValue = [];
                        }
                        tempValue.push(value.value[LANG]);
                    }
                    break;
                case 'ref_doc':
                    // if (fields[tmpPath].subFields[0] && fields[tmpPath].subFields[0].fid === value.fid) {
                    //     if (tempValue) {
                    //         tempValue = tempValue + ',' + value.value[LANG];
                    //     } else {
                    //         tempValue = value.value[LANG];
                    //     }
                    // }
                    break;
                case 'loose_date':
                    if (value.value) {
                        let tmp_loosedate_order = '';
                        Object.keys(value.path).forEach((path_fid) => {
                            tmp_loosedate_order += value.path[path_fid];
                        });
                        if (fields[tmpPath].subFields[0] && fields[tmpPath].subFields[0].fid === value.fid && fields[tmpPath].prop.date_format.indexOf(0) > -1) {
                            if (tempValue && loose_date_order.order === tmp_loosedate_order) {
                                tempValue[0] = value.value + '年';
                            } else {
                                tempValue = {};
                                loose_date_order.order = tmp_loosedate_order;
                                tempValue[0] = value.value + '年';
                            }
                        }
                        if (fields[tmpPath].subFields[1] && fields[tmpPath].subFields[1].fid === value.fid && fields[tmpPath].prop.date_format.indexOf(1) > -1) {
                            if (tempValue && loose_date_order.order === tmp_loosedate_order) {
                                tempValue[1] = value.value + '月';
                            } else {
                                tempValue = {};
                                loose_date_order.order = tmp_loosedate_order;
                                tempValue[1] = value.value + '月';
                            }
                        }
                        if (fields[tmpPath].subFields[2] && fields[tmpPath].subFields[2].fid === value.fid && fields[tmpPath].prop.date_format.indexOf(2) > -1) {
                            if (tempValue && loose_date_order.order === tmp_loosedate_order) {
                                tempValue[2] = value.value + '日';
                            } else {
                                tempValue = {};
                                loose_date_order.order = tmp_loosedate_order;
                                tempValue[2] = value.value + '日';
                            }
                        }
                    }
                    break;
                case 'ref_dir_tree':
                case 'district':
                    if (fields[tmpPath].subFields[0].subFields[0] && fields[tmpPath].subFields[0].subFields[0].fid === value.fid) {
                        if (tempValue) {
                            tempValue[value.path[fields[tmpPath].subFields[0].fid].toString()] = value.value[LANG];
                        } else {
                            tempValue = {};
                            tempValue[value.path[fields[tmpPath].subFields[0].fid].toString()] = value.value[LANG];
                        }
                    }
                    break;
                case 'address':
                    let tmpAddress = {};
                    if (tempValue) {
                        tmpAddress = tempValue[0] ? tempValue[0] : {};
                    } else {
                        tempValue = [];
                        tmpAddress = {};
                    }
                    if (fields[tmpPath].subFields[0].subFields[0].subFields[0] && fields[tmpPath].subFields[0].subFields[0].subFields[0].fid === value.fid && value.value[LANG] !== '县' && value.value[LANG] !== '市辖区') {
                        tmpAddress[value.path[fields[tmpPath].subFields[0].subFields[0].fid].toString()] = value.value[LANG];
                    }
                    tempValue[0] = tmpAddress;
                    if (fields[tmpPath].subFields[1] && fields[tmpPath].subFields[1].fid === value.fid) {
                        tempValue[1] = value.value[LANG];
                    }
                    if (fields[tmpPath].subFields[2] && fields[tmpPath].subFields[2].fid === value.fid && fields[tmpPath].subFields[2].prop.postcode_invisible) {
                        tempValue[2] = value.value[LANG];
                    }
                    if (fields[tmpPath].subFields[3] && fields[tmpPath].subFields[3].fid === value.fid && fields[tmpPath].subFields[2].prop.coordinate_invisible) {
                        tempValue[3] = value.value[LANG];
                    }
                    break;
                case 's_choice':
                    // 隐藏其他选项按钮
                    if (fields[tmpPath].prop.other_disabled) {
                        if (fields[tmpPath].subFields[1] && fields[tmpPath].subFields[1].fid === value.fid && value.value.length > 0) {
                            const currentValue = value.value[0];
                            if (currentValue !== -2 && currentValue !== '') {
                                tempValue = fields[tmpPath].subFields[1].prop.local[LANG].options[currentValue].opt_name;
                            }
                        }
                    } else {
                        if (fields[tmpPath].subFields[1] && fields[tmpPath].subFields[1].fid === value.fid && value.value.length > 0) {
                            const currentValue = value.value[0];
                                if (currentValue !== -2 && currentValue !== '' && currentValue !== undefined) {
                                    tempValue = fields[tmpPath].subFields[1].prop.local[LANG].options[currentValue].opt_name;
                                }
                        } else {
                            if (value.value[LANG] !== '') {
                                tempValue = value.value[LANG];
                            } else {
                                tempValue = fields[tmpPath].prop.local[LANG].other_name;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        } else {
            key = fields[value.fid.toString()].prop.field_type + value.fid;
            if (tempDoc[key]) {
                tempValue = tempDoc[key];
                if (fields[value.fid.toString()].path.length > 1) {
                    return;
                }
            }
            switch (fields[value.fid.toString()].prop.field_type) {
                case 'name':
                    if (tempValue === '') {
                        tempValue = value.value[LANG];
                    }
                    break;
                case 'single_line_text':
                case 'long_text':
                case 'tag':
                    let _lang = LANG;
                    if (fields[value.fid.toString()].prop.trans_type === 'uni') {
                        _lang = 'uni';
                    }
                    if (tempValue === '') {
                        tempValue = [];
                    }
                    tempValue.push(value.value[_lang]);
                    break;
                case 'link':
                case 'number':
                    let suffix = '';
                    if (fields[value.fid.toString()].prop.local && fields[value.fid.toString()].prop.local[LANG] && fields[value.fid.toString()].prop.local[LANG].suffix) {
                        suffix = fields[value.fid.toString()].prop.local[LANG].suffix;
                    }
                    if (typeof(value.value) === 'number') {
                        tempValue = tempValue + ' ' + value.value + suffix;
                    }
                    break;
                case 'formula':
                    // tempValue = preciseConvert(value.value[0], fields[value.fid].prop.precise);
                    break;
                case 'indicator_ordinary':
                    // tempValue = value.value.length > 0 ? (value.value[0][fields[value.fid].prop.indicator]) : '';
                    // tempValue = preciseConvert(tempValue, fields[value.fid].prop.precise);
                    break;
                case 'count':
                    // tempValue = value.value.join(' ');
                    break;
                case 'rich_text':
                    tempValue = value.value && value.value[LANG].length > 0 ? tempValue + ' ' + convertFromRaw(JSON.parse(_deCipher(value.value[LANG]))).getPlainText('\n') : '';
                    break;
                case 'doc_img':
                    if (tempValue === '') {
                        if (Array.isArray(value.value)) {
                            tempValue = value.value[0];
                        } else {
                            tempValue = value.value;
                        }
                    }
                    break;
                case 'image':
                case 'coordinate':
                    if (tempValue === '') {
                        tempValue = [];
                    }
                    tempValue.push(value.value);
                    break;
                case 'multiple_select':
                    if (Array.isArray(value.value)) {
                        tempValue = value.value.map( (val) => {
                            let opt = '';
                            Object.keys(fields[value.fid.toString()].prop.local[LANG].options).map( (optionKey) => {
                                if (val === Number(optionKey)) {
                                    opt = fields[value.fid.toString()].prop.local[LANG].options[optionKey].opt_name;
                                }
                            } );
                            return opt;
                        } );
                    }
                    break;
                case 'single_select':
                case 'drop_list':
                case 's_attitude':
                    if (Array.isArray(value.value)) {
                        const _tempValue = value.value.map( (val) => {
                            let opt = '';
                            Object.keys(fields[value.fid.toString()].prop.local[LANG].options).map( (optionKey) => {
                                if (val === Number(optionKey)) {
                                    opt = fields[value.fid.toString()].prop.local[LANG].options[optionKey].opt_name;
                                }
                            } );
                            return opt;
                        } ).join(' ');
                        tempValue = tempValue + ' ' + _tempValue;
                    }
                    break;
                case 'date':
                    if ( value.value[ 0 ] <= 0 ) {
                        tempValue = '';
                    } else {
                        tempValue = moment(value.value[0]).format('YYYY年MM月DD日');
                    }
                    break;
                case 'file':
                    const _tempFile = value.value.split( ',' )[ 0 ];
                    tempValue = tempValue + ' ' + _tempFile;
                    break;
                case 'toggle':
                    tempValue = value.value ? '是' : '否';
                    break;
                case 'phone':
                    if (fields[value.fid.toString()].prop.area === 'PRChina') {
                        const validateReg = /^((\+?86-)|(\(\+86-\)))/;
                        const tempPhone = validateReg.test(value.value) ? value.value.replace('+86-', '') : value.value;
                        tempValue = tempValue + ' ' + tempPhone;
                    } else {
                        tempValue = tempValue + ' ' + value.value;
                    }
                    break;
                case 'datetime':
                    tempValue = value.value ? value.value : '';
                    const formatType = fields[value.fid.toString()].prop.format_spec || 1;
                    switch (formatType) {
                        case 1:
                            break;
                        case 2:
                            tempValue = tempValue.split(' ')[0];
                            break;
                        case 3:
                            tempValue = tempValue.split(' ')[1];
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    tempValue = '不支持的字段类型';
            }
        }
        tempDoc[key] = tempValue;
    }
    return tempDoc;
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
        if (item.prop.field_type === 'ref_doc' || item.prop.field_type === 'loose_date'
            || item.prop.field_type === 'ref_dir_tree' || item.prop.field_type === 'address'
            || item.prop.field_type === 's_choice' || item.prop.field_type === 'district'
            || item.prop.field_type === 'ref_name' || item.prop.field_type === 'user' || item.prop.field_type === 'group') {
            fields[item.fid].subFields = [];
            if (item.prop.sub_fid_list) {
                for (let idx = 0; idx < item.prop.sub_fid_list.length; idx ++) {
                    fields[item.fid.toString()].subFields.push(fields[item.prop.sub_fid_list[idx].toString()]);
                }
                subFieldsIds = subFieldsIds.concat(item.prop.sub_fid_list);
            }
        } else if (item.prop.field_type === 'combo') {
            if (item.path.length > 1 && (fields[item.path[item.path.length - 2].toString()].prop.field_type === 'ref_dir_tree' ||　fields[item.path[item.path.length - 2].toString()].prop.field_type === 'district')) {
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
                        fields[item.fid.toString()].subFields.push(fields[item.prop.sub_fid_list[idx].toString()]);
                    }
                }
            }
        }
    });
    for (let idx = _formFields.length - 1; idx >= 0; idx--) {
        if (subFieldsIds.indexOf(_formFields[idx].fid) !== -1) {
            _formFields.splice(idx, 1);
        }
    }
    return _formFields;
}

export const formatDoclist = ( doclistValues, fields ) => {
    if ((!doclistValues) || (doclistValues.length === 0)) {
        return [];
    }
    // for each doc in list
    const docList = doclistValues.map( (row) => {
        if (row.permission) {
            const tempDoc = {
                fav: false,
                rank: row.prop.rank,
                orderkey: row.prop.orderkey,
                id: row.id
            };
            const loose_date_order = {
                order: ''
            }
            // for each position in view
            // value为空时让其它条目正常显示
            if (row.value) {
                Object.keys(row.value).forEach((key) => {
                    formatValue( row.value[key], fields, tempDoc, loose_date_order);
                });
            }
            return tempDoc;
        } else {
            const tempDoc = {
                id: 'noAuth'
            };
            return tempDoc;
        }
    } );
    return docList;
};

export const widthMap = {
    'multiple_select': 200,
    'date': 150,
    'doc_img': 120,
    'image': 200,
    'link': 200,
    'name': 300,
    'number': 120,
    'single_select': 200,
    'ref_name': 200,
    'user': 200,
    'group': 200,
    'drop_list': 200,
    'phone': 150,
    'single_line_text': 200,
    'toggle': 120,
    'long_text': 400,
    'rich_text': 400,
    'loose_date': 150,
    'ref_dir_tree': 200,
    'district': 200,
    'address': 400,
    'file': 200,
    'rank': 120,
    'indicator_ordinary': 120,
    'count': 120,
    'formula': 120,
    'tag': 200,
    's_attitude': 200,
    's_choice': 200,
    'coordinate': 200,
    'datetime': 150
};
export const supportedField = {
    'multiple_select': true,
    'date': true,
    'doc_img': true,
    'image': true,
    'link': true,
    'name': true,
    'number': true,
    'single_select': true,
    // 'ref_doc': true,
    'ref_name': true,
    'user': true,
    'group': true,
    'drop_list': true,
    'phone': true,
    'single_line_text': true,
    'toggle': true,
    'long_text': true,
    'rich_text': true,
    'loose_date': true,
    'ref_dir_tree': true,
    'district': true,
    'address': true,
    'file': true,
    'formula': true,
    'indicator_ordinary': true,
    'count': true,
    'combo': false,
    'ref_id': false,
    'splitter': false,
    'tag': true,
    's_attitude': true,
    's_choice': true,
    'coordinate': true,
    'datetime': true
};
export const alignMap = {
    'multiple_select': 'left',
    'date': 'center',
    'doc_img': 'center',
    'image': 'center',
    'link': 'left',
    'name': 'left',
    'number': 'right',
    'single_select': 'left',
    'ref_name': 'left',
    'user': 'left',
    'group': 'left',
    'drop_list': 'left',
    'phone': 'left',
    'single_line_text': 'left',
    'toggle': 'center',
    'long_text': 'left',
    'rich_text': 'left',
    'loose_date': 'center',
    'ref_dir_tree': 'left',
    'district': 'left',
    'address': 'left',
    'file': 'left',
    'combo': 'left',
    'ref_id': 'left',
    'splitter': 'left',
    'indicator_ordinary': 'right',
    'count': 'right',
    'formula': 'right',
    'tag': 'center',
    's_attitude': 'left',
    's_choice': 'left',
    'coordinate': 'left',
    'datetime': 'left'
};

// parseListViewFields
export function parseListViewFields(form, fidList, _alignMap, _widthMap) {
    if (!form.fields) {
        return {};
    }
    const fieldList = [];
    Object.keys(form.fields)
    .map(fid => {
        return {
            fid: fid,
            order: form.fields[fid].path.map(fid2 => {
                return form.fields[fid2.toString()].order;
            })
        };
    })
    .sort((f1, f2) => {
        const length = f1.order.length > f2.order.length ? f2.order.length : f1.order.length;
        for (let idx = 0; idx < length; idx++) {
            if (f1.order[idx] < f2.order[idx]) {
                return -1;
            }
            if (f1.order[idx] > f2.order[idx]) {
                return 1;
            }
        }
        if (f1.order.length > f2.order.length) {
            return 1;
        }
        return -1;
    })
    .forEach(field => {
        if (form.fields[field.fid].prop.rid === 1) {
            const _field = form.fields[field.fid];
            fieldList.push({
                fid: _field.fid,
                name: _field.prop.local ? _field.prop.local[LANG].name : '',
                depth: _field.path.length,
                type: _field.prop.field_type,
                selectedField: fidList.some(fid => fid === _field.fid) || !_widthMap[field.fid] ? true : false,
                noSelect: supportedField[_field.prop.field_type] ? false : true,
                width: _widthMap[field.fid] || widthMap[_field.prop.field_type] || 100,
                align: _alignMap[field.fid] || alignMap[_field.prop.field_type] || 'left'
            });
        }
    });
    return fieldList;
}
export function parseDocCardView(docdetail, view) {
    const _fieldList = {};
    for (const fidx in docdetail.form.fields) {
        if (docdetail.form.fields.hasOwnProperty(fidx)) {
            _fieldList[docdetail.form.fields[fidx].fid] = docdetail.form.fields[fidx];
        }
    }
    const docValue = JSON.parse(JSON.stringify(docdetail.data.values));
    const tmpdoc = {};
    tmpdoc.id = docdetail.prop.id;
    tmpdoc.baseId = docdetail.prop.baseId;
    for (const pos in view.positions) {
        if (!view.positions.hasOwnProperty(pos)) {
            return;
        }
        if (view.positions[pos].value.length > 0) {
            view.positions[pos].value.map((fid) => {
                const myValues = [];
                Object.keys(docValue).map((key) => {
                    if (_fieldList[fid]) {
                        switch (_fieldList[fid].prop.field_type) {
                            case 'ref_name':
                                const extendId = _fieldList[fid].prop.sub_fid_list[0];
                                if (extendId === docValue[key].fid) {
                                    myValues.push(docValue[key]);
                                }
                                break;
                            case 'ref_doc':
                                const targetFid = _fieldList[fid].prop.sub_fid_list[0];
                                if (targetFid === docValue[key].fid) {
                                    myValues.push(docValue[key]);
                                }
                                break;
                            case 'loose_date':
                                for (let idx = 0; idx < _fieldList[fid].prop.sub_fid_list.length - 1; idx ++) {
                                    if (_fieldList[fid].prop.sub_fid_list[idx] === docValue[key].fid) {
                                        myValues.push(docValue[key]);
                                    }
                                }
                                break;
                            case 'address':
                                for (let idx = 0; idx < _fieldList[fid].prop.sub_fid_list.length; idx ++) {
                                    if (idx === 0) {
                                        const tmpFid = _fieldList[fid].prop.sub_fid_list[0];
                                        const subFid = _fieldList[tmpFid].prop.sub_fid_list[0];
                                        if (_fieldList[subFid].prop.sub_fid_list[0] === docValue[key].fid) {
                                            myValues.push(docValue[key]);
                                        }
                                    } else {
                                        if (_fieldList[fid].prop.sub_fid_list[idx] === docValue[key].fid) {
                                            myValues.push(docValue[key]);
                                        }
                                    }
                                }
                                break;
                            case 'ref_dir_tree':
                                const tmpFid = _fieldList[fid].prop.sub_fid_list[0];
                                const subFid = _fieldList[tmpFid].prop.sub_fid_list[0];
                                if (subFid === docValue[key].fid) {
                                    myValues.push(docValue[key]);
                                }
                                break;
                            case 's_choice':
                                for (let idx = 0; idx < _fieldList[fid].prop.sub_fid_list.length; idx ++) {
                                    if (_fieldList[fid].prop.sub_fid_list[idx] === docValue[key].fid) {
                                        myValues.push(docValue[key]);
                                    }
                                }
                                break;
                            case 'district':
                                const _tmpFid_ = _fieldList[fid].prop.sub_fid_list[0];
                                const _subFid = _fieldList[_tmpFid_].prop.sub_fid_list[0];
                                if (_subFid === docValue[key].fid) {
                                    myValues.push(docValue[key]);
                                }
                                break;
                            default:
                                if (fid === docValue[key].fid) {
                                    myValues.push(docValue[key]);
                                }
                        }
                    }
                });
                let myTmpValue = '';
                if (_fieldList[fid]) {
                    switch (_fieldList[fid].type) {
                        case 'string':
                        case 'digital':
                            myTmpValue = myValues && myValues[0] ? myValues[0].value : '';
                            break;
                        case 'boolean':
                            if (myValues && myValues[0] && (myValues[0].value === true || myValues[0].value === 'true')) {
                                myTmpValue = '是';
                            } else if (myValues && myValues[0] && (myValues[0].value === false || myValues[0].value === 'false')) {
                                myTmpValue = '否';
                            }
                            break;
                        case 'list':
                            if (_fieldList[fid].prop.field_type === 'single_select') {
                                if (myValues && myValues[0]) {
                                    if (myValues[0].value[0] !== null && myValues[0].value[0] !== undefined) {
                                        const _value = myValues[0].value[0].toString();
                                        myTmpValue = (_value !== '-1') ? _fieldList[fid].prop.local[LANG].options[_value].opt_name : '';
                                    }
                                }
                            } else if (myValues && myValues[0]) {
                                myValues[0].value.map((opt) => {
                                    const _value = opt.toString();
                                    if (_value !== '-1') {
                                        myTmpValue = myTmpValue + _fieldList[fid].prop.local[LANG].options[_value].opt_name + ' ';
                                    }
                                });
                            }
                            break;
                        case 'combo':
                            if (_fieldList[fid].prop.field_type === 'ref_name' || _fieldList[fid].prop.field_type === 'ref_dir_tree') {
                                if (myValues) {
                                    myValues.map((item) => {
                                        if (item.value[LANG]) {
                                            myTmpValue = myTmpValue + item.value[LANG] + ' ';
                                        }
                                    });
                                }
                            } else if (_fieldList[fid].prop.field_type === 'loose_date') {
                                if (myValues) {
                                    let year = '';
                                    let month = '';
                                    let day = '';
                                    myValues.forEach((value) => {
                                        if (value.fid === _fieldList[fid].prop.sub_fid_list[0] && value.value) {
                                            if (year === '') {
                                                year = value.value + '年';
                                            }
                                        } else if (value.fid === _fieldList[fid].prop.sub_fid_list[1] && value.value) {
                                            if (month === '') {
                                                month = value.value + '月';
                                            }
                                        } else if (value.fid === _fieldList[fid].prop.sub_fid_list[2] && value.value) {
                                            if (day === '') {
                                                day = value.value + '日';
                                            }
                                        }
                                    });
                                    myTmpValue = year + month + day;
                                }
                            } else if (_fieldList[fid].prop.field_type === 'address') {
                                if (myValues) {
                                    const _myValues = myValues.sort((value1, value2) => {
                                        if (value1.fid < value2.fid) {
                                            return -1;
                                        }
                                        if (value1.fid > value2.fid) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                    _myValues.map((item) => {
                                        if (typeof item.value === 'object' && item.value[LANG]) {
                                            myTmpValue = myTmpValue + item.value[LANG] + ' ';
                                        } else if (typeof item.value === 'string' && item.value) {
                                            myTmpValue = myTmpValue + item.value + ' ';
                                        }
                                    });
                                }
                            } else if (_fieldList[fid].prop.field_type === 's_choice') {
                                if (myValues.length > 0) {
                                    if (myValues[1].value[0] !== -2) {
                                        const _fid = myValues[1].fid.toString();
                                        const _value = myValues[1].value[0];
                                        myTmpValue = _fieldList[_fid].prop.local[LANG].options[_value].opt_name;
                                    } else {
                                        myTmpValue = myValues[0].value[LANG];
                                    }
                                }
                            } else if (_fieldList[fid].prop.field_type === 'ref_doc') {
                                if (myValues) {
                                    myValues.map((item) => {
                                        if (item.value) {
                                            if (myTmpValue) {
                                                myTmpValue = myTmpValue + ' ' + item.value;
                                            } else {
                                                myTmpValue = item.value;
                                            }
                                        }
                                    });
                                }
                            } else if (_fieldList[fid].prop.field_type === 'district') {
                                if (myValues.length > 0) {
                                    myValues.forEach((item) => {
                                        if (item.value[LANG] !== '' && item.value[LANG] !== '县' && item.value[LANG] !== '市辖区') {
                                            if (myTmpValue) {
                                                myTmpValue = myTmpValue + ' ' + item.value[LANG];
                                            } else {
                                                myTmpValue = item.value[LANG];
                                            }
                                        }
                                    });
                                }
                            }
                            break;
                        default:
                            myTmpValue = myValues && myValues[0] ? myValues[0].value[LANG] : '';
                    }
                    if (pos === 'name') {
                        tmpdoc[pos] = myTmpValue;
                    } else if (pos === 'docImg') {
                        tmpdoc[pos] = myTmpValue;
                        tmpdoc.docImgInvisible = docdetail.form.fields['2'].prop.invisible;
                    } else if (view.positions[pos].max_record === 1) {
                        tmpdoc[pos] = {
                            'name': '',
                            'value': ''
                        };
                        tmpdoc[pos].name = _fieldList[fid].prop.local[LANG] ? _fieldList[fid].prop.local[LANG].name : '';
                        tmpdoc[pos].value = myTmpValue;
                    } else {
                        if (!tmpdoc[pos]) {
                            tmpdoc[pos] = [];
                        }
                        tmpdoc[pos].push({
                            'name': '',
                            'value': ''
                        });
                        const length = tmpdoc[pos].length;
                        tmpdoc[pos][length - 1].name = _fieldList[fid].prop.local[LANG] ? _fieldList[fid].prop.local[LANG].name : '';
                        tmpdoc[pos][length - 1].value = myTmpValue;
                    }
                }
            });
        }
    }
    return tmpdoc;
}
