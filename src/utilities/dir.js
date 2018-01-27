// @file 目录的的公用函数
// @author SPC
import { LANG } from 'theme/Lang';

export function parseCreateFilterDir(detailData, filterData, baseId, dirId) {
    const data = {
        'baseId': baseId,
        'detail': detailData,
        // {
        //     'id': '',
        //     'data_prop': {
        //         'last_vid': 1,
        //         'lang': [
        //             'zh'
        //         ],
        //         'init_lang': 'zh',
        //         'version': '0.0.0'
        //     },
        //     'values': {
        //         '1': {
        //             'fid': 1,
        //             'path': {
        //                 '1': 1
        //             },
        //             'vid': 1,
        //             'value': {
        //                 'zh': name
        //             }
        //         }
        //     }
        // },
        'config': {
            'id': '',
            'data_prop': {
                'last_vid': 2 + filterData.length,
                'lang': [
                    'zh'
                ],
                'init_lang': 'zh',
                'version': '0.0.0'
            },
            'values': {
                '1': {
                    'fid': 5,
                    'path': {
                        '5': 1
                    },
                    'vid': 1,
                    'value': false
                },
                '2': {
                    'fid': 6,
                    'path': {
                        '6': 1
                    },
                    'vid': 2,
                    'value': [
                        1
                    ]
                }
            }
        }
    };
    if (dirId) {
        data.fatherDirId = dirId;
    }
    filterData.forEach((value, index) => {
        const vid = index + 3;
        value.vid = vid;
        data.config.values[vid.toString()] = value;
    });
    return data;
}

export function parseUpdateFilterDir(filterData, dirId) {
    const data = {
        'resType': 'dir',
        'resId': dirId,
        'lang': LANG,
        'data': {
            'id': '',
            'data_prop': {
                'last_vid': 3 + filterData.length,
                'lang': [
                    'zh'
                ],
                'init_lang': 'zh',
                'version': '0.0.0'
            },
            'values': {
                '1': {
                    'fid': 5,
                    'path': {
                        '5': 1
                    },
                    'vid': 1,
                    'value': false
                },
                '2': {
                    'fid': 6,
                    'path': {
                        '6': 1
                    },
                    'vid': 2,
                    'value': [
                        1
                    ]
                }
            }
        }
    };
    filterData.forEach((value, index) => {
        const vid = index + 3;
        value.vid = vid;
        data.data.values[vid.toString()] = value;
    });
    return data;
}
