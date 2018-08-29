// 空投页  zhaoyue
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import { WEBTITLE, LANG, AIRDROP } from 'theme/Lang';
import { asyncLogin } from './AirDropUtil.js';
import './AirDrop.styl';

export default class AirDrop extends Component {

    static propTypes = {
        children: PropTypes.object
    };
    state: Object = {
        ethAdress: '',
        alertmsg: ''
    };
    changeAdress: Function = (evt) => {
        this.setState({ ethAdress: evt.target.value });
    }
    clickToLogin: Function = () => {
        if (this.state.ethAdress) {
            const data = {
                account: this.state.ethAdress
            };
            asyncLogin(data).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error(response.status));
            }).then((res) => {
                if (res.status === 'success') {
                    if (res.goglobe.email) {
                        browserHistory.push('/airdrop/state?account=' + res.goglobe.account + '&code=' + res.goglobe.code + '&status=' + res.goglobe.status + '&email=' + res.goglobe.email);
                    } else {
                        browserHistory.push('/airdrop/state?account=' + res.goglobe.account + '&code=' + res.goglobe.code + '&status=' + res.goglobe.status);
                    }
                } else if (res.status === 'success_end') {
                    this.setState({
                        alertmsg: 'This event has ended'
                    });
                    alert('This event has ended');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    _handleKeyPress: Function = (target) => {
        if (target.charCode === 13) {
            this.clickToLogin();
        }
    }
    render() {
        return (
            <div className="air-drop height">
                <Helmet>
                    <title>{WEBTITLE[LANG]}</title>
                    <meta name="description" content="Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping. Go Globe also provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly." />
                    <meta keyword="goglobe travel" />
                </Helmet>
                <div className="center-form">
                    <div className="air-logo">
                        {/* <img src={require('img/logo4.png')} /> */}
                        <img className="logo1" src={require('img/logo1.png')} />
                        { LANG === 'en'
                            ? <img className="logo3" src={require('img/logo3.png')} />
                            : <div className="logo3 logo-text">自游链：世界旅游新生态</div>
                        }
                    </div>
                    <div className="air-doc">
                        { LANG === 'en'
                            ? <img src={require('img/airdrop.png')} />
                            : <img src={require('img/airdrop-zh.png')} />
                        }
                    </div>
                    <p className="air-tip">{AIRDROP.airTip[LANG]}</p>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" value={this.state.ethAdress} className="" placeholder={AIRDROP.placeholderAddr[LANG]}
                                onChange={(evt) => this.changeAdress(evt)} className={this.state.ethAdress ? 'has-value' : ''}
                                onKeyPress = { this._handleKeyPress } />
                            <InputGroup.Addon onClick={ () => this.clickToLogin() }>{AIRDROP.submit[LANG]}</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
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
        );
    }
}
