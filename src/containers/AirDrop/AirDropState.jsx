// 空投状态页  zhaoyue
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormControl, Button } from 'react-bootstrap';

import { asyncSendEmail } from './AirDropUtil.js';

export default class AirDropState extends Component {

    static propTypes = {
        params: PropTypes.object
    };
    state: Object = {
        email: ''
    };
    changeEmail: Function = (evt) => {
        this.setState({ email: evt.target.value });
    }
    // 发送邮件激活账号
    clickToSendEmail: Function = (account) => {
        if (this.state.email) {
            const email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (email.test(this.state.email)) {
                const data = {
                    account: account,
                    email: this.state.email
                };
                asyncSendEmail(data).then(response => response.json()).then((res) => {
                    if (res.status) {
                        console.log(res);
                    }
                });
            }
        }
    }
    render() {
        let itemArr = [];
        if (__CLIENT__) {
            console.log(location.search, location.search.substring(1));
            const qs = location.search.length > 0 ? location.search.substring(1) : '';
            const items = qs.length > 0 ? qs.split('&') : [];
            itemArr = items.map((item) => {
                return decodeURIComponent(item.split('=')[1]);
            });
        }
        console.log(itemArr);
        return (
            itemArr.length > 0
                ? <div className="air-drop height">
                    <Helmet>
                        <title>Go Globe Chain</title>
                        <meta name="description" content="Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping. Go Globe also provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly." />
                        <meta keyword="goglobe travel" />
                    </Helmet>
                    <div className="center-form">
                        <div className="air-state-logo">
                            <img src={require('img/logo4.png')} />
                        </div>
                        <div className="block">
                            <p>Get 250 free GOG for every invited friend!</p>
                            <FormControl type="text" value={'http://goglobechain.com/airdrop/state?code=' + itemArr[1]} className="has-value" />
                        </div>
                        { Number(itemArr[2]) === 0
                            ? <div className="block">
                                <p>You need to verify your E-mail  to unlock your account. <span className="red">No airdrop for locked account!</span></p>
                                <FormControl type="text" value={this.state.ethAdress} placeholder="Enter your email " onChange={(evt) => this.changeEmail(evt)} className={this.state.ethAdress ? 'has-value' : ''}/>
                                <Button onClick={() => this.clickToSendEmail(itemArr[0])}>Send verification mail</Button>
                            </div>
                            : <div className="block">
                                <p>Your E-mail address:</p>
                                <FormControl type="text" value={itemArr[3] ? itemArr[3] : ''} className="has-value" />
                                <p className="green">Your account is activated.</p>
                            </div>
                        }
                        <div className="form-footer">
                            Received <span className="red">252</span> GOG
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
