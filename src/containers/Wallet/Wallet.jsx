import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Helmet from 'react-helmet';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';

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
            <div className="wallet">
                <Helmet title="钱包" />
                <Navbar collapseOnSelect fixedTop className="header-nav">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img className="logo1" src={require('img/logo1.png')} />
                            {LANG === 'en'
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
                <div className="search-result web">
                    <div className="header">地址：{this.props.params.searchkey}</div>
                    <div className="body">
                        <div className="info-list">
                            <div className="info-item">
                                <img src={require('img/balance.png')} />
                                <p>余额</p>
                                <div className="gog"><span className="gog-number">452</span> GOG</div>
                            </div>
                            <div className="info-item">
                                <img src={require('img/balance.png')} />
                                <p>绑定矿机</p>
                                <div className="number">2</div>
                            </div>
                            <div className="info-item">
                                <img src={require('img/balance.png')} />
                                <p>算力</p>
                                <div className="number">255</div>
                            </div>
                            <div className="info-item">
                                <img src={require('img/balance.png')} />
                                <p>每日产出</p>
                                <div className="number">2554</div>
                            </div>
                        </div>
                        <div className="recomment">推荐人：XXXXCCCCCCCCCCCCCCCCCCCCCCC</div>
                        <div className="mining-record">
                            <h3 className="table-title">挖矿记录</h3>
                            <div className="mining-table">
                                <div className="table-head">
                                    <div className="head-item"></div>
                                    <div className="head-item">挖矿产出</div>
                                    <div className="head-item">日期</div>
                                </div>
                                <div className="table-body">
                                    {[1, 2, 3, 4, 5].map((item) => {
                                        return (
                                            <div key={item} className="body-row">
                                                <div className="body-item">{item}</div>
                                                <div className="body-item">1253</div>
                                                <div className="body-item">2018-8-30</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <Pagination
                                selectComponentClass={Select}
                                showSizeChanger
                                showQuickJumper={{ goButton: <button>确定</button> }}
                                defaultPageSize={20}
                                defaultCurrent={5}
                                onShowSizeChange={this.onShowSizeChange}
                                onChange={this.onChange}
                                total={450}
                            />
                            <Pagination simple showQuickJumper={{ goButton: true }} defaultCurrent={1} total={50} />
                        </div>
                    </div>
                </div>
                <div className="search-result mobile">
                    <div className="top">
                        <div className="header">地址：{this.props.params.searchkey}</div>
                        <div className="info-list">
                            <div className="info-item">
                                <img src={require('img/balance.png')} />
                                <p>余额</p>
                                <div className="gog"><span className="gog-number">452</span> GOG</div>
                            </div>
                            <div className="info-item">
                                <img src={require('img/balance.png')} />
                                <p>绑定矿机</p>
                                <div className="number">2</div>
                            </div>
                            <div className="info-item">
                                <img src={require('img/balance.png')} />
                                <p>算力</p>
                                <div className="number">255</div>
                            </div>
                            <div className="info-item">
                                <img src={require('img/balance.png')} />
                                <p>每日产出</p>
                                <div className="number">2554</div>
                            </div>
                        </div>
                        <div className="recomment">推荐人：XXXXCCCCCCCCCCCCCCCCCCCCCCC</div>
                    </div>
                    <div className="mining-record">
                        <h3 className="table-title">挖矿记录</h3>
                        <div className="mining-table">
                            <div className="table-head">
                                <div className="head-item"></div>
                                <div className="head-item">挖矿产出</div>
                                <div className="head-item">日期</div>
                            </div>
                            <div className="table-body">
                                {[1, 2, 3, 4, 5].map((item) => {
                                    return (
                                        <div key={item} className="body-row">
                                            <div className="body-item">{item}</div>
                                            <div className="body-item">1253</div>
                                            <div className="body-item">2018-8-30</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
