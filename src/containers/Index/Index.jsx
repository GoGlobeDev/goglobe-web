// 首页文件 wc 20180619
 // 外部引用
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Header as NavbarHeader, Collapse as NavbarCollapse } from 'react-bootstrap/lib/Navbar';

import './Index.styl';

export default class Index extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // activeNav: 0
    //     };
    // }
    render() {
        return (
            <div className="index">
                <Helmet>
                    <title></title>
                    <meta name="description" content="" />
                    <meta keyword="" />
                </Helmet>
                <div className="top-area">
                    <Navbar collapseOnSelect>
                        <NavbarHeader>
                            <img src={require('img/logo-white.png')} />
                        </NavbarHeader>
                        <NavbarCollapse>
                            <Nav pullRight>
                              <NavItem eventKey={1} href="#">
                                For Drivers
                              </NavItem>
                              <NavItem eventKey={2} href="#">
                                For Parking Operations
                              </NavItem>
                            </Nav>
                        </NavbarCollapse>
                    </Navbar>
                    <div className="container">
                        <div className="left">
                            <div className="slogan">Your parking space is waiting.</div>
                            <div>
                                <Button>Download Skyway</Button>
                            </div>
                            <div className="under-slogan"><img src={require('img/parking.png')} /></div>
                        </div>
                        <div className="right">
                            <img src={require('img/sample.png')} />
                        </div>
                    </div>
                    <div className="bottom" />
                </div>
                <div className="function"><div className="container">
                    <div className="left">
                        <Button bsStyle="primary">Reserve Now</Button>
                    </div>
                    <div className="right"><img src={require('img/g1.png')} /></div>
                </div></div>
                <div className="function"><div className="container">
                    <div className="left left-pic"><img src={require('img/g2.png')} /></div>
                    <div className="right"></div>
                </div></div>
                <div className="function"><div className="container">
                    <Button bsStyle="primary">
                        <img src={require('img/apple-icon.png')} />
                        Download Skyway
                    </Button>
                </div></div>
                <div className="footer"><div className="container text-center">
                    @Skyway, inc 2018
                </div></div>
            </div>
        );
    }
}
