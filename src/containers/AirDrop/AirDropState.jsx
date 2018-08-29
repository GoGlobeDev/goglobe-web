// 空投状态页  zhaoyue
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormControl, Button } from 'react-bootstrap';

import { WEBTITLE, LANG, AIRDROP } from 'theme/Lang';
import { asyncSendEmail } from './AirDropUtil.js';

export default class AirDropState extends Component {

    static propTypes = {
        params: PropTypes.object
    };
    state: Object = {
        phone: ''
    };
    changeEmail: Function = (evt) => {
        this.setState({ phone: evt.target.value });
    }
    // 发送邮件激活账号
    clickToSendEmail: Function = (account) => {
        if (this.state.phone) {
            const email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (email.test(this.state.email)) {
                const data = {
                    account: account,
                    email: this.state.email
                };
                asyncSendEmail(data);
            }
        }
    }
    render() {
        let itemArr = [];
        if (__CLIENT__) {
            const qs = location.search.length > 0 ? location.search.substring(1) : '';
            const items = qs.length > 0 ? qs.split('&') : [];
            itemArr = items.map((item) => {
                return decodeURIComponent(item.split('=')[1]);
            });
        }
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
                            {/* <img src={require('img/logo4.png')} /> */}
                            <img className="logo1" src={require('img/logo1.png')} />
                            { LANG === 'en'
                                ? <img className="logo3" src={require('img/logo3.png')} />
                                : <div className="logo3 logo-text">自游链：世界旅游新生态</div>
                            }
                        </div>
                        <div className="block">
                            <p>{AIRDROP.invited[LANG]}</p>
                            <FormControl type="text" value={'http://goglobechain.com/airdrop/state?code=' + itemArr[1]} className="has-value" readOnly />
                        </div>
                        { Number(itemArr[2]) === 0
                            ? <div className="block">
                                <p>{AIRDROP.verify[LANG]} <span className="red">{AIRDROP.alert[LANG]}</span></p>
                                <FormControl type="text" value={this.state.phone} placeholder={AIRDROP.placeholderPhone[LANG]} onChange={(evt) => this.changeEmail(evt)} className={this.state.phone ? 'has-value' : ''}/>
                                <Button onClick={() => this.clickToSendEmail(itemArr[0])}>{AIRDROP.send[LANG]}</Button>
                            </div>
                            : <div className="block">
                                <p>{AIRDROP.valid[LANG]}</p>
                                <FormControl type="text" value={itemArr[3] ? itemArr[3] : ''} className="has-value" readOnly />
                                <p className="green">{AIRDROP.validStatus[LANG]}</p>
                            </div>
                        }
                        <div className="form-footer">
                            {AIRDROP.received[LANG]} <span className="red">252</span> GOG
                        </div>
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
