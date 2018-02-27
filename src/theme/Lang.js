
export const LANG = 'en';

// export const NAV_BAR = [
//     {anchor: '#home', label: 'Home'},
//     // {anchor: '#event', label: 'Event'},
//     {anchor: '#about', label: 'About us'},
//     // {anchor: '#files', label: 'One Pager'},
//     {anchor: '#files', label: 'White Paper'},
//     // {anchor: '#features', label: 'Features'},
//     {anchor: '#partners', label: 'Partners'},
//     {anchor: '#team', label: 'Team'},
//     {anchor: '#contact', label: 'Contact'}
// ];
export const NAV_BAR = [
    {anchor: '#home', label: {zh: '首页', en: 'home', japan: ''}},
    {anchor: '#about', label: {zh: '关于我们', en: 'About us', japan: ''}},
    {anchor: '#files', label: {zh: '白皮书', en: 'White Paper', japan: ''}},
    {anchor: '#partners', label: {zh: '合作伙伴', en: 'Partners', japan: ''}},
    {anchor: '#team', label: {zh: '团队', en: 'Team', japan: ''}},
    {anchor: '#contact', label: {zh: '联系我们', en: 'Contact', japan: ''}}
];

export const PARTNERS = {
    title: {
        zh: '合作伙伴',
        en: 'PARTNERS',
        japan: ''
    },
    imgs: [
        {pic: require('img/ptn1.jpg')},
        {pic: require('img/ptn2.jpg')},
        {pic: require('img/ptn3.jpg')},
        {pic: require('img/ptn4.jpg')},
        {pic: require('img/ptn5.jpg')},
        {pic: require('img/ptn6.jpg')},
        {pic: require('img/ptn7.jpg')},
        {pic: require('img/ptn8.jpg')},
        {pic: require('img/ptn9.jpg')},
        {pic: require('img/ptn10.jpg')},
        {pic: require('img/ptn11.jpg')},
        {pic: require('img/ptn12.jpg')},
        {pic: require('img/ptn13.jpg')},
        {pic: require('img/ptn14.jpg')},
        {pic: require('img/ptn15.jpg')},
        {pic: require('img/ptn16.jpg')},
        {pic: require('img/ptn17.jpg')},
        {pic: require('img/ptn18.jpg')}
    ]
};
export const INVESTORS = {
    title: {
        zh: '',
        en: 'INVESTORS',
        japan: ''
    },
    text: [
        {
            pic: require('img/invester_01.jpg'),
            intro: {
                zh: '莱特币现金基金会',
                en: 'Litecoin Cash Foundation',
                japan: ''
            }
        },
        {
            pic: require('img/invester_02.jpg'),
            intro: {
                zh: '深脑链基金会',
                en: 'Deep Brain Chain Foundation',
                japan: ''
            }
        },
        {
            pic: require('img/invester_03.jpg'),
            intro: {
                zh: 'Selfsell 基金会',
                en: 'Selfsell Foundation',
                japan: ''
            }
        },
        {
            pic: require('img/invester_04.jpg'),
            intro: {
                zh: 'Vstar Group',
                en: 'Vstar Group',
                japan: ''
            }
        },
        {
            pic: require('img/invester_05.jpg'),
            intro: {
                zh: '绿野资本',
                en: 'Greenfield Capital Group',
                japan: ''
            }
        },
        {
            pic: require('img/invester_06.jpg'),
            intro: {
                zh: '加勒比自由贸易区',
                en: 'Caribbean Free Trade Association',
                japan: ''
            }
        },
        {
            pic: require('img/invester_07.jpg'),
            intro: {
                zh: '世界区块链组织',
                en: 'World Blockchain Organization',
                japan: ''
            }
        },
        {
            pic: require('img/invester_08.jpg'),
            intro: {
                zh: '澳大利亚科银资本',
                en: 'Collin Star Capital',
                japan: ''
            }
        },
        {
            pic: require('img/invester_09.jpg'),
            intro: {
                zh: '加勒比区块链研究院',
                en: 'Caribbean Institude of Blockchain Industry',
                japan: ''
            }
        },
        {
            pic: require('img/invester_10.jpg'),
            intro: {
                zh: '北大纵横',
                en: 'ALLPKU Management',
                japan: ''
            }
        }
    ]
};
export const CONTACT = {
    title: {
        zh: '联系我们',
        en: 'CONTACT US',
        japan: ''
    },
    CONTACT_ICONS_GRAY: [
        {pic: require('img/twittergray.png')},
        {pic: require('img/twitterbgray.png')},
        {pic: require('img/facebookgray.png')}
    ],
    CONTACT_ICONS_WHITE: [
        {pic: require('img/twitterwhite.png')},
        {pic: require('img/twitterbwhite.png')},
        {pic: require('img/facebook.png')}
    ]
};
// export const CONTACT_ICONS_GRAY = [
//     {pic: require('img/twittergray.png')},
//     {pic: require('img/twitterbgray.png')},
//     {pic: require('img/facebookgray.png')}
// ];
// export const CONTACT_ICONS_WHITE = [
//     {pic: require('img/twitterwhite.png')},
//     {pic: require('img/twitterbwhite.png')},
//     {pic: require('img/facebook.png')}
// ];
export const TEAM = {
    title: {
        zh: '团队',
        en: 'TEAM',
        japan: ''
    },
    text: [
        {
            pic: require('img/p1.png'),
            name: {
                zh: '高宇',
                en: 'David GAO',
                japan: ''
            },
            title: {
                zh: '首席执行官',
                en: 'CEO',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'An expert in financial investment in real estate market, he is the founder and CEO of a real estate development company that owns the largest B&B management platform in Australia.He was vice-president in Global Education & Technology Co., Ltd (often known as Global Ielts), working on Corporation Listing.',
                japan: ''
            }
        },
        {
            pic: require('img/p2.png'),
            name: {
                zh: '',
                en: 'Chris Hamilton',
                japan: ''
            },
            title: {
                zh: '首席技术官',
                en: 'CTO',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Chris holds degrees in Electrical and Computer Engineering from University of Michigan. Decades of contributions to Free and Open Source Software projects Pioneer in high performance computing and distributed systems Expert in both hardware and software design Microsoft alumni',
                japan: ''
            }
        },
        {
            pic: require('img/p3.png'),
            name: {
                zh: 'Mark RIDDLE',
                en: 'Mark RIDDLE',
                japan: ''
            },
            title: {
                zh: '首席财务官',
                en: 'CFO',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Mark is a trusted business advisor with 8 years’ Management and holds a Bachelor of Business （Banking and Finance）from Queensland University of Technology. Mark has worked with Internationally recognised clients such as the Royal Bank of Canada and Goldman Sachs on a recent $10b+ AUD energy sector transaction. Further to this, Mark was a key contributor in designing a successful proposal for AGL Energy’s blockchain based smart grid trial.',
                japan: ''
            }
        },
        {
            pic: require('img/p4.png'),
            name: {
                zh: '',
                en: 'Tony Coombs',
                japan: ''
            },
            title: {
                zh: '',
                en: 'CMO',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'CEO of Asia Media Capital, an Australian domiciled Film Fund comprising Greenlight Committee members from both Hollywood (John J Strauss, Jesse Weiner) and China. A founder and director of Harvest Pictures Pty Ltd, a newly formed production company that will produce a range of genre feature films. As an active practitioner, Tony recently has facilitated and lead the Australian Academy of Cinema Television and the Arts (AACTA) Asian Engagement Program.',
                japan: ''
            }
        },
        {
            pic: require('img/p5.png'),
            name: {
                zh: '',
                en: 'Yiqing XIE',
                japan: ''
            },
            title: {
                zh: '',
                en: 'CCO',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Media professional in China, curator, travel writer. She was executive editor of <Tourism World>, and she publishes a variety of tourist culture books and periodicals, and planned websites and TV shows on tourism',
                japan: ''
            }
        },
        {
            pic: require('img/p6.png'),
            name: {
                zh: '',
                en: 'Chris Zhong',
                japan: ''
            },
            title: {
                zh: '',
                en: 'Technology Leader',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'A passionate technology leader with extensive industry experience in Australia.The lead architect in a major global technology firm.She has deep knowledge in Blockchain and speaks at various conferences across the globe.',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: '李昂达',
                en: 'Adam Lee',
                japan: ''
            },
            title: {
                zh: '首席科学家',
                en: 'Chief Scientist',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Graduated from Tsinghua University, UCAS and Hejun Business School. He started his career at Accenture. He is now the CEO of Data.Me/Factube.com and the president of Singularity Philanthropy Center(NGO).',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: '宋鹏程',
                en: 'Peter SONG',
                japan: ''
            },
            title: {
                zh: '',
                en: 'R&D leader',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'He holds B.S. and M.S. from Tsinghua University and Ph.D. from New York University. He has years of experience in database design and development.',
                japan: ''
            }
        },
        {
            pic: require('img/p7.png'),
            name: {
                zh: '',
                en: 'Nick YU',
                japan: ''
            },
            title: {
                zh: '市场总监（海外）',
                en: 'Marketing director (overseas)',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Vice President of Australia China Trade & Industry Promotion Council. CEO of iRex - New Century International Group (Australia), and contributed largely in the Real Estate properties sales online platform plus life related services mobile phone app. The company was holding 100+ employees & 1000+ part time sales person with monthly turnover approx. AU$50M.',
                japan: ''
            }
        }
    ]
};

export const ADVISORS = {
    title: {
        zh: '',
        en: 'ADVISORS',
        japan: ''
    },
    text: [
        {
            pic: require('img/a1.png'),
            name: {
                zh: '',
                en: 'Adam Williams',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Writer, speaker, businessman and novelist. Chairman of China-Britain Business Council. Honoured by Queen Elizabeth II with Officer of the Most Excellent Order of the British Empire',
                japan: ''
            }
        },
        {
            pic: require('img/a2.png'),
            name: {
                zh: '',
                en: 'Wakamiya Kiyoshi',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Deputy representative of the DPJ, Hyogo County, Japan Well-known Japanese journalist and political commentator. Advisor of Tokushukai Medical Group and Nishimura Yasuminori (congressman) firm Member of Asia Pacific Research Association',
                japan: ''
            }
        },
        {
            pic: require('img/a3.png'),
            name: {
                zh: '',
                en: 'Yue Yuan',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'The chairman of the zero point Research Consultancy Group. The founder of the ‘horse brigades’, an Enterprise management services. Sponsor of Youth public welfare support agency ‘black apple’ Dean of Business School of Shanghai. Doctor of sociology at Peking University MPA Harvard University Kennedy government college',
                japan: ''
            }
        },
        {
            pic: require('img/a4.png'),
            name: {
                zh: '杨海俊',
                en: 'Haijun Yang',
                japan: ''
            },
            intro: {
                zh: '携程集团高级副总裁，去哪儿网公司总裁',
                en: 'Senior vice president of Ctrip Group. CEO of Qunar.com',
                japan: ''
            }
        },
        {
            pic: require('img/a5.png'),
            name: {
                zh: '缪可言',
                en: 'Keyan Miao',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Early “miner” of Bitcoin in China Founder of Litecoin Cash and Community Early Investor of ENT Cash',
                japan: ''
            }
        },
        {
            pic: require('img/a6.png'),
            name: {
                zh: '何勇',
                en: 'Yong He',
                japan: ''
            },
            intro: {
                zh: '深脑链创始人',
                en: 'Founder of DeepBrain Chain',
                japan: ''
            }
        },
        {
            pic: require('img/a7.png'),
            name: {
                zh: '',
                en: 'Yuan LI',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Founder of Selfsell The world’s 1st IPO platform in personal financing',
                japan: ''
            }
        },
        {
            pic: require('img/a8.png'),
            name: {
                zh: 'Frank Zheng',
                en: 'Frank Zheng',
                japan: ''
            },
            intro: {
                zh: '“世界区块链组织首席经济学家，加勒比区块链研究所院长',
                en: 'Chief Economist of World Blockchain Organization. President of CIBCI',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: '',
                en: 'Kawazoe Yukimasa',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Currently working in consulting company (Estate Shanghai) that provides all-rounded support and counsel for Japanese corporations seeking to break into the Chinese market, he has made major contributions to its initial success and guided the company to a stronghold position. His years of experience in the hospitality and real estate industry has also build up a strong network of contacts across East Asia.',
                japan: ''
            }
        },
        {
            pic: require('img/a10.png'),
            name: {
                zh: '',
                en: 'Zhijie Zhang',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Founder of Zizaike.com',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: '',
                en: 'David Wang',
                japan: ''
            },
            intro: {
                zh: '',
                en: 'Winner of the 2nd prize in first national blockchain competition which was hold by the Ministry of industry and information.',
                japan: ''
            }
        }
    ]
};
export const FEATURES = {
    title: {
        zh: '特征',
        en: 'FEATURES',
        japan: ''
    },
    text: [
        {
            pic: require('img/icon-1.png'),
            name: 'Double',
            subName: 'Helix Blockchain',
            intro: {
                zh: '',
                en: "Industry's first Double-Helix ledgers where one chain is optimized for fast settlement and the other is designed with multi-attribute content in mind for superior experience.",
                japan: ''
            }
        },
        {
            pic: require('img/icon-2.png'),
            name: 'Brand',
            subName: 'Token',
            intro: {
                zh: '',
                en: "Ability to issue one's unique branded token, function like points and distribute these branded tokens to targeted customers, to facilitate the growth of business.",
                japan: ''
            }
        },
        {
            pic: require('img/icon-3.png'),
            name: 'Smart',
            subName: 'Contract Engine',
            intro: {
                zh: '',
                en: 'Through the use of Smart Contract, multiparty operations can gain trust; and automation delivers efficiency and reduces dependency on manual labor.',
                japan: ''
            }
        },
        {
            pic: require('img/icon-4.png'),
            name: 'My',
            subName: 'Property',
            intro: {
                zh: '',
                en: 'Each user will be able to participate in global travel industry projects, and every business owner and entrepreneur would have access to a global pool of resources without intermediaries required.',
                japan: ''
            }
        },
        {
            pic: require('img/icon-5.png'),
            name: 'My',
            subName: 'Inventory',
            intro: {
                zh: '',
                en: 'Ownership of data by users, coupled with mechanisms to manage owned data, is the beginning of reversing this business model.',
                japan: ''
            }
        },
        {
            pic: require('img/icon-6.png'),
            name: 'Social',
            subName: '',
            intro: {
                zh: '',
                en: 'With applications available on the Go Globe Chain Platform, travelers can show & tell, in real time, photographs and sound bites during the trip.',
                japan: ''
            }
        },
        {
            pic: require('img/icon-7.png'),
            name: 'Cross-border',
            subName: 'Investment',
            intro: {
                zh: '',
                en: 'Reliable, legal and private ownership of travel assets anywhere in the world, for all users of the Go Globe Chain Platform.',
                japan: ''
            }
        }
    ]
};
export const DOWNLOAD = [
    {
        zh: {
            title: '',
            vs: '也可在',
            lang: ['中文', '英文', '日本语']
        },
        en: {
            title: 'DOWNLOAD THE ONE PAGER',
            vs: 'ALSO AVAILABLE IN',
            lang: ['Chinese', 'English', 'Japanese']
        },
        japan: {
            title: '',
            vs: '',
            lang: ['中国語', '英語', '日本語']
        }
    },
    {
        zh: {
            title: '下载白皮书',
            vs: '也可在',
            lang: ['中文', '英文', '日本语']
        },
        en: {
            title: 'DOWNLOAD THE WHITE PAGER',
            vs: 'ALSO AVAILABLE IN',
            lang: ['Chinese', 'English', 'Japanese']
        },
        japan: {
            title: '',
            vs: '',
            lang: ['中国語', '英語', '日本語']
        }
    }
];
export const BANNER = {
    title: {
        zh: '区块链',
        en: 'GO GLOBE',
        japan: ''
    },
    lBtn: {
        zh: '观看视频',
        en: 'WATCH VIDEO',
        japan: ''
    },
    rBtn: {
        zh: '联系我们',
        en: 'CONTACT US',
        japan: ''
    },
    more: {
        zh: '了解更多',
        en: 'LEARN MORE',
        japan: ''
    }
};
export const FOOTER = {
    addr: {
        title: {
            zh: '地址',
            en: 'ADDRESS',
            japan: ''
        },
        street: {
            zh: '皇后街 502/190',
            en: '502/190 Queen Street',
            japan: ''
        },
        city: {
            zh: '墨尔本，澳大利亚',
            en: 'Melbourne, Australia',
            japan: ''
        }
    },
    contact: {
        title: {
            zh: '联系我们',
            en: 'CONTACT US',
            japan: ''
        },
        email: {
            zh: '邮箱：info@goglobechain.com',
            en: 'E-mail: info@goglobechain.com',
            japan: ''
        },
        join: {
            zh: '加入以下平台进行讨论',
            en: 'Join the discussion on the channels below',
            japan: ''
        }
    }
};
export const GOGLOBE = {
    title: {
        zh: '什么是区块链',
        en: 'What Is GoGlobe?',
        japan: ''
    },
    describe: [
        {
            pic: require('img/globe-1.png'),
            text: {
                zh: '',
                en: 'A decentralized and {{open-source}} travels',
                japan: ''
            }
        },
        {
            pic: require('img/globe-2.png'),
            text: {
                zh: '',
                en: 'Trading and Booking travel products {{easily}}',
                japan: ''
            }
        },
        {
            pic: require('img/globe-3.png'),
            text: {
                zh: '',
                en: 'Cross-border {{highly secure}} travel property investing',
                japan: ''
            }
        }
    ],
    note: [
        {
            zh: '',
            en: 'Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping.',
            japan: ''
        },
        {
            zh: '',
            en: 'Go Globe provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly.',
            japan: ''
        }
    ],
    video: {
        zh: '观看视频',
        en: 'watch video',
        japan: ''
    }
};
export const ABOUT = {
    zh: [],
    en: ['redefine', 'the travel', 'distribution', 'landscape'],
    japan: []
};
export const WEBTITLE = {
    zh: '',
    en: 'Go Globe Chain | Redefine The Travel Diatribution Landscape',
    japan: ''
};
