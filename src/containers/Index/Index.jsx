// 首页文件 @author wc 2017.6.27  zhaoyue 2018.2.12
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
            // activeNav: 0
        };
    }
    componentWillMount() {
        if (__CLIENT__) {
            const _activeNav = location.href.split('#')[1];
            if (_activeNav) {
                const str = '#' + _activeNav;
                let _index = 0;
                NAV_BAR.forEach((item, idx) => {
                    if (item.anchor === str) {
                        _index = idx + 1;
                    }
                });
                window.location.href = str;
                this.setState({activeNav: _index});
            } else {
                this.setState({activeNav: 1});
            }
        }
    }
    toAnchor: Function=(anchor, idx)=>{
        window.location.href = anchor;
        this.setState({activeNav: idx});
    }
    render() {
        return (
            this.state.activeNav
             ? <div className="">
                    <Helmet>
                        <title>Go Globe Chain | Redefine The Travel Diatribution Landscape</title>
                        <meta name="description" content="Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping. Go Globe also provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly." />
                        <meta keyword="goglobe travel" />
                    </Helmet>
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
                                    return (<NavItem key={idx} eventKey={idx + 1} onClick={()=>this.toAnchor(item.anchor, idx + 1)}>{item.label}</NavItem>);
                                })}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <a name="event"></a><div className="top-area"><a name="home"></a>
                        {/* <img src={require('img/banner.jpg')}/>
                        <div className="events clearfix">
                            <div className="event1 col-xs-12 col-sm-12 col-md-3">
                                EVENT</div>
                            <div className="event2 col-xs-12 col-sm-12 col-md-6">
                                25d : 23h : 02m : 54s</div>
                            <div className="event3 col-xs-12 col-sm-12 col-md-3">
                                <div className="right-btn">Learn More&nbsp; ></div></div>
                        </div>*/}
                        <div className="tips">
                            <h3>GO GLOBE</h3>
                            <div className="tip-btn">
                                <div className="left">WATCH VIDEO</div>
                                <div className="right" onClick={() => this.toAnchor('#contact', 6)}>CONTACT US</div>
                            </div>
                            <div>
                                <span>LEARN MORE</span>
                                <div className="more">...</div>
                            </div>
                        </div>
                    </div>
                    <a name="about"></a><div className="intro clearfix"><div className="container">
                        <div className="col-md-5 fun-left">
                            <div className="top-line" />
                            <div className="left-text">redefine</div>
                            <div className="left-text">the travel</div>
                            <div className="left-text">distribution</div>
                            <div className="left-text">landscape</div>
                        </div>
                        <div className="col-md-7 fun-right">
                            Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping.  Go Globe also provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly. Furthermore, Go Globe is powered by leading edge AI search engine where rich content is organized and intelligent indexed in distributed fashion. Finally, Go Globe blockchain offers rapid settlement of value, eliminating charge-back and credit risk from traditional credit network.
                        </div>
                    </div></div>
                    <section className="inno">
                        <div className="inno-container clearfix">
                            <div className="title">FEATURES</div>
                            <p>&nbsp;</p>
                            <div className="reason">
                                <div className="reason-item clearfix">
                                    <div className="item-pic"><img src={require('img/icon-1.png')} /></div>
                                    <div className="item-txt">
                                        <h3 className="txt-title">Double <span className="color-3">Helix Blockchain </span></h3>
                                        <p className="txt-intro">Industry's first Double-Helix ledgers where one chain is optimized for fast settlement and the other is designed with multi-attribute content in mind for superior experience.</p>
                                    </div>
                                </div>
                                <div className="reason-item clearfix">
                                    <div className="item-pic"><img src={require('img/icon-2.png')} /></div>
                                    <div className="item-txt">
                                        <h3 className="txt-title">Brand <span className="color-3">Token</span></h3>
                                        <p className="txt-intro">Ability to issue one's unique branded token, function like points and distribute these branded tokens to targeted customers, to facilitate the growth of business.</p>
                                    </div>
                                </div>
                                <div className="reason-item clearfix">
                                    <div className="item-pic"><img src={require('img/icon-3.png')} /></div>
                                    <div className="item-txt">
                                        <h3 className="txt-title">Smart <span className="color-3">Contract Engine</span></h3>
                                        <p className="txt-intro">Through the use of Smart Contract, multiparty operations can gain trust; and automation delivers efficiency and reduces dependency on manual labor. </p>
                                    </div>
                                </div>
                                <div className="reason-item clearfix">
                                    <div className="item-pic"><img src={require('img/icon-4.png')} /></div>
                                    <div className="item-txt">
                                        <h3 className="txt-title">My <span className="color-3">Property</span></h3>
                                        <p className="txt-intro">Each user will be able to participate in global travel industry projects, and every business owner and entrepreneur would have access to a global pool of resources without intermediaries required. </p>
                                    </div>
                                </div>
                                <div className="reason-item clearfix">
                                    <div className="item-pic"><img src={require('img/icon-5.png')} /></div>
                                    <div className="item-txt">
                                        <h3 className="txt-title">My <span className="color-3">Inventory</span></h3>
                                        <p className="txt-intro">Ownership of data by users, coupled with mechanisms to manage owned data, is the beginning of reversing this business model. </p>
                                    </div>
                                </div>
                                <div className="reason-item clearfix">
                                    <div className="item-pic"><img src={require('img/icon-6.png')} /></div>
                                    <div className="item-txt">
                                        <h3 className="txt-title">Social</h3>
                                        <p className="txt-intro">With applications available on the Go Globe Chain Platform, travelers can show & tell, in real time, photographs and sound bites during the trip.</p>
                                    </div>
                                </div>
                                <div className="reason-item clearfix">
                                    <div className="item-pic"><img src={require('img/icon-7.png')} /></div>
                                    <div className="item-txt">
                                        <h3 className="txt-title">Cross-border <span className="color-3">Investment</span></h3>
                                        <p className="txt-intro">Reliable, legal and private ownership of travel assets anywhere in the world, for all users of the Go Globe Chain Platform.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <a name="files"></a><div className="files clearfix"><div className="container">
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
                    </div></div>
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
                    <a name="partners"></a><div className="partners"><div className="container">
                        <div className="title">PARTNERS</div>
                        <ul className="brand-list clearfix">
                            {PARTNERS.map((item, index)=>{
                                return (<li key={index} className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <img src={item.pic}/></li>);
                            })}
                        </ul>
                    </div></div>
                    <a name="partners"></a><div className="investors"><div className="container">
                        <div className="title">INVESTORS</div>
                        <ul className="brand-list clearfix">
                            {INVESTORS.map((item, index)=>{
                                return (<li key={index} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <img src={item.pic}/>
                                    <div className="investor-intro">{item.intro}</div>
                                    </li>);
                            })}
                        </ul>
                    </div></div>
                    <a name="team"></a>
                    <div className="team-img">
                        <div className="team clearfix">
                            <div className="container">
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
                        </div>
                        <div className="team advisors clearfix">
                            <div className="container">
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
                            </div>
                        </div>
                    </div>
                    <a name="contact"></a><div className="contact"><div className="container">
                        <div className="title">CONTACT US</div>
                        <ul className="contact-icons clearfix">
                            {CONTACT_ICONS_GRAY.map((item, index)=>{
                                return (<li key={index}><img src={item.pic}/></li>);
                            })}
                        </ul>
                        <div className="up-to-top" onClick={() => this.toAnchor('#home', 1)}>
                            <img src={require('img/arrow.png')}/>
                        </div>
                    </div></div>
                    <div className="footer clearfix"><div className="container">
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
                    </div></div>
                </div>
                : null
        );
    }
}
