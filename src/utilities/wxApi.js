/* eslint-disable */
import fetch from 'isomorphic-fetch';
import { apiServer } from 'config';

function getWxSign(url) {
    const xtoken = window.localStorage.getItem('x-auth-token');
    return fetch(apiServer + '/dbc/api/wechat/sign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': xtoken
        },
        body: JSON.stringify({
            'url': url
        })
    });
}

export function wxShare(details) {
    const ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        const url = location.href.split('#')[0];
        getWxSign(url)
        .then(response => response.json())
        .then((data) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx842aad37a02d49d5', // 必填，公众号的唯一标识
                timestamp: data.json.timestamp.toString(), // 必填，生成签名的时间戳
                nonceStr: data.json.nonceStr, // 必填，生成签名的随机串
                signature: data.json.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(() => {
                // 分享到朋友圈
                wx.onMenuShareTimeline({
                    title: details.title, // + '-Go Globe' 分享标题
                    link: data.json.url, // 分享链接
                    imgUrl: details.docImg, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                // 分享给朋友
                wx.onMenuShareAppMessage({
                    title: details.title, // + '-Go Globe' 分享标题
                    desc: details.intro ? details.intro : data.json.url, // 分享描述
                    link: data.json.url, // 分享链接
                    imgUrl: details.docImg, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.error((res) => {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    console.log("errorMSG:"+JSON.stringify(res));
                });
            });
        });
    }
}
