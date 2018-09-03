
export const LANG = 'zh';

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
    {anchor: '#about', label: {zh: '项目简介', en: 'About us', japan: ''}},
    {anchor: '#files', label: {zh: '白皮书', en: 'White Paper', japan: ''}},
    // {anchor: '#chainData', label: {zh: '链上数据', en: 'ChainData', japan: ''}},
    {anchor: '#team', label: {zh: '团队与支持者', en: 'Team', japan: ''}},
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
        zh: '投资方',
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
        zh: '运营团队',
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
                zh: '在地产、金融、投资领域有着丰富的行业经验。澳大利亚大型地产开发公司VSTAR GROUP 创始人及董事长，该集团旗下拥有澳洲最大的民宿管理公司。澳大利亚最早的比特币投资者，是LITECOIN CASH ，INK，HCASH, DEEP BRAIN CHAIN等多个知名区块链项目的早期投资人与顾问。澳大利亚昆士兰大学信息系统管理硕士，格里菲斯大学市场营销硕士。',
                en: 'An expert in financial investment in real estate market, he is the founder and CEO of a real estate development company that owns the largest B&B management platform in Australia.He was vice-president in Global Education & Technology Co., Ltd (often known as Global Ielts), working on Corporation Listing.',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: 'Howard Li',
                en: 'Howard Li',
                japan: ''
            },
            title: {
                zh: '首席运营官',
                en: 'COO',
                japan: ''
            },
            intro: {
                zh: '十年跨国公司营销管理经验，资深营销培训讲师。前小米生态链汉图科技联合创始人。比特币早期投资者。',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: 'Peter Song',
                en: 'Peter SONG',
                japan: ''
            },
            title: {
                zh: '首席科学家',
                en: 'Chief Scientist',
                japan: ''
            },
            intro: {
                zh: '拥有清华大学本科与硕士学位以及纽约大学的博士学位。表单数据库FormDB与商业通证交易系统BTEx的架构设计师。致力于高性能区块链与可信物联网设备的设计与实现。',
                en: 'He holds B.S. and M.S. from Tsinghua University and Ph.D. from New York University. He has years of experience in database design and development.',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: 'Adam Li',
                en: 'Adam Li',
                japan: ''
            },
            title: {
                zh: '首席技术官',
                en: 'CTO',
                japan: ''
            },
            intro: {
                zh: '毕业于清华大学，曾在埃森哲公司从事咨询工作。数聚变科技联合创始人兼CEO。兼任清华大学中国企业成长与经济安全研究中心研究员、MIT新媒体行动实验室研究员、奇点公益的理事长；致力于在各领域推动开发数据和数据库应用的实践；互联网协作布道师。',
                en: 'Graduated from Tsinghua University, UCAS and Hejun Business School. He started his career at Accenture. He is now the CEO of Data.Me/Factube.com and the president of Singularity Philanthropy Center(NGO).',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: 'George Song',
                en: 'George Song',
                japan: ''
            },
            title: {
                zh: '硬件合伙人',
                en: '',
                japan: ''
            },
            intro: {
                zh: '秀豹科技董事长，黑米科技董事长，连续成功创业者。',
                en: '',
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
                zh: '昆士兰科技大学银行与金融学士。曾在安永澳洲担任战略分析师，参与跨国公司交易业务，例如加拿大皇家银行与戈德曼高盛于能源领域的10亿澳元的交易。此外，马克是AGL区块链智能电网试验的一个成功提案者。',
                en: 'Mark is a trusted business advisor with 8 years’ Management and holds a Bachelor of Business （Banking and Finance）from Queensland University of Technology. Mark has worked with Internationally recognised clients such as the Royal Bank of Canada and Goldman Sachs on a recent $10b+ AUD energy sector transaction. Further to this, Mark was a key contributor in designing a successful proposal for AGL Energy’s blockchain based smart grid trial.',
                japan: ''
            }
        },
        {
            pic: require('img/p5.png'),
            name: {
                zh: 'Yiqing XIE',
                en: 'Yiqing XIE',
                japan: ''
            },
            title: {
                zh: '首席内容官',
                en: 'CMO',
                japan: ''
            },
            intro: {
                zh: '资深媒体人、旅行作家、策展人、“行走的书房”创始人。前《旅游天地》杂志执行主编，出版多种旅游文化书刊，策划多项生活方式刊物、旅游网站及专题电视节目和大型旅行推广项目。',
                en: 'Media professional in China, curator, travel writer. She was executive editor of <Tourism World>, and she publishes a variety of tourist culture books and periodicals, and planned websites and TV shows on tourism',
                japan: ''
            }
        },
        {
            pic: require('img/p2.png'),
            name: {
                zh: 'Chris Hamilton',
                en: 'Chris Hamilton',
                japan: ''
            },
            title: {
                zh: '海外研发主管',
                en: '',
                japan: ''
            },
            intro: {
                zh: '密歇根大学电气与计算机工程学位，多年来一直参与自由与开放源代码软体社区的代码贡献，高性能计算和分布式系统的先驱者，精通硬件和软件设计，微软校友。',
                en: 'Chris holds degrees in Electrical and Computer Engineering from University of Michigan. Decades of contributions to Free and Open Source Software projects Pioneer in high performance computing and distributed systems Expert in both hardware and software design Microsoft alumni',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: 'Chris Zhong',
                en: 'Chris Zhong',
                japan: ''
            },
            title: {
                zh: '技术布道师',
                en: '',
                japan: ''
            },
            intro: {
                zh: '某全球领导地位的科技公司的首席架构师，在澳大利亚拥有丰富行业经验的技术领导者，精通区块链知识并在世界各地的大型会议进行发言。',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/p7.png'),
            name: {
                zh: 'Nick YU',
                en: 'Nick YU',
                japan: ''
            },
            title: {
                zh: '澳洲地区负责人',
                en: '',
                japan: ''
            },
            intro: {
                zh: '澳大利亚中国贸易促进委员会副会长。新世纪国际集团首席执行官（澳大利亚），最大的房地产网络销售平台加生活相关服务的手机APP。公司拥有100名员工和1000多名兼职销售人员，月营业额约为5000万澳元。',
                en: 'Vice President of Australia China Trade & Industry Promotion Council. CEO of iRex - New Century International Group (Australia), and contributed largely in the Real Estate properties sales online platform plus life related services mobile phone app. The company was holding 100+ employees & 1000+ part time sales person with monthly turnover approx. AU$50M.',
                japan: ''
            }
        }
    ]
};

export const ADVISORS = {
    title: {
        zh: '顾问团队',
        en: 'ADVISORS',
        japan: ''
    },
    text: [
        {
            pic: require('img/a0.png'),
            name: {
                zh: '沈寓实',
                en: '',
                japan: ''
            },
            intro: {
                zh: '中国云体系产业创新战略联盟秘书长，云安全联盟（CSA）大中华区秘书长，清华大学互联网产业研究院研究员，世纪互联集团副总裁兼（云）首席技术官。国家“千人计划”特聘专家，北京市“海聚工程”特聘专家，国家“千人计划”、“万人计划”评审专家。拥有中国清华大学电子工程学士学位，美国加州大学圣迭戈分校电子计算机硕士和博士学位，美国华盛顿大学工商管理学硕士学位。',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: '孟岩',
                en: '',
                japan: ''
            },
            intro: {
                zh: '柏链道捷CEO，CSDN 副总裁，中国云体系联盟咨询专家，中关村区块链联盟专家，2017年与元道共同提出“通证经济”概念。“通证经济学”的布道师与权威专家。',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: '程小永',
                en: '',
                japan: ''
            },
            intro: {
                zh: '初链联合创始人。',
                en: '',
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
                zh: '现任携程集团高级副总裁，曾任去哪儿网公司总裁，曾在百度公关传播体系内任职十年，历任百度集团公关经理、公关总监。',
                en: 'Senior vice president of Ctrip Group. CEO of Qunar.com',
                japan: ''
            }
        },
        {
            pic: require('img/a1.png'),
            name: {
                zh: 'Adam Williams',
                en: 'Adam Williams',
                japan: ''
            },
            intro: {
                zh: '英国英慈企业管理咨询有限公司中国区副主席。曾获英女王颁发大英帝国骑士勋章，英国畅销小说家，商人，演讲家。英国牛津大学毕业，中英商会会长、英国怡和集团前中国总代表。',
                en: 'Writer, speaker, businessman and novelist. Chairman of China-Britain Business Council. Honoured by Queen Elizabeth II with Officer of the Most Excellent Order of the British Empire',
                japan: ''
            }
        },
        {
            pic: require('img/a2.png'),
            name: {
                zh: 'WAKAMIYA KIYOSHI',
                en: 'WAKAMIYA KIYOSHI',
                japan: ''
            },
            intro: {
                zh: '现任日本内阁官房副长官顾问。任早稻田大学社会系统共学研究所研究员，日本民主党兵库县副代表，众议院议员。',
                en: 'Deputy representative of the DPJ, Hyogo County, Japan Well-known Japanese journalist and political commentator. Advisor of Tokushukai Medical Group and Nishimura Yasuminori (congressman) firm Member of Asia Pacific Research Association',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: '张兴国',
                en: 'Xingguo Zhang',
                japan: ''
            },
            intro: {
                zh: '锦江国际酒店集团前CIO，中国酒店业信息技术专家委员会理事长、中国智慧酒店副理事长、中国酒店科技联盟（CHTA）首席营运官、千亿级企业CIO俱乐部发起理事等职务。',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: '檀林',
                en: 'Lin Tan',
                japan: ''
            },
            intro: {
                zh: '微软加速器（中国）的CEO。具有丰富的企业软件行业市场、渠道管理和营销管理经验, 既有国际化公司早期进入中国市场的业务发展和本地化产品研发经验，也具备本土创业企业和国际化创业企业的实践经历和早期投资经历。拥有加拿大渥太华大学生物化学和生化工程双学士学位，以及长江商学院EMBA工商管理硕士学位。',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/a10.png'),
            name: {
                zh: 'Zhijie Zhang',
                en: 'Zhijie Zhang',
                japan: ''
            },
            intro: {
                zh: '全球民宿预定平台自在客联合创始人，2013年开始布局中国大陆，中国台湾，韩国和日本民宿市场，让人人可以过一天他乡的生活。自在客是中国最早开展海外民宿预定业务的创业团队。',
                en: 'Founder of Zizaike.com',
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
                zh: 'Yuan LI',
                en: 'Yuan LI',
                japan: ''
            },
            intro: {
                zh: 'Selfsell创始人，世界首个主打个人融资概念的IPO平台。',
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
                zh: '“世界区块链组织首席经济学家，加勒比区块链研究所院长（CIBCI）。',
                en: 'Chief Economist of World Blockchain Organization. President of CIBCI',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: 'David WANG',
                en: 'David Wang',
                japan: ''
            },
            intro: {
                zh: '上海交通大学高级金融学院MBA。曾就职于盛大，IBM，携程等公司，具有多年互联网技术管理经验。2015年和高金校友联合创立国内最大的租约ABS互金平台魔方金服。2013至今曾发表多篇区块链相关文章。2016年中旬创立区块链技术创新公司信数链。区块链行业布道者，在交大财大等多家高校做过区块链培训。2017年中旬带队参加工信部举办的全国首届区块链大赛获得二等奖。',
                en: 'Winner of the 2nd prize in first national blockchain competition which was hold by the Ministry of industry and information.',
                japan: ''
            }
        },
        {
            pic: require('img/a0.png'),
            name: {
                zh: 'Tony Coombs',
                en: 'Tony Coombs',
                japan: ''
            },
            intro: {
                zh: '亚媒资本首席执行官，亚媒资本是澳大利亚注册的影视基金会，其中包括greenlight委员会的好莱坞成员（John J Strauss, Jesse Weiner）以及中国成员。Harvest Pictures Pty Ltd 创始人及导演。Tony 近期促进并主导了澳大利亚电影学院电视艺术协会（AACTA）的亚洲合作计划。',
                en: 'The chairman of the zero point Research Consultancy Group. The founder of the ‘horse brigades’, an Enterprise management services. Sponsor of Youth public welfare support agency ‘black apple’ Dean of Business School of Shanghai. Doctor of sociology at Peking University MPA Harvard University Kennedy government college',
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
            name: {
                zh: '阿波罗',
                en: 'Double',
                japan: ''
            },
            subName: {
                zh: '行业公链模型',
                en: 'Helix Blockchain',
                japan: ''
            },
            intro: {
                zh: '自游链原创的阿波罗行业公链模型，通过一条主链与若干条子链与侧链满足行业内多种真实需求场景。',
                en: "Industry's first Double-Helix ledgers where one chain is optimized for fast settlement and the other is designed with multi-attribute content in mind for superior experience.",
                japan: ''
            }
        },
        {
            pic: require('img/icon-2.png'),
            name: {
                zh: '设备',
                en: '',
                japan: ''
            },
            subName: {
                zh: '共识：可信区块链',
                en: '',
                japan: ''
            },
            intro: {
                zh: '通过可信物联网设备实现旅游行为与旅游交易的真实上链，建立可信的旅游新生态',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/icon-3.png'),
            name: {
                zh: '智能',
                en: 'Smart',
                japan: ''
            },
            subName: {
                zh: '合约引擎',
                en: 'Contract Engine',
                japan: ''
            },
            intro: {
                zh: '高效率的图灵完备的智能合约引擎，满足区块链+旅游行业发展的长期需求',
                en: 'Through the use of Smart Contract, multiparty operations can gain trust; and automation delivers efficiency and reduces dependency on manual labor.',
                japan: ''
            }
        },
        {
            pic: require('img/icon-4.png'),
            name: {
                zh: '探索',
                en: '',
                japan: ''
            },
            subName: {
                zh: '共识：旅行与社交',
                en: '',
                japan: ''
            },
            intro: {
                zh: '通过直接的给予旅游行为激励，自游链还原旅游的原初的目标，让更多人走出家门探索世界，并分享收获与喜悦。',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/icon-5.png'),
            name: {
                zh: '通证',
                en: '',
                japan: ''
            },
            subName: {
                zh: '经济子系统',
                en: '',
                japan: ''
            },
            intro: {
                zh: '每一个商户或平台合作伙伴都可以基于自游链建立自己的通证经济系统，发行产品与服务通证、优惠折扣通证以及自己的品牌积分。',
                en: '',
                japan: ''
            }
        },
        {
            pic: require('img/icon-6.png'),
            name: {
                zh: '旅游',
                en: '',
                japan: ''
            },
            subName: {
                zh: '通证交易所',
                en: '',
                japan: ''
            },
            intro: {
                zh: '所有商户发行的权益通证都可以与GOG进行交易，每个权益都有真正的价值，让用户可以直接获益。为商户带来全新的营销模式。',
                en: '',
                japan: ''
            }
        }
        // {
        //     pic: require('img/icon-7.png'),
        //     name: 'Cross-border',
        //     subName: 'Investment',
        //     intro: {
        //         zh: '',
        //         en: 'Reliable, legal and private ownership of travel assets anywhere in the world, for all users of the Go Globe Chain Platform.',
        //         japan: ''
        //     }
        // }
    ]
};
export const DOWNLOAD = [
    {
        zh: {
            title: '下载一页纸简介',
            vs: '也可获得',
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
            vs: '也可获得',
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
        zh: '自游链',
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
        zh: '自游链是什么',
        en: 'What Is GoGlobe?',
        japan: ''
    },
    describe: [
        {
            pic: require('img/globe-1.png'),
            text: {
                zh: '以{{物联网设备}}为核心的旅游行业公链',
                en: 'A decentralized and {{open-source}} travels',
                japan: ''
            }
        },
        {
            pic: require('img/globe-2.png'),
            text: {
                zh: '鼓励{{旅游行为}}，鼓励{{设备投资}}',
                en: 'Trading and Booking travel products {{easily}}',
                japan: ''
            }
        },
        {
            pic: require('img/globe-3.png'),
            text: {
                zh: '旅游{{通证交易}}所：旅游经营新模式',
                en: 'Cross-border {{highly secure}} travel property investing',
                japan: ''
            }
        }
    ],
    note: [
        {
            zh: '自游链设计了阿波罗区块链模型，支持来自行业的真实需求',
            en: 'Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping.',
            japan: ''
        },
        {
            zh: '自游链支持每个商户与新型平台建立自己的通证经济系统',
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
    zh: ['世界', '旅游', '新生态'],
    en: ['redefine', 'the travel', 'distribution', 'landscape'],
    japan: []
};
export const WEBTITLE = {
    zh: '自游链 | 世界旅游新生态',
    en: 'Go Globe Chain | Redefine The Travel Diatribution Landscape',
    japan: ''
};
export const CHAINDATA = {
    search: {
        placeholder: {
            zh: '搜索地址',
            en: 'search address',
            japan: ''
        },
        button: {
            zh: '搜索',
            en: 'search',
            japan: ''
        }
    },
    data: [
        {
            src: require('img/miner.png'),
            name: {
                zh: '全网矿机数量',
                en: '',
                japan: ''
            }
        },
        {
            src: require('img/calculate.png'),
            name: {
                zh: '全网算力',
                en: '',
                japan: ''
            }
        },
        {
            src: require('img/output.png'),
            name: {
                zh: '每日GOG 总产出',
                en: '',
                japan: ''
            }
        }
    ]
};
export const AIRDROP = {
    activityOver: {
        zh: '活动已结束',
        en: 'The activity is over!',
        Japan: ''
    },
    airTip: {
        zh: '输入你的以太坊地址可以免费获得200个GOG',
        en: 'Enter your ETH address to get 200 free GOG',
        Japan: ''
    },
    submit: {
        zh: '提交',
        en: 'submit',
        japan: ''
    },
    placeholderAddr: {
        zh: '请输入您的以太坊地址',
        en: 'Enter your ETH address',
        japan: ''
    },
    invited: {
        zh: '邀请链接',
        en: 'invited link',
        japan: ''
    },
    verify: {
        zh: '您需要通过验证您的手机号来激活您的账户。',
        en: 'You need to verify your phone to unlock your account.',
        japan: ''
    },
    alert: {
        zh: '未激活的账户无法进行空投！',
        en: 'No airdrop for locked account!',
        japan: ''
    },
    placeholderPhone: {
        zh: '请输入您的手机号',
        en: 'Enter your phone',
        japan: ''
    },
    placeholderCode: {
        zh: '请输入验证码',
        en: 'Enter the code',
        japan: ''
    },
    send: {
        zh: '发送验证码',
        en: 'Send code',
        japan: ''
    },
    sended: {
        zh: '已发送...',
        en: 'Sended...',
        japan: ''
    },
    validBtn: {
        zh: '激活',
        en: 'Active',
        japan: ''
    },
    valided: {
        zh: '您的手机号:',
        en: 'Your phone:',
        japan: ''
    },
    validStatus: {
        zh: '您的账户已激活',
        en: 'Your account is activated.',
        japan: ''
    },
    received: {
        zh: '共获得',
        en: 'Received',
        japan: ''
    },
    verifyStatus: {
        goBack: {
            zh: '返回首页',
            en: 'Back to Homepage',
            japan: ''
        },
        status: {
            good: {
                zh: '非常棒！',
                en: 'Good!',
                japan: ''
            },
            sorry: {
                zh: '对不起！',
                en: 'SORRY!',
                japan: ''
            },
            oops: {
                zh: '哎呦！',
                en: 'OOPS!',
                japan: ''
            }
        },
        tips: {
            good: {
                zh: '您的手机号已验证成功！',
                en: 'Your phone is verified successfully!',
                japan: ''
            },
            sorry: {
                zh: '您的手机号已完成验证！',
                en: 'You have already verified your phone!',
                japan: ''
            },
            oops: {
                zh: '验证链接不合法！',
                en: 'The verification link is invilid!',
                japan: ''
            }
        }
    },
    heartTip: {
        zh: '您所获得的GOG将在活动之后统一发放',
        en: 'The GOG you receive will be released after the event.',
        japan: ''
    }
};
