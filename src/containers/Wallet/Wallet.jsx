import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Helmet from 'react-helmet';

import { NAV_BAR, LANG } from 'theme/Lang';
import './Wallet.styl';

export default class Wallet extends Component {

    static propTypes = {
        params: PropTypes.object.isRequired
    };
    state: Object = {
        activeNav: Number(this.props.params.activeNav)
    };
    toAnchor: Function = (anchor) => {
        const url = '/' + anchor;
        window.location.href = url;
    }
    render() {
        return (
            <div className="wallet height">
                <Helmet title="钱包" />
                <Navbar collapseOnSelect fixedTop className="header-nav">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img className="logo1" src={require('img/logo1.png')} />
                            { LANG === 'en'
                                ? <img className="logo3" src={require('img/logo3.png')} />
                                : <div className="logo3 logo-text">自游链：世界旅游新生态</div>
                            }
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeKey={this.state.activeNav}>
                            {NAV_BAR.map((item, idx) => {
                                return (<NavItem key={idx} eventKey={idx + 1} onClick={() => this.toAnchor(item.anchor, idx + 1)}>{item.label[LANG]}</NavItem>);
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
