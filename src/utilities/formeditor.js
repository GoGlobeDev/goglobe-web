// @file 表单编辑器的公用函数
// @author SPC
import { LANG } from 'theme/Lang';
// 判断一个字段是否在目标字段的后面
export function afterField(field, path, order) {
    if (field.order < order) {
        return false;
    }
    if (field.path.length === path.length) {
        const length = field.path.length;
        if (length === 1) {
            return true;
        }
        if (field.path[length - 2] === path[length - 2]) {
            return true;
        }
    }
    return false;
}
// 通过字段信息生成配置数据
export function propToData(form, ridList) {
    const data = {
        data_prop: {
            last_vid: 0,
            lang: [
                LANG
            ],
            init_lang: LANG
        },
        values: {
        }
    };
    Object.keys(form.fields).forEach(fid => {
        if (!form.fields.hasOwnProperty(fid)) {
            return;
        }
        if (!form.fields[fid].prop.target_rid || !ridList[form.fields[fid].prop.target_rid.toString()]) {
            return;
        }
        const propName = form.fields[fid].prop.prop_name;
        const field = ridList[form.fields[fid].prop.target_rid.toString()];
        switch (propName) {
            case 'name':
            case 'description':
            case 'placeholder':
            case 'suffix':
            case 'prefix':
            case 'info':
            case 'other_name': {
                if (!field.prop.local[LANG][propName]) {
                    return;
                }
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: {}
                };
                value.path[fid] = 1;
                value.value[LANG] = field.prop.local[LANG][propName];
                data.values[value.vid.toString()] = value;
                return;
            }
            case 'file_type': {
                if (typeof field.prop[propName] !== 'string') {
                    return;
                }
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: {}
                };
                value.path[fid] = 1;
                value.value = field.prop[propName];
                data.values[value.vid.toString()] = value;
                return;
            }
            case 'date_format':
            case 'obj_type':
            case 'display_type': {
                if (!Array.isArray(field.prop[propName])) {
                    return;
                }
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: {}
                };
                value.path[fid] = 1;
                value.value = field.prop[propName];
                data.values[value.vid.toString()] = value;
                return;
            }
            case 'min_length':
            case 'max_length':
            case 'min_record':
            case 'max_record':
            case 'greater_equal':
            case 'less_equal':
            case 'min_file_size':
            case 'max_file_size':
            case 'min_level':
            case 'max_level':
            case 'min_choice':
            case 'max_choice':
            case 'last_opt':
            case 'limit': {
                if (typeof field.prop[propName] !== 'number') {
                    return;
                }
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: {}
                };
                value.path[fid] = 1;
                value.value = field.prop[propName];
                data.values[value.vid.toString()] = value;
                return;
            }
            case 'default_value': {
                if (field.type === 'iString' && field.prop.local[LANG][propName]) {
                    const value = {
                        fid: parseInt(fid, 10),
                        path: {},
                        vid: ++data.data_prop.last_vid,
                        value: {}
                    };
                    value.path[fid] = 1;
                    value.value[LANG] = field.prop.local[LANG][propName];
                    data.values[value.vid.toString()] = value;
                    return;
                }
                if (typeof field.prop[propName] !== 'undefined' && field.prop[propName] !== null && field.prop[propName] !== '') {
                    const value = {
                        fid: parseInt(fid, 10),
                        path: {},
                        vid: ++data.data_prop.last_vid,
                        value: {}
                    };
                    value.path[fid] = 1;
                    value.value = field.prop[propName];
                    data.values[value.vid.toString()] = value;
                    return;
                }
                return;
            }
            case 'name_invisible':
            case 'name_aligned':
            case 'required':
            case 'invisible':
            case 'other_disabled':
            // user/datetime字段:是否允许修改
            case 'permit_manual': {
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid
                };
                value.path[fid] = 1;
                value.value = field.prop[propName] || false;
                data.values[value.vid.toString()] = value;
                return;
            }
            case 'number_type': {
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid
                };
                value.path[fid] = 1;
                value.value = (field.prop.number_type === 'int');
                data.values[value.vid.toString()] = value;
                return;
            }
            case 'select_tip': {
                if (!field.prop.local[LANG][propName]) {
                    return;
                }
                field.prop.local[LANG][propName].map((tip, index) => {
                    const value = {
                        fid: parseInt(fid, 10),
                        path: {},
                        vid: ++data.data_prop.last_vid,
                        value: {}
                    };
                    value.path[fid] = index + 1;
                    value.value[LANG] = tip;
                    data.values[value.vid.toString()] = value;
                });
                return;
            }
            case 'target_base': {
                if (field.prop.field_type === 'ref_name') {
                    field.prop.ref_settings.forEach((refSetting, index) => {
                        if (refSetting.target_base && refSetting.target_base !== '') {
                            const value = {
                                fid: parseInt(fid, 10),
                                path: {},
                                vid: ++data.data_prop.last_vid
                            };
                            value.path[form.fields[fid].path[0].toString()] = index + 1;
                            value.path[fid] = 1;
                            value.value = refSetting.target_base;
                            data.values[value.vid.toString()] = value;
                        }
                    });
                }
                if (field.prop.field_type === 'ref_dir_tree' || field.prop.field_type === 'ref_doc' || field.prop.field_type === 'link_doc_filter' || field.prop.field_type === 'link_doc_manual') {
                    const value = {
                        fid: parseInt(fid, 10),
                        path: {},
                        vid: ++data.data_prop.last_vid
                    };
                    value.path[fid] = 1;
                    value.value = field.prop.target_base || '';
                    data.values[value.vid.toString()] = value;
                    return;
                }
                return;
            }
            case 'target_dir': {
                if (field.prop.field_type === 'ref_name') {
                    field.prop.ref_settings.forEach((refSetting, index) => {
                        if (refSetting.target_dir && refSetting.target_dir.length > 0) {
                            refSetting.target_dir.forEach((targetDir, index2) => {
                                if (targetDir !== '') {
                                    const value = {
                                        fid: parseInt(fid, 10),
                                        path: {},
                                        vid: ++data.data_prop.last_vid
                                    };
                                    value.path[form.fields[fid].path[0].toString()] = index + 1;
                                    value.path[fid] = index2 + 1;
                                    value.value = targetDir;
                                    data.values[value.vid.toString()] = value;
                                }
                            });
                        }
                    });
                }
                if (field.prop.field_type === 'ref_doc' || field.prop.field_type === 'link_doc_filter' || field.prop.field_type === 'link_doc_manual') {
                    if (field.prop.target_dir && field.prop.target_dir.length > 0 ) {
                        field.prop.target_dir.forEach((tmpDir, index) => {
                            if (tmpDir !== '') {
                                const value = {
                                    fid: parseInt(fid, 10),
                                    path: {},
                                    vid: ++data.data_prop.last_vid
                                };
                                value.path[fid] = index + 1;
                                value.value = tmpDir;
                                data.values[value.vid.toString()] = value;
                            }
                        });
                    }
                }
                if (field.prop.field_type === 'ref_dir_tree') {
                    if (field.prop.target_dir && field.prop.target_dir.length > 0 ) {
                        if (field.prop.target_dir[0] !== '') {
                            const value = {
                                fid: parseInt(fid, 10),
                                path: {},
                                vid: ++data.data_prop.last_vid
                            };
                            value.path[fid] = 1;
                            value.value = field.prop.target_dir[0];
                            data.values[value.vid.toString()] = value;
                        }
                        return;
                    }
                }
                if (field.prop.field_type === 'district') {
                    if (field.prop.target_dir && field.prop.target_dir.length > 0 ) {
                        if (field.prop.target_dir[0] !== '') {
                            const value = {
                                fid: parseInt(fid, 10),
                                path: {},
                                vid: ++data.data_prop.last_vid
                            };
                            value.path[fid] = 1;
                            value.value = field.prop.target_dir[0];
                            data.values[value.vid.toString()] = value;
                        }
                        return;
                    }
                }
                return;
            }
            case 'options': {
                field.prop.opt_order.forEach((option, index) => {
                    // 选项名称
                    const value = {
                        fid: form.fields[fid].prop.sub_fid_list[0],
                        path: {},
                        vid: ++data.data_prop.last_vid,
                        value: {}
                    };
                    value.path[fid] = index + 1;
                    value.path[form.fields[fid].prop.sub_fid_list[0].toString()] = 1;
                    value.value[LANG] = field.prop.local[LANG].options[option].opt_name;
                    data.values[value.vid.toString()] = value;
                    // 选项值
                    const value2 = {
                        fid: form.fields[fid].prop.sub_fid_list[1],
                        path: {},
                        vid: ++data.data_prop.last_vid
                    };
                    value2.path[fid] = index + 1;
                    value2.path[form.fields[fid].prop.sub_fid_list[1].toString()] = 1;
                    value2.value = parseInt(option, 10);
                    data.values[value2.vid.toString()] = value2;
                });
                return;
            }
            case 'target_fld': {
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: {}
                };
                value.path[fid] = 1;
                const valueObj = {
                    'target_fld': field.prop.target_fld,
                    'selected_fields': field.prop.selected_fields
                };
                value.value = JSON.stringify(valueObj);
                data.values[value.vid.toString()] = value;
                return;
            }
            case 'target_fid': {
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: field.prop.target_fid
                };
                value.path[fid] = 1;
                data.values[value.vid.toString()] = value;
                return;
            }
            case 'condition_generator': {
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: field.prop.condition_generator
                };
                value.path[fid] = 1;
                data.values[value.vid.toString()] = value;
                return;
            }
            // user字段中的群组id
            case 'user_group': {
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: null
                };
                value.path[fid] = 1;
                value.value = field.prop.user_group || '';
                data.values[value.vid.toString()] = value;
                return;
            }
            // user/datetime字段中的自动填写规则
            case 'af_construct': {
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: []
                };
                value.path[fid] = 1;
                value.value[0] = field.prop.af_construct || '';
                data.values[value.vid.toString()] = value;
                return;
            }
            // datetime字段中的格式设置
            case 'format_spec': {
                const value = {
                    fid: parseInt(fid, 10),
                    path: {},
                    vid: ++data.data_prop.last_vid,
                    value: []
                };
                value.path[fid] = 1;
                value.value[0] = field.prop.format_spec || '';
                data.values[value.vid.toString()] = value;
                return;
            }
            default:
                return;
        }
    });
    return data;
}

export function dataToProps(form, data) {
    const props = {};
    const rawProp = {
        local: {
        }
    };
    rawProp.local[LANG] = {};
    const options = [];
    let optionRid = '';
    Object.keys(data.values).forEach(vid => {
        if (!data.values.hasOwnProperty(vid)) {
            return;
        }
        const value = data.values[vid];
        const field = form.fields[value.fid.toString()];
        if (!form.fields[value.fid]) {
            return;
        }
        const propName = form.fields[value.fid].prop.prop_name;
        const rid = form.fields[value.fid].prop.target_rid;
        if (!props[rid.toString()]) {
            props[rid.toString()] = JSON.parse(JSON.stringify(rawProp));
            if ( form.id === 'jsonfield_doc_img' || form.id === 'jsonfield_image') {
                props[rid.toString()].default_value = null;
            }
        }
        const prop = props[rid.toString()];
        switch (propName) {
            case 'name':
            case 'description':
            case 'placeholder':
            case 'suffix':
            case 'prefix':
            case 'info':
            case 'other_name': {
                prop.local[LANG][propName] = value.value[LANG];
                return;
            }
            case 'select_tip': {
                if (!prop.local[LANG][propName]) {
                    prop.local[LANG][propName] = [];
                }
                prop.local[LANG][propName].push(value.value[LANG]);
                return;
            }
            case 'file_type': {
                if (typeof value.value !== 'string') {
                    return;
                }
                prop[propName] = value.value;
                return;
            }
            case 'date_format':
            case 'display_type': {
                if (!Array.isArray(value.value)) {
                    return;
                }
                prop[propName] = value.value;
                return;
            }
            case 'obj_type': {
                if (!Array.isArray(value.value)) {
                    return;
                }
                // const typeNameMap = {
                //     '1': 'doc',
                //     '2': 'base'
                // };
                // const typeName = value.value.map((opt) => {
                //     return typeNameMap[opt.toString()];
                // });
                prop[propName] = value.value;
                return;
            }
            case 'min_length':
            case 'max_length':
            case 'min_record':
            case 'max_record':
            case 'greater_equal':
            case 'less_equal':
            case 'min_file_size':
            case 'max_file_size':
            case 'min_level':
            case 'max_level':
            case 'min_choice':
            case 'max_choice':
            case 'limit': {
                if (typeof value.value !== 'number') {
                    return;
                }
                prop[propName] = value.value;
                return;
            }
            case 'name_invisible':
            case 'name_aligned':
            case 'required':
            case 'invisible':
            case 'other_disabled':
            // user/datetime字段:是否允许修改
            case 'permit_manual': {
                prop[propName] = value.value;
                return;
            }
            case 'default_value': {
                if (field.type === 'iString') {
                    prop.local[LANG][propName] = value.value[LANG];
                    return;
                }
                prop[propName] = value.value;
                return;
            }
            case 'number_type': {
                prop[propName] = value.value ? 'int' : 'double';
                return;
            }
            case 'target_base': {
                if (form.id === 'jsonfield_ref_name') {
                    if (!prop.ref_settings) {
                        prop.ref_settings = [];
                    }
                    const order = value.path[field.path[0].toString()] - 1;
                    if (prop.ref_settings[order]) {
                        prop.ref_settings[order].target_base = value.value;
                    } else {
                        prop.ref_settings[order] = {
                            target_base: value.value,
                            target_dir: []
                        };
                    }
                    return;
                }
                if (form.id === 'jsonfield_ref_dir_tree' || form.id === 'jsonfield_ref_doc' || form.id === 'jsonfield_link_doc_filter' || form.id === 'jsonfield_link_doc_manual') {
                    prop[propName] = value.value;
                    return;
                }
                return;
            }
            case 'target_fld': {
                const valueObj = JSON.parse(value.value);
                prop.selected_fields = valueObj.selected_fields;
                prop.target_fld = valueObj.target_fld;
                return;
            }
            case 'target_dir': {
                if (form.id === 'jsonfield_ref_name' && value.value !== '') {
                    if (!prop.ref_settings) {
                        prop.ref_settings = [];
                    }
                    const order = value.path[field.path[0].toString()] - 1;
                    if (prop.ref_settings[order]) {
                        prop.ref_settings[order].target_dir.push(value.value);
                    } else {
                        prop.ref_settings[order] = {
                            target_base: '',
                            target_dir: [value.value]
                        };
                    }
                    return;
                }
                if (form.id === 'jsonfield_ref_dir_tree' && value.value !== '') {
                    prop[propName] = [value.value];
                    return;
                }
                if (form.id === 'jsonfield_ref_doc' && value.value !== '') {
                    if (!prop[propName]) {
                        prop[propName] = [];
                    }
                    prop[propName].push(value.value);
                    return;
                }
                if (form.id === 'jsonfield_address' && value.value !== '') {
                    prop[propName] = [value.value];
                    return;
                }
                if (form.id === 'jsonfield_district' && value.value !== '') {
                    prop[propName] = [value.value];
                    return;
                }
                if (form.id === 'jsonfield_link_doc_filter' && value.value !== '') {
                    if (!prop[propName]) {
                        prop[propName] = [];
                    }
                    prop[propName].push(value.value);
                    return;
                }
                if (form.id === 'jsonfield_link_doc_manual' && value.value !== '') {
                    if (!prop[propName]) {
                        prop[propName] = [];
                    }
                    prop[propName].push(value.value);
                    return;
                }
                return;
            }
            case 'opt_name': {
                const order = value.path[field.path[0].toString()] - 1;
                if (optionRid === '') {
                    optionRid = rid.toString();
                }
                if (options[order]) {
                    options[order].opt_name = value.value[LANG];
                } else {
                    options[order] = {
                        opt_name: value.value[LANG]
                    };
                }
                return;
            }
            case 'opt_id': {
                const order = value.path[field.path[0].toString()] - 1;
                if (options[order]) {
                    options[order].opt_id = value.value;
                } else {
                    options[order] = {
                        opt_id: value.value
                    };
                }
                if (value.value > prop.last_opt) {
                    prop.last_opt = value.value;
                }
                return;
            }
            case 'target_fid': {
                prop.target_fid = value.value;
                return;
            }
            case 'condition_generator': {
                prop.condition_generator = value.value;
                return;
            }
            // user字段中的群组id
            case 'user_group': {
                prop.user_group = value.value;
                return;
            }
            // user字段中的自动填写规则
            case 'af_construct': {
                prop.af_construct = value.value[0];
                return;
            }
            // datetime字段中的格式设置
            case 'format_spec': {
                prop.format_spec = value.value[0];
                return;
            }
            default:
                return;
        }
    });
    if (options.length > 0) {
        props[optionRid].local[LANG].options = {};
        props[optionRid].opt_order = options.map((option) => {
            props[optionRid].local[LANG].options[option.opt_id.toString()] = { opt_name: option.opt_name };
            return option.opt_id.toString();
        });
    }
    if (form.id === 'jsonfield_ref_dir_tree' || form.id === 'jsonfield_ref_doc' || form.id === 'jsonfield_address' || form.id === 'jsonfield_district' || form.id === 'jsonfield_link_doc_filter' || form.id === 'jsonfield_link_doc_manual') {
        if (!props['1'].target_dir) {
            props['1'].target_dir = [];
        }
    }
    return props;
}

// 生成特殊字段的rid字段列表
export function getRidList(comboId, fields) {
    const ridList = {};
    if (fields[comboId.toString()].prop.field_type === 'combo') {
        ridList['1'] = fields[comboId];
        return ridList;
    }
    Object.keys(fields).forEach((fid) => {
        if (!fields.hasOwnProperty(fid)) {
            return;
        }
        if (fields[comboId].prop.field_type === 'ref_doc') {
            if (fields[fid].path.indexOf(comboId) > -1 && fields[fid].path.length < 3) {
                ridList[fields[fid].prop.rid.toString()] = fields[fid];
            }
        } else {
            if (fields[fid].path.indexOf(comboId) > -1) {
                ridList[fields[fid].prop.rid.toString()] = fields[fid];
            }
        }
    });
    return ridList;
}
