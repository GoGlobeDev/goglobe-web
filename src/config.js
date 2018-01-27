// 配置文件
require('babel-polyfill');

const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true
    }
}[process.env.NODE_ENV || 'development'];

// 连接服务器 #王玉锋 2016.6.15
const SERVER_MODE = 'API2SSH';
// const SERVER_MODE = 'TEST1';
const SERVER_PORT = '443';
// const SERVER_PORT = '8088';

const SERVER_MAP = {
    LOCAL: 'http://localhost',
    API2SSH: 'https://api2.factube.com',
    API_DATAME: 'http://api.data.me',
    TEST1: 'http://test.factube.com',
    TEST2: 'http://test2.factube.com'
};

// 不同环境的精选列表详情库(目前相同)
const PICKLIST_BASE_MAP = {
    API2SSH: '59b75028ed8c44b4002f3676',
    API_DATAME: '59b75028ed8c44b4002f3676',
    TEST1: '59b75028ed8c44b4002f3676',
    TEST2: '59b75028ed8c44b4002f3676'
};

module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: SERVER_MAP[SERVER_MODE] || 'localhost',
    apiPort: SERVER_PORT,
    apiServer: SERVER_MAP[SERVER_MODE] + ':' + SERVER_PORT,
    app: {
        title: 'Go Globe',
        description: '更好用的表单工具',
        head: {
            titleTemplate: '%s',
            meta: [
                { charset: 'utf-8' },
                { property: 'og:image:width', content: '200' },
                { property: 'og:image:height', content: '200' }
            ]
        }
    },
    // 不同环境的精选列表详情库
    picklistBaseId: PICKLIST_BASE_MAP[SERVER_MODE]
}, environment);
