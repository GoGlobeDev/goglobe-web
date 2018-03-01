import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

import './AirDrop.styl';

export default class AirDrop extends Component {

    static propTypes = {
        children: PropTypes.object
    };
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
                            <FormControl type="text" value="" className="" />
                            <InputGroup.Addon>submit</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>
            </div>
        );
    }
}
