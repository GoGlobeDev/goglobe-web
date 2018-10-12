// 下载中转页

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import './Download.styl';

export default class Download extends Component {
    state: Object = {
        showTip: false
    };
    componentWillMount() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('iphone') > -1) {
            this.setState({
                ios: true
            });
        } else {
            if (ua.indexOf('micromessenger') > -1) {
                this.setState({
                    showTip: true
                });
            }
        }
    }
    // showTip: Function = () => {
        // const ua = navigator.userAgent.toLowerCase();
        // if (ua.indexOf('micromessenger') > -1) {
        //     this.setState({
        //         showTip: true
        //     });
        // } else {
            // const btn = this.refs.download;
            // btn.href = 'http://cdn.fengchao666.com/apk/release/fc-app-release-1.4.apk';
            // btn.click();
        // }
    // }
    render() {
        const iosUrl = '#';
        const androidUrl = 'http://www.goglobechain.com/app/GoGlobeWallet.apk';
        return (
            <div className="download-page height">
                <Helmet>自游俱乐部</Helmet>
                <div>
                    <div className="top">
                        <div className="logo left"><img src={require('img/logo-download.png')} /></div>
                        <div className="left info">
                            <div className="name">自游俱乐部</div>
                            <div className="version">版本号：1.1.1</div>
                            <a href = {this.state.ios ? iosUrl : androidUrl}>app下载</a>
                        </div>
                    </div>
                    <p className="desc">自游俱乐部是一款移动端轻钱包APP，它旨在为普通用户提供一款安全放心，简单好用，功能强大的数字资产钱包应用。</p>
                    <div>
                        <div className="version-intro">版本号：1.1.1</div>
                        <ol>
                            <li>增加了绑定JNB交易所账号的功能</li>
                            <li>优化了在未连接到网络的时候，APP的状态</li>
                            <li>修改bug</li>
                        </ol>
                    </div>
                </div>
                { this.state.showTip
                    && <div className="tip-container">
                        <div className="tip-bg"></div>
                        <div className="tip-text">
                            <div className="curve"><img src={require('img/curve.png')} /></div>
                            <div>若要下载APK，请点击右上角，选择“在浏览器打开”</div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
