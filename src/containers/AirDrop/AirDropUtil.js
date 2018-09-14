// Airdrop utils by zy on 2018.3.5

import fetch from 'isomorphic-fetch';
// import config from 'config.js';

const host = 'http://52.196.161.219';
const port = '8000';

// 更新用户信息
export function asyncLogin(data) {
    const xtoken = window.localStorage.getItem('x-auth-token');
    return fetch(host + ':' + port + '/airdrop/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': xtoken
        },
        body: JSON.stringify(data)
    });
}
export function asyncSendCode(data) {
    const xtoken = window.localStorage.getItem('x-auth-token');
    return fetch(host + ':' + port + '/airdrop/send/code', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': xtoken
        },
        body: JSON.stringify(data)
    });
}
export function asyncActive(data) {
    const xtoken = window.localStorage.getItem('x-auth-token');
    return fetch(host + ':' + port + '/airdrop/active/account', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': xtoken
        },
        body: JSON.stringify(data)
    });
}
export function loadBalance(data) {
    const xtoken = window.localStorage.getItem('x-auth-token');
    return fetch(host + ':' + port + '/airdrop/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': xtoken
        },
        body: JSON.stringify(data)
    });
}