import fetch from 'isomorphic-fetch';
import config from 'config.js';
// import { LANG } from 'theme/Lang';

const host = config.apiHost;
const port = config.apiPort;

export function loadStatus() {
    return fetch(host + ':' + port + '/wallet/status', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
}
export function loadWalletData(data) {
    return fetch(host + ':' + port + '/wallet/eth', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
export function loadRecord(data) {
    return fetch(host + ':' + port + '/wallet/eth/record', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
