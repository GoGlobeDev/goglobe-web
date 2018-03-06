// 空投页  zhaoyue
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';

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
                console.log(res);
                if (res.status === 'success') {
                    browserHistory.push('/airdrop/state?account=' + res.goglobe.account + '&code=' + res.goglobe.code + '&status=' + res.goglobe.status);
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
    render() {
        return (
            <div className="air-drop height">
                <Helmet>
                    <title>Go Globe Chain</title>
                    <meta name="description" content="Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping. Go Globe also provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly." />
                    <meta keyword="goglobe travel" />
                </Helmet>
                <div className="center-form">
                    <div className="air-logo">
                        <img src={require('img/logo4.png')} />
                    </div>
                    <div className="air-doc">
                        <img src={require('img/airdrop.png')} />
                    </div>
                    <p className="air-tip">Enter your ETH address to get 250 free GOG additional 250 GOG for every invited friend</p>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" value={this.state.ethAdress} className="" placeholder="Enter your ETH address " onChange={(evt) => this.changeAdress(evt)} className={this.state.ethAdress ? 'has-value' : ''}/>
                            <InputGroup.Addon onClick={ () => this.clickToLogin() }>submit</InputGroup.Addon>
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
