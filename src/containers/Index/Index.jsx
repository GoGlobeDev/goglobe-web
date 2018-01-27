// 首页文件 @author wc 2017.6.27
 // 外部引用
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Image, Navbar, Nav, NavItem } from 'react-bootstrap';

import { PERSONS, INVESTORS, CONTACT_ICONS_GRAY, CONTACT_ICONS_WHITE, NAV_BAR,
ADVISORS, PARTNERS } from 'theme/Lang';
import './Index.styl';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNav: 0
        };
    }
    toAnchor: Function=(anchor, idx)=>{
        window.location.href = anchor;
        this.setState({activeNav: idx});
    }
    render() {
        return (
            <div className="height container">
                <Helmet title="GO GLOBE CHAIN"/>
                <Navbar collapseOnSelect fixedTop className="header-nav">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img className="logo1" src={require('img/logo1.png')}/>
                            <img className="logo3" src={require('img/logo3.png')}/>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeKey={this.state.activeNav}>
                            {NAV_BAR.map((item, idx)=>{
                                return (<NavItem key={idx} eventKey={idx} onClick={()=>this.toAnchor(item.anchor, idx)}>{item.label}</NavItem>);
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <a name="event"></a><div className="top-area"><a name="home"></a>
                    <img src={require('img/banner.jpg')}/>
                    {/* <div className="events clearfix">
                        <div className="event1 col-xs-12 col-sm-12 col-md-3">
                            EVENT</div>
                        <div className="event2 col-xs-12 col-sm-12 col-md-6">
                            25d : 23h : 02m : 54s</div>
                        <div className="event3 col-xs-12 col-sm-12 col-md-3">
                            <div className="right-btn">Learn More&nbsp; ></div></div>
                    </div>*/}
                </div>
                <a name="about"></a><div className="intro clearfix">
                    <div className="col-md-5 fun-left">
                        <div className="top-line" />
                        <div className="left-text">redefine</div>
                        <div className="left-text">the travel</div>
                        <div className="left-text">distribution</div>
                        <div className="left-text">landscape</div>
                    </div>
                    <div className="col-md-7 fun-right">
                        Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping.  Go Globe also provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly. Furthermore, Go Globe is powered by leading edge AI search engine where rich content is organized and intelligent indexed in distributed fashion.  The image repository can be further enhanced by Go Globe’s Augmented Reality Panoramic(ARP) technology in the future so visitors can take virtual tours.  Finally, Go Globe blockchain offers rapid settlement of value, eliminating charge-back and credit risk from traditional credit network.
                    </div>
                </div>
                <a name="files"></a><div className="files clearfix">
                    <div className="col-sm-6 col-md-3 col-md-offset-2">
                        <div className="files-left">
                            <img src={require('img/document1.png')}/>
                            <div className="names">DOWNLOAD THE ONE PAGER</div>
                            <div className="available">ALSO AVAILABLE IN</div>
                            <div className="language"><span>中文</span>
                            &emsp;&bull;&emsp;<span>ENGLISH</span>&emsp;&bull;&emsp;
                            <span>日本语</span></div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-md-offset-2">
                        <div className="files-right">
                            <img src={require('img/document1.png')}/>
                            <div className="names">DOWNLOAD THE WHITE PAPER</div>
                            <div className="available">ALSO AVAILABLE IN</div>
                            <div className="language"><span>中文</span>
                            &emsp;&bull;&emsp;<span>ENGLISH</span>&emsp;&bull;&emsp;
                            <span>日本语</span></div>
                        </div>
                    </div>
                </div>
                {/* <a name="features"></a><div className="features">
                    <div className="title">FEATURES</div>
                </div>*/}
                {/* <a name="partners"></a><div className="partners">
                    <div className="title">PARTNERS</div>
                    <ul className="brand-list clearfix">
                        {BRAND_MAP.map((item, index)=>{
                            return (<li key={index} className="col-lg-3 col-md-4
                                col-sm-6 col-xs-12">
                                <img src={item.pic}/></li>);
                        })}
                    </ul>
                </div> */}
                <a name="team"></a><div className="team clearfix">
                    <div className="title">TEAM</div>
                    <div className="persons clearfix">
                        {PERSONS.map((item, idx)=>{
                            return (<div className="person-intro clearfix col-sm-6 col-xs-12" key={idx}>
                                <Image src={item.pic} circle />
                                <div className="person-right">
                                    <h4><span>{item.name}</span>, <span>{item.title}</span></h4>
                                    <p>{item.intro}</p>
                                </div>
                            </div>);
                        })}
                    </div>
                    {/* <ul className="contact-icons">
                        {CONTACT_ICONS.map((item, index)=>{
                            return (<li><img key={index} src={item.pic}/></li>);
                        })}
                    </ul>*/}
                </div>
                <a name="team"></a><div className="team advisors clearfix">
                    <div className="title">ADVISORS</div>
                    <div className="persons clearfix">
                        {ADVISORS.map((item, idx)=>{
                            return (<div className="person-intro clearfix col-sm-6 col-xs-12" key={idx}>
                                <Image src={item.pic} circle />
                                <div className="person-right">
                                    <h4><span>{item.name}</span></h4>
                                    <p>{item.intro}</p>
                                </div>
                            </div>);
                        })}
                    </div>
                    {/* <ul className="contact-icons">
                        {CONTACT_ICONS.map((item, index)=>{
                            return (<li><img key={index} src={item.pic}/></li>);
                        })}
                    </ul>*/}
                </div>
                <a name="partners"></a><div className="partners">
                    <div className="title">PARTNERS</div>
                    <ul className="brand-list clearfix">
                        {PARTNERS.map((item, index)=>{
                            return (<li key={index} className="col-lg-4 col-md-6 col-xs-6">
                                <img src={item.pic}/></li>);
                        })}
                    </ul>
                </div>
                <a name="partners"></a><div className="investors">
                    <div className="title">INVESTORS</div>
                    <ul className="brand-list clearfix">
                        {INVESTORS.map((item, index)=>{
                            return (<li key={index} className="col-lg-12">
                                <img src={item.pic}/></li>);
                        })}
                    </ul>
                </div>
                <a name="contact"></a><div className="contact">
                    <div className="title">CONTACT US</div>
                    <ul className="contact-icons clearfix">
                        {CONTACT_ICONS_GRAY.map((item, index)=>{
                            return (<li key={index}><img src={item.pic}/></li>);
                        })}
                    </ul>
                    <a href="#home"><div className="up-to-top">
                        <img src={require('img/arrow.png')}/>
                </div></a></div>
                <div className="footer clearfix">
                    <div className="col-sm-2 footer-left">
                        <img src={require('img/logo2.png')} />
                    </div>
                    <div className="col-sm-4 footer-mid">
                        <h4>ADDRESS</h4>
                        <p>502/190 Queen Street</p>
                        <p>Melbourne, Australia</p>
                    </div>
                    <div className="col-sm-5 col-sm-offset-1 footer-right">
                        <h4>CONTACT US</h4>
                        <div className="e-mail">E-mail: info@goglobechain.com</div>
                        <div className="splitter"></div>
                        <div className="join-us">Join the discussion on the channels below</div>
                        <ul className="contact-icons">
                            {CONTACT_ICONS_WHITE.map((item, index)=>{
                                return (<li key={index}><img src={item.pic}/></li>);
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
