// 首页文件 @author wc 2017.6.27  zhaoyue 2018.2.12
// 外部引用
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Image, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

import {
    TEAM, INVESTORS, CONTACT, NAV_BAR,
    ADVISORS, PARTNERS, FEATURES, LANG, DOWNLOAD, BANNER, FOOTER, GOGLOBE, ABOUT, WEBTITLE
} from 'theme/Lang';
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
                this.setState({ activeNav: _index });
            } else {
                this.setState({ activeNav: 1 });
            }
        }
    }
    toAnchor: Function = (anchor, idx) => {
        window.location.href = anchor;
        this.setState({ activeNav: idx });
    }
    // 递归创建消息节点元素数组
    _getNodeItems: Function = (str, messageArrOld) => {
        if (!str) {
            return messageArrOld;
        }
        let messageArrNew = JSON.parse(JSON.stringify(messageArrOld));
        if ((/{{[\u4e00-\u9fa5a-zA-Z0-9/-\s+]+}}/).test(str)) {
            const indexLeft = str.indexOf('{{');
            const indexRight = str.indexOf('}}');
            messageArrNew.push({
                nodeType: 'textNode',
                nodeText: str.slice(0, indexLeft)
            });
            messageArrNew.push({
                nodeType: 'objectNode',
                nodeText: str.slice(indexLeft + 2, indexRight)
            });
            const otherStr = str.slice(indexRight + 2);
            messageArrNew = this._getNodeItems(otherStr, messageArrNew);
        } else {
            messageArrNew.push({
                nodeType: 'textNode',
                nodeText: str
            });
        }
        return messageArrNew;
    }
    _constructMsgHtml: Function = (item) => {
        const messageArr = this._getNodeItems(item, []);
        return (
            <div className="item-txt">
                {messageArr.map((item2, index) => {
                    // 文本节点
                    if (item2.nodeType === 'textNode') {
                        if (item2.nodeText !== '') {
                            return (<span key={index}>{item2.nodeText}</span>);
                        }
                        return null;
                    }
                    // 对象节点
                    if (item2.nodeType === 'objectNode') {
                        return (<span key={index} className="bold">{item2.nodeText}</span>);
                    }
                })}
            </div>
        );
    }
    render() {
        return (
            this.state.activeNav
                ? <div className="">
                    <Helmet>
                        <title>{WEBTITLE[LANG]}</title>
                        <meta name="description" content="Go Globe features a Double-Helix Blockchain which performs value transfer and record keeping. Go Globe also provides decentralized and atomic listing mechanism to empower owners, control pricing and access directly." />
                        <meta keyword="goglobe travel" />
                    </Helmet>
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
                                {/* <NavItem>{LANG === 'en' ? 'Japanese' : 'English'}</NavItem> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <a name="event"></a><div className="top-area"><a name="home"></a>
                        <div className="tips">
                            <h3>{BANNER.title[LANG]}</h3>
                            <div className="tip-btn">
                                <div className="left" onClick={() => this.toAnchor('#about', 2)}>{BANNER.lBtn[LANG]}</div>
                                <div className="right" onClick={() => this.toAnchor('#contact', 6)}>{BANNER.rBtn[LANG]}</div>
                            </div>
                            <div>
                                <span>{BANNER.more[LANG]}</span>
                                <div className="more">...</div>
                            </div>
                        </div>
                    </div>
                    <a name="about"></a><div className="intro clearfix"><div className="container">
                        <div className="col-md-5 fun-left">
                            <div className="top-line" />
                            {ABOUT[LANG].map((item, index) => {
                                return (
                                    <div className="left-text" key={index}>{item}</div>
                                );
                            })}
                        </div>
                        <div className="col-md-7 fun-right">
                            <Player src="http://www.goglobechain.io/res/goglobe.mp4" />
                        </div>
                    </div></div>
                    <section className="what-globe">
                        <div className="wrapper clearfix">
                            <div className="title">{GOGLOBE.title[LANG]}</div>
                            <div className="container clearfix">
                                {GOGLOBE.describe.map((item, index) => {
                                    return (
                                        <div className="ptl1-item clearfix col-lg-4 col-md-4 col-sm-12 col-xs-12" key={index}>
                                            <div className="item-pic"><img src={item.pic} /></div>
                                            {this._constructMsgHtml(item.text[LANG])}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="ft">
                                <article className="article">
                                    {GOGLOBE.note.map((item, index) => {
                                        return (
                                            <p className={index === 0 ? 'a-intro' : ''} key={index}>{item[LANG]}</p>
                                        );
                                    })}
                                </article>
                                {/* <div className="video-btn" onClick={() => this.toAnchor('#about', 2)}>{GOGLOBE.video[LANG]}</div> */}
                            </div>
                        </div>
                        <div className="phone-img"><img src={require('img/phone.png')} /></div>
                    </section>
                    <section className="inno">
                        <div className="inno-container clearfix">
                            <div className="title">{FEATURES.title[LANG]}</div>
                            <p>&nbsp;</p>
                            <div className="reason">
                                {FEATURES.text.map((item, index) => {
                                    return (
                                        <div className="reason-item clearfix" key={index}>
                                            <div className="item-pic"><img src={item.pic} /></div>
                                            <div className="item-txt">
                                                <h3 className="txt-title">{item.name[LANG]} <span className="color-3">{item.subName[LANG]}</span></h3>
                                                <p className="txt-intro">{item.intro[LANG]}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                    <a name="files"></a>
                    <div className="files clearfix">
                        <div className="container">
                            {DOWNLOAD.map((item, index) => {
                                return (
                                    <div className="col-sm-6 col-md-3 col-md-offset-2" key={index}>
                                        <div className={index === 0 ? 'files-left' : 'files-right'}>
                                            <img src={require('img/document1.png')} />
                                            { index === 1
                                                ? <div className="names"><a download="GoGlobeWhitePaper_CN.pdf" href="http://www.goglobechain.com/whitepaper/GoGlobeWhitePaper_CN.pdf">{item[LANG].title}</a></div>
                                                : <div className="names">{item[LANG].title}</div>
                                            }
                                            {/* <div className="available">{item[LANG].vs}</div>
                                            <div className="language">
                                                {item[LANG].lang.map((item1, index1) => {
                                                    if (index1 !== (item[LANG].lang.length - 1)) {
                                                        return (
                                                            <span key={index1}><a download="Whitepaper_v3.0_EN.pdf" href="http://www.goglobechain.io/res/Whitepaper_v3.0_EN.pdf">{item1}</a><i>&emsp;&bull;&emsp;</i></span>
                                                        );
                                                    }
                                                    return (
                                                        <span key={index1}><a download="Whitepaper_v3.0_EN.pdf" href="http://www.goglobechain.io/res/Whitepaper_v3.0_EN.pdf">{item1}</a></span>
                                                    );
                                                })}
                                            </div> */}
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </div>
                    </div>
                    <a name="team"></a>
                    <div className="team-img">
                        <div className="team clearfix">
                            <div className="container">
                                <div className="title">{TEAM.title[LANG]}</div>
                                <div className="persons clearfix">
                                    {TEAM.text.map((item, idx) => {
                                        return (<div className="person-intro clearfix col-sm-6 col-xs-12" key={idx}>
                                            <Image src={item.pic} circle />
                                            <div className="person-right">
                                                <h4><span>{item.name[LANG]}</span>, <span>{item.title[LANG]}</span></h4>
                                                <p>{item.intro[LANG]}</p>
                                            </div>
                                        </div>);
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="team advisors clearfix">
                            <div className="container">
                                <div className="title">{ADVISORS.title[LANG]}</div>
                                <div className="persons clearfix">
                                    {ADVISORS.text.map((item, idx) => {
                                        return (<div className="person-intro clearfix col-sm-6 col-xs-12" key={idx}>
                                            <Image src={item.pic} circle />
                                            <div className="person-right">
                                                <h4><span>{item.name[LANG]}</span></h4>
                                                <p>{item.intro[LANG]}</p>
                                            </div>
                                        </div>);
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <a name="partners"></a><div className="investors"><div className="container">
                        <div className="title">{INVESTORS.title[LANG]}</div>
                        <ul className="brand-list clearfix">
                            {INVESTORS.text.map((item, index) => {
                                return (<li key={index} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <img src={item.pic} />
                                    <div className="investor-intro">{item.intro[LANG]}</div>
                                </li>);
                            })}
                        </ul>
                    </div></div>
                    <a name="partners"></a><div className="partners"><div className="container">
                        <div className="title">{PARTNERS.title[LANG]}</div>
                        <ul className="brand-list clearfix">
                            {PARTNERS.imgs.map((item, index) => {
                                return (<li key={index} className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <img src={item.pic} /></li>);
                            })}
                        </ul>
                    </div></div>
                    <a name="contact"></a><div className="contact"><div className="container">
                        <div className="title">{CONTACT.title[LANG]}</div>
                        <ul className="contact-icons clearfix">
                            {CONTACT.CONTACT_ICONS_GRAY.map((item, index) => {
                                return (<li key={index}><img src={item.pic} /></li>);
                            })}
                        </ul>
                        <div className="up-to-top" onClick={() => this.toAnchor('#home', 1)}>
                            <img src={require('img/arrow.png')} />
                        </div>
                    </div></div>
                    <div className="footer clearfix"><div className="container">
                        <div className="col-sm-2 footer-left">
                            <img src={require('img/logo2.png')} />
                        </div>
                        <div className="col-sm-4 footer-mid">
                            <h4>{FOOTER.addr.title[LANG]}</h4>
                            <p>{FOOTER.addr.street[LANG]}</p>
                            <p>{FOOTER.addr.city[LANG]}</p>
                        </div>
                        <div className="col-sm-5 col-sm-offset-1 footer-right">
                            <h4>{FOOTER.contact.title[LANG]}</h4>
                            <div className="e-mail">{FOOTER.contact.email[LANG]}</div>
                            <div className="splitter"></div>
                            <div className="join-us">{FOOTER.contact.join[LANG]}</div>
                            <ul className="contact-icons">
                                {CONTACT.CONTACT_ICONS_WHITE.map((item, index) => {
                                    return (<li key={index}><img src={item.pic} /></li>);
                                })}
                            </ul>
                        </div>
                    </div></div>
                </div>
                : null
        );
    }
}
