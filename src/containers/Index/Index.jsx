// 首页文件 zhaoyue 2018.12.10
// 外部引用
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'video-react/dist/video-react.css';

import { LANG, WEBTITLE, NAV_BAR } from 'theme/Lang';
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
    render() {
        return (
            this.state.activeNav
                ? <div className="">
                    <Helmet>
                        <title>{WEBTITLE[LANG]}</title>
                        <meta name="description" content="" />
                        <meta keyword="" />
                    </Helmet>
                    <Navbar collapseOnSelect fixedTop className="header-nav">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <div className="logo3 logo-text">cos chain</div>
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
                    <div className="main">
                        <div className="title">
                            社群操作系统
                        </div>
                        <div className="desc">
                            <p>COS是在技术上充分利用区块链的去中心化、开放性、自治性、去信任、信息不可篡改等优势，将社群管理与发展方面的最佳实践通过社区不断总结，并通过技术固化为程序与智能合约进行公正公开的执行。旨在为社群管理提高更新更好的体验。</p>
                            <p>社群运营过程中遇到的主要场景，将由联盟提供直接的技术解决方案，同时COS将为第三方开发者提供开发接口，方便第三方开发者进行开发应用，并通过不断增加的应用满足社群管理与发展中的各类需求。联盟官方计划自行开发的重点应用如下：</p>
                        </div>
                        <div className="func-modules">
                            <div className="title">
                                COS功能模块
                                <span>用工具化的最佳实践支持社群管理和发展</span>
                            </div>
                            <div>
                                <div>
                                    <div className="title">社群基本应用</div>
                                    <ul>
                                        <ol>成员管理</ol>
                                        <ol>活动管理</ol>
                                        <ol>投票</ol>
                                        <ol>论坛</ol>
                                    </ul>
                                </div>
                                <div>
                                    <div className="title">开放平台</div>
                                    <ul>
                                        <ol>互助系统</ol>
                                        <ol>众筹和募捐系统</ol>
                                        <ol>活动广告赞助系统</ol>
                                        <ol>子积分和权益通证发行系统</ol>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="title">区块链基础功能</div>
                                    <ul>
                                        <ol>钱包</ol>
                                        <ol>转账</ol>
                                        <ol>透明浏览器</ol>
                                    </ul>
                                </div>
                                <div>
                                    <div className="title">社群贡献奖励</div>
                                    <ul>
                                        <ol>额度授权</ol>
                                        <ol>行为奖励</ol>
                                        <ol>排行榜</ol>
                                    </ul>
                                </div>
                                <div>
                                    <div className="title">联盟事务</div>
                                    <ul>
                                        <ol>联盟决策系统</ol>
                                        <ol>秘书处管理</ol>
                                        <ol>运营统计系统</ol>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null
        );
    }
}
