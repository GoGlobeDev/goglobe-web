// 空投页账号激活中转页 zhaoyue
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

import { asyncActive } from './AirDropUtil.js';

export default class AirDropActive extends Component {

    static propTypes = {
        params: PropTypes.object
    };
    state: Object = {
        isSendReq: false,
        activeState: ''
    };
    componentDidMount() {
        let itemArr = [];
        if (__CLIENT__) {
            const qs = location.search.length > 0 ? location.search.substring(1) : '';
            const items = qs.length > 0 ? qs.split('&') : [];
            itemArr = items.map((item) => {
                return decodeURIComponent(item.split('=')[1]);
            });
        }
        const account = itemArr[0];
        const data = {
            account: account
        };
        asyncActive(data).then(response => response.json()).then((res) => {
            if (res.status) {
                this.setState({ isSendReq: true });
                if (res.status === 'success') {
                    this.setState({
                        activeState: 'ok',
                        account: res.goglobe.account,
                        code: res.goglobe.code,
                        status: res.goglobe.status,
                        email: res.goglobe.email
                    });
                } else if (res.status === 'success_already') {
                    this.setState({
                        activeState: 'already',
                        account: res.goglobe.account,
                        code: res.goglobe.code,
                        status: res.goglobe.status,
                        email: res.goglobe.email
                    });
                } else if (res.status === 'fail_nouser') {
                    this.setState({
                        activeState: 'fail'
                    });
                }
            }
        });
    }
    clickToHome: Function = () => {
        browserHistory.replace('/airdrop');
    }
    renderState: Function = () => {
        const _activeState = this.state.activeState;
        if (_activeState === 'ok') {
            return (
                <div className="state-block">
                    <div className="state-pic"><img src={require('img/active-ok.png')} /></div>
                    <div className="state-describe">
                        <h1>GOOD!</h1>
                        <p>Your E-mail is verified successfully</p>
                        <Button onClick={() => this.clickToHome()}>Back to Homepage</Button>
                    </div>
                </div>
            );
        } else if (_activeState === 'already') {
            return (
                <div className="state-block">
                    <div className="state-pic"><img src={require('img/active-already.png')} /></div>
                    <div className="state-describe">
                        <h1>SORRY!</h1>
                        <p>You have already verified your E-mail</p>
                        <Button onClick={() => this.clickToHome()}>Back to Homepage</Button>
                    </div>
                </div>
            );
        } else if (_activeState === 'fail') {
            return (
                <div className="state-block">
                    <div className="state-pic"><img src={require('img/nouser.png')} /></div>
                    <div className="state-describe">
                        <h1>OOPS!</h1>
                        <p>The verification link is invilid</p>
                        <Button onClick={() => this.clickToHome()}>Back to Homepage</Button>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            this.state.isSendReq
            ? <div className="air-drop-active height">
                <Helmet>
                    <title>Go Globe Chain</title>
                </Helmet>
                {this.renderState()}
            </div>
            : null
        );
    }
}
