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

// 连接服务器
// const SERVER_MODE = 'ONLINE_WALLET';
const SERVER_MODE = 'TEST1';
const SERVER_PORT = '8088';
// const SERVER_PORT = '8000';

const SERVER_MAP = {
    LOCAL: 'http://localhost',
    API2SSH: 'https://api2.factube.com',
    API_DATAME: 'http://api.data.me',
    TEST1: 'http://13.112.45.51',
    ONLINE: 'http://52.196.161.219',
    ONLINE_WALLET: 'http://54.250.199.29'
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
    }
}, environment);
