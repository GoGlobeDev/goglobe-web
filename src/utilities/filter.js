// @file 筛选的的公用函数
// @author SPC
import { LANG } from 'theme/Lang';

export const optionMap = {
    'name': {
        fuzzySearch: {
            label: '模糊匹配',
            rid: 1
        },
        equalsTo: {
            label: '包含',
            rid: 1
        }
    },
    'single_line_text': {
        fuzzySearch: {
            label: '模糊匹配',
            rid: 1
        },
        equalsTo: {
            label: '包含',
            rid: 1
        }
    },
    'doc_img': {
        fuzzySearch: {
            label: '有',
            rid: 1
        }
    },
    'image': {
        fuzzySearch: {
            label: '有',
            rid: 1
        }
    },
    'file': {
        fuzzySearch: {
            label: '有',
            rid: 1
        }
    },
    'single_select': {
        equalsTo: {
            label: '等于',
            rid: 1
        }
    },
    'drop_list': {
        equalsTo: {
            label: '等于',
            rid: 1
        }
    },
    'multiple_select': {
        equalsTo: {
            label: '等于',
            rid: 1
        }
    },
    'phone': {
        fuzzySearch: {
            label: '模糊匹配',
            rid: 1
        }
    },
    'link': {
        fuzzySearch: {
            label: '模糊匹配',
            rid: 1
        },
        equalsTo: {
            label: '包含',
            rid: 1
        }
    },
    'tag': {
        fuzzySearch: {
            label: '模糊匹配',
            rid: 1
        },
        equalsTo: {
            label: '包含',
            rid: 1
        }
    },
    'long_text': {
        fuzzySearch: {
            label: '模糊匹配',
            rid: 1
        },
        equalsTo: {
            label: '包含',
            rid: 1
        }
    },
    'number': {
        greaterThan: {
            label: '>',
            rid: 1
        },
        lessThan: {
            label: '<',
            rid: 1
        },
        equalsTo: {
            label: '=',
            rid: 1
        },
        greaterEqualsTo: {
            label: '>=',
            rid: 1
        },
        lessEqualsTo: {
            label: '<=',
            rid: 1
        }
    },
    'toggle': {
        equalsTo: {
            label: '等于',
            rid: 1
        }
    },
    'ref_name': {
        equalsTo: {
            label: '精确匹配',
            rid: 3
        },
        fuzzySearch: {
            label: '模糊匹配',
            rid: 2
        }
    },
    'ref_dir_tree': {
        equalsTo: {
            label: '精确匹配',
            rid: 4
        },
        fuzzySearch: {
            label: '模糊匹配',
            rid: 3
        }
    },
    'address': {
        equalsTo: {
            label: '精确匹配',
            rid: 5
        },
        fuzzySearch: {
            label: '模糊匹配',
            rid: 6
        }
    },
    's_attitude': {
        equalsTo: {
            label: '等于',
            rid: 1
        }
    },
    's_choice': {
        equalsTo: {
            label: '等于',
            rid: 3
        },
        fuzzySearch: {
            label: '模糊匹配',
            rid: 2
        }
    },
    'district': {
        equalsTo: {
            label: '精确匹配',
            rid: 4
        },
        fuzzySearch: {
            label: '模糊匹配',
            rid: 3
        }
    },
    'datetime': {
        equalsTo: {
            label: '精确匹配',
            rid: 1
        },
        lessEqualsTo: {
            label: '早于',
            rid: 1
        },
        greaterEqualsTo: {
            label: '晚于',
            rid: 1
        },
        // 2017-01-01 01:01:01,2017-01-01 01:01:02
        between: {
            label: '区间',
            rid: 1
        }
    },
    'relation': {
        'AND': '且',
        'OR': '或'
    },
    'combo': {}
};

export function getDefaultValue(type) {
    switch (type) {
        case 'name':
        case 'single_line_text':
        case 'phone':
        case 'link':
        case 'tag':
        case 'long_text': {
            return '';
        }
        case 'number': {
            return '';
        }
        case 'image':
        case 'doc_img':
        case 'file': {
            return '*';
        }
        case 'single_select':
        case 'multiple_select':
        case 'drop_list': {
            return -1;
        }
        case 'toggle': {
            return true;
        }
        case 'ref_id': {
            return '';
        }
        case 'datetime': {
            return '';
        }
        default:
            return '';
    }
}

export function getDefaultOption(type) {
    switch (type) {
        case 'doc_img':
        case 'phone':
        case 'link':
        case 'image':
        case 'file': {
            return 'fuzzySearch';
        }
        case 'number': {
            return 'equalsTo';
        }
        case 'name':
        case 'single_line_text':
        case 'long_text':
        case 'tag':
        case 'ref_dir_tree':
        case 'address':
        case 'ref_name': {
            return 'equalsTo';
        }
        case 'single_select':
        case 'multiple_select':
        case 'drop_list':
        case 'toggle': {
            return 'equalsTo';
        }
        default:
            return 'equalsTo';
    }
}
// parseForm for filter
export function parseFilterForm(form) {
    if (!form.fields) {
        return {};
    }
    const _form = {
        fields: form.fields,
        fieldsList: []
    };
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
        if (form.fields[field.fid].prop.rid === 1 && optionMap[form.fields[field.fid].prop.field_type]) {
            _form.fieldsList.push({
                fid: form.fields[field.fid].fid,
                field_type: form.fields[field.fid].prop.field_type,
                name: form.fields[field.fid].prop.local ? form.fields[field.fid].prop.local[LANG].name : '',
                depth: form.fields[field.fid].path.length,
                r_map: {
                    '1': field.fid
                }
            });
        }
        if (form.fields[field.fid].prop.rid !== 1) {
            let fatherFid = 0;
            form.fields[field.fid].path.forEach((fid) => {
                if (form.fields[fid.toString()].prop.rid === 1) {
                    fatherFid = fid;
                }
            });
            // 地址字段将配置提升到地址字段的外部
            if (fatherFid && form.fields[fatherFid].prop.field_type === 'address' && form.fields[field.fid].prop.rid === 2 ) {
                form.fields[fatherFid].prop.target_base = form.fields[field.fid].prop.target_base;
                form.fields[fatherFid].prop.target_dir = form.fields[field.fid].prop.target_dir ? [... form.fields[field.fid].prop.target_dir] : [];
            }
            // 建立rid和fid的关系
            if (fatherFid && _form.fieldsList.some(item => item.fid === fatherFid)) {
                _form.fieldsList[_form.fieldsList.length - 1].r_map[form.fields[field.fid].prop.rid.toString()] = field.fid;
            }
        }
    });
    return _form;
}
// 删除筛选条件中的空条件
export function trimFilter(filterState) {
    const trimReg = /^\s*$/;
    const _filterState = JSON.parse(JSON.stringify(filterState));
    for (let idx = _filterState.qrOfFields.length - 1; idx >= 0; idx--) {
        for (let idx2 = _filterState.qrOfFields[idx].qrOfField.length - 1; idx2 >= 0; idx2--) {
            if (trimReg.test(_filterState.qrOfFields[idx].qrOfField[idx2].qrValue)) {
                _filterState.qrOfFields[idx].qrOfField.splice(idx2, 1);
            }
        }
        if (_filterState.qrOfFields[idx].qrOfField.length === 0) {
            _filterState.qrOfFields.splice(idx, 1);
        }
    }
    return _filterState;
}
export function parseFilterToData(qrOfFields) {
    const values = [];
    qrOfFields.forEach((field, index) => {
        values.push({
            fid: 701,
            path: {
                '7': index + 1,
                '701': 1
            },
            value: field.fid
        });
        values.push({
            fid: 702,
            path: {
                '7': index + 1,
                '702': 1
            },
            value: field.fieldType
        });
        values.push({
            fid: 11,
            path: {
                '7': index + 1,
                '11': 1
            },
            value: field.reOverFields
        });
        field.qrOfField.forEach((query, index2) => {
            values.push({
                fid: 703,
                path: {
                    '7': index + 1,
                    '708': index2 + 1,
                    '703': 1
                },
                value: query.qrOptType
            });
            values.push({
                fid: 704,
                path: {
                    '7': index + 1,
                    '708': index2 + 1,
                    '704': 1
                },
                value: query.qrValue.toString()
            });
            values.push({
                fid: 705,
                path: {
                    '7': index + 1,
                    '708': index2 + 1,
                    '705': 1
                },
                value: query.reOpt
            });
            values.push({
                fid: 706,
                path: {
                    '7': index + 1,
                    '708': index2 + 1,
                    '706': 1
                },
                value: query.qrFid
            });
            values.push({
                fid: 707,
                path: {
                    '7': index + 1,
                    '708': index2 + 1,
                    '707': 1
                },
                value: query.qrFType
            });
        });
    });
    return values;
}

// 获取当前可以筛选的字段列表
export function getTargetFieldList(fields) {
    const targetFieldList = [];
    const _tmpFields = [];
    Object.keys(fields).forEach((fid) => {
        if (fields[fid].prop.field_type === 'address' || fields[fid].prop.field_type === 'single_select' || fields[fid].prop.field_type === 'drop_list' || fields[fid].prop.field_type === 'multiple_select' || fields[fid].prop.field_type === 'toggle' || fields[fid].prop.field_type === 'ref_dir_tree') {
            if (fields[fid].path.every((pathId) => fields[pathId].prop.field_type !== 'ref_doc')) {
                _tmpFields.push(JSON.parse(JSON.stringify(fields[fid])));
            }
        }
    });
    _tmpFields.map((item) => {
        if (item.prop.field_type === 'address') {
            targetFieldList.push({
                type: 'address',
                value: item.prop.local[LANG].name,
                fid: item.fid
            });
        } else if (item.prop.field_type === 'ref_dir_tree') {
            if (item.path.length === 1 || fields[item.path[item.path.length - 2]].prop.field_type !== 'address') {
                targetFieldList.push({
                    type: 'ref_dir_tree',
                    value: item.prop.local[LANG].name,
                    fid: item.fid
                });
            }
        } else {
            targetFieldList.push({
                type: item.prop.field_type,
                value: item.prop.local[LANG].name,
                fid: item.fid
            });
        }
    });
    return targetFieldList;
}

export function parseDirDetailToFilter(dir) {
    const dirFilter = dir.configSchema.values[2].values;
    const filter = dirFilter.map((item) => {
        const tmpFilter = {
            'fid': item[0].values[0].value,
            'fieldType': item[1].values[0].value,
            'reOverFields': item[2].values[0].value,
            'qrOfField': []
        };
        tmpFilter.qrOfField = item[3].values.map((qrOfField) => {
            const condition = {
                'qrOptType': qrOfField[0].values[0].value,
                'qrValue': qrOfField[1].values[0].value,
                'reOpt': qrOfField[2].values[0].value,
                'qrFid': qrOfField[3].values[0].value,
                'qrFType': qrOfField[4].values[0].value
            };
            return condition;
        });
        return tmpFilter;
    });
    return filter;
}
// 支持排序的字段
export const sortMap = {
    'name': true,
    'single_line_text': true,
    'long_text': true,
    'single_select': true,
    'drop_list': true,
    'multiple_select': true,
    'phone': true,
    'link': true,
    'tag': true,
    'number': true,
    'datetime': true
};
// 返回排序使用的字段列表
export function parseSortForm(form) {
    if (!form.fields) {
        return [];
    }
    const fieldsList = [];
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
        if (form.fields[field.fid].prop.rid === 1 && sortMap[form.fields[field.fid].prop.field_type]) {
            fieldsList.push({
                fid: form.fields[field.fid].fid,
                field_type: form.fields[field.fid].prop.field_type,
                name: form.fields[field.fid].prop.local ? form.fields[field.fid].prop.local[LANG].name : '',
                depth: form.fields[field.fid].path.length
            });
        }
    });
    return fieldsList;
}
