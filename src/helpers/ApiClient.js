import fetch from 'isomorphic-fetch';
import config from '../config';
import cookie from 'react-cookie';
const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/dbc/api/' + path : '/dbc/api' + path;
    // Prepend host and port of the API server to the path.
    return config.apiHost + ':' + config.apiPort + adjustedPath;
}

function getXAuthToken(cookieStr) {
    if (cookieStr) {
        const cookieArray = cookieStr.split(';');
        let xAuthToken = '';
        for (let index = 0; index < cookieArray.length; index++) {
            if (cookieArray[index].indexOf('x-auth-token=') !== -1) {
                xAuthToken = cookieArray[index].split('=')[1];
                break;
            }
        }
        return xAuthToken;
    }
    return null;
}
export default class ApiClient {
    constructor(req) {
        methods.forEach((method) =>
            this[method] = (path, { header, data } = {}) => {
                const url = formatUrl(path);
                const body = JSON.stringify(data);
                const xtoken = __SERVER__ ? getXAuthToken(req.get('cookie')) : window.localStorage.getItem('x-auth-token');
                header['x-auth-token'] = xtoken;
                return fetch(url, {
                    method: method,
                    headers: header,
                    body: body
                }).then((response) => {
                    if (response.ok) {
                        if (path === '/login' && __CLIENT__) {
                            window.localStorage.setItem('x-auth-token', response.headers.get('x-auth-token'));
                            cookie.save('x-auth-token', response.headers.get('x-auth-token'), {
                                maxAge: 30 * 24 * 3600
                            });
                        }
                        if (path === '/account/register' && __CLIENT__) {
                            window.localStorage.setItem('x-auth-token', response.headers.get('x-auth-token'));
                            cookie.save('x-auth-token', response.headers.get('x-auth-token'), {
                                maxAge: 30 * 24 * 3600
                            });
                        }
                        if (path === '/loginbywechat' && __CLIENT__) {
                            window.localStorage.setItem('x-auth-token', response.headers.get('x-auth-token'));
                            cookie.save('x-auth-token', response.headers.get('x-auth-token'), {
                                maxAge: 30 * 24 * 3600
                            });
                        }
                        if (path === '/usersession' && __CLIENT__) {
                            cookie.save('x-auth-token', window.localStorage.getItem('x-auth-token'), {
                                maxAge: 30 * 24 * 3600
                            });
                        }
                        if (path === '/logout' && __CLIENT__) {
                            cookie.remove('x-auth-token');
                        }
                        return Promise.resolve(response.json());
                    }
                    return Promise.reject(new Error(response.status));
                });
            });
    }
    /*
    * There's a V8 bug where, when using Babel, exporting classes with only
    * constructors sometimes fails. Until it's patched, this is a solution to
    * "ApiClient is not defined" from issue #14.
    * https://github.com/erikras/react-redux-universal-hot-example/issues/14
    *
    * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
    *
    * Remove it at your own risk.
    */
    empty() { }
}
