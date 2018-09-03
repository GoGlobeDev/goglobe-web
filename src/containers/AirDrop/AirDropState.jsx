// 空投状态页  zhaoyue
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormControl, Button } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import { browserHistory } from 'react-router';
import moment from 'moment';

import { WEBTITLE, LANG, AIRDROP } from 'theme/Lang';
import { asyncSendCode, asyncActive, loadBalance } from './AirDropUtil.js';

export default class AirDropState extends Component {

    static propTypes = {
        params: PropTypes.object
    };
    state: Object = {
        phone: '',
        code: '',
        itemArr: [],
        seconds: 0
    };
    componentWillMount() {
        let itemArr = [];
        if (__CLIENT__) {
            const qs = location.search.length > 0 ? location.search.substring(1) : '';
            const items = qs.length > 0 ? qs.split('&') : [];
            itemArr = items.map((item) => {
                return decodeURIComponent(item.split('=')[1]);
            });
            this.setState({
                itemArr: itemArr
            });
            const data = {
                code: itemArr[1]
            };
            loadBalance(data).then(response => response.json()).then((res) => {
                this.setState({
                    balance: res.user.money
                });
            });
        }
    }
    changeCode: Function = (evt) => {
        this.setState({
            code: evt.target.value
        });
    }
    _tick: Function = (flag) => {
        const now = moment().unix();
        this.setState({ seconds: (flag - now + 1), sended: false });
        if (now > flag) {
            this.setState({ sended: false, seconds: 0 });
            this.forceUpdate();
        } else if (this.state.seconds) {
            setTimeout(() => this._tick(flag), 1000);
        }
    }
    // 发送验证码
    clickToSendCode: Function = (account) => {
        if (this.state.phone) {
            const data = {
                account: account,
                phone: this.state.phone
            };
            this.setState({ sended: true });
            asyncSendCode(data).then(response => response.json()).then((res) => {
                if (res.status === 'success') {
                    const now = moment().unix();
                    return setTimeout(() => this._tick(now + 60), 1000);
                }
            });
        }
    }
    // 激活账号
    clickToValid: Function = (account) => {
        if (this.state.phone) {
            const data = {
                account: account,
                code: this.state.code
            };
            asyncActive(data).then(response => response.json()).then((res) => {
                browserHistory.replace('/airdrop/active/' + res.status);
            });
        }
    }
    renderSendCode: Function = (itemArr) => {
        // 已发送
        if (this.state.sended) {
            return (<Button>{AIRDROP.sended[LANG]}</Button>);
        } else if (this.state.seconds) {
            return (<Button>{this.state.seconds}s</Button>);
        }
        return (<Button onClick={() => this.clickToSendCode(itemArr[0])}>{AIRDROP.send[LANG]}</Button>);
    }
    render() {
        const { itemArr, balance } = this.state;
        return (
            itemArr.length > 0
                ? <div className="air-drop height">
                    <Helmet>
                        <title>{WEBTITLE[LANG]}</title>
                        <meta name="description" content="Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping. Go Globe also provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly." />
                        <meta keyword="goglobe travel" />
                    </Helmet>
                    <div className="center-form">
                        <div className="air-state-logo">
                            { LANG === 'en'
                                ? <img className="logo3" src={require('img/logo4.png')} />
                                : <span className="logo-text"><img className="logo1" src={require('img/logo1.png')} />自游链：世界旅游新生态</span>
                            }
                        </div>
                        <div className="block">
                            <p>{AIRDROP.invited[LANG]}</p>
                            <FormControl type="text" value={'http://goglobechain.com/airdrop?code=' + itemArr[1]} className="has-value" readOnly />
                        </div>
                        { Number(itemArr[2]) === 0
                            ? <div className="block">
                                <p>{AIRDROP.verify[LANG]} <span className="red">{AIRDROP.alert[LANG]}</span></p>
                                {/* <PhoneInput
                                    placeholder={AIRDROP.placeholderPhone[LANG]}
                                    value={ this.state.phone }
                                    onChange={ phone => this.setState({ phone }) }
                                    className={this.state.phone ? 'has-value' : ''} /> */}
                                <FormControl type="text" placeholder={AIRDROP.placeholderPhone[LANG]} value={ this.state.phone } onChange={ evt => this.setState({ phone: evt.target.value }) } className="phone" />
                                <div className="code-box">
                                    <FormControl type="text" placeholder={AIRDROP.placeholderCode[LANG]} value={this.state.code} onChange={(evt) => this.changeCode(evt)} className="code" />
                                    {/* <Button onClick={() => this.clickToSendCode(itemArr[0])}>{AIRDROP.send[LANG]}</Button> */}
                                    {this.renderSendCode(itemArr)}
                                </div>
                                <Button onClick={() => this.clickToValid(itemArr[0])} className="valid-btn">{AIRDROP.validBtn[LANG]}</Button>
                            </div>
                            : <div className="block">
                                {/* <p>{AIRDROP.valided[LANG]}</p>
                                <FormControl type="text" value={itemArr[3] ? itemArr[3] : ''} className="has-value" readOnly /> */}
                                <p className="green">{AIRDROP.validStatus[LANG]}</p>
                            </div>
                        }
                        <div className="form-footer">
                            {AIRDROP.received[LANG]} <span className="red">{balance ? balance : 0}</span> GOG
                        </div>
                        <div className="heart-tip">{AIRDROP.heartTip[LANG]}</div>
                    </div>
                    <div className="pos cloud-l1"><img src={require('img/cloud-l1.png')} /></div>
                    <div className="pos cloud-l2"><img src={require('img/cloud-l2.png')} /></div>
                    <div className="pos tree-l"><img src={require('img/tree-l.png')} /></div>
                    <div className="pos hot-ball"><img src={require('img/hot-ball.png')} /></div>
                    <div className="pos cloud-r1"><img src={require('img/cloud-r1.png')} /></div>
                    <div className="pos cloud-r2"><img src={require('img/cloud-r2.png')} /></div>
                    <div className="pos sun"><img src={require('img/sun.png')} /></div>
                    <div className="pos tree-r"><img src={require('img/tree-r.png')} /></div>
                    <div className="pos car"><img src={require('img/car.png')} /></div>
                </div>
                : null
        );
    }
}
