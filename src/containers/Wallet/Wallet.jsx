import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Helmet from 'react-helmet';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';

import { NAV_BAR, LANG, WALLET } from 'theme/Lang';
import { loadWalletData, loadRecord } from '../Index/indexUtil';
import './Wallet.styl';

export default class Wallet extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired
    };
    state: Object = {
        activeNav: Number(this.props.params.activeNav),
        userInfo: {},
        record: {}
    };
    componentWillMount() {
        const data = {
            ethAddress: this.props.params.searchkey
        };
        loadWalletData(data).then(response => response.json()).then((res) => {
            console.log(res);
            this.setState({ userInfo: res });
        });
        loadRecord(data).then(response => response.json()).then((res) => {
            console.log(res);
            this.setState({ record: res });
        });
    }
    toAnchor: Function = (anchor) => {
        const url = '/' + anchor;
        window.location.href = url;
    }
    render() {
        const { userInfo, record } = this.state;
        return (
            userInfo && record.list
                ? <div className="wallet">
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
                        <div className="header">{WALLET.addr[LANG]}：{this.props.params.searchkey}</div>
                        <div className="body">
                            <div className="info-list">
                                <div className="info-item">
                                    <img src={require('img/balance.png')} />
                                    <p>{WALLET.balance[LANG]}</p>
                                    <div className="gog"><span className="gog-number">{userInfo.balance || 0}</span> GOG</div>
                                </div>
                                <div className="info-item">
                                    <img src={require('img/balance.png')} />
                                    <p>{WALLET.device[LANG]}</p>
                                    <div className="number">{userInfo.deviceSum || 0}</div>
                                </div>
                                <div className="info-item">
                                    <img src={require('img/balance.png')} />
                                    <p>{WALLET.power[LANG]}</p>
                                    <div className="number">{userInfo.power || 0}</div>
                                </div>
                                <div className="info-item">
                                    <img src={require('img/balance.png')} />
                                    <p>{WALLET.dailyProduce[LANG]}</p>
                                    <div className="number">{userInfo.dailyProduce || 0}</div>
                                </div>
                            </div>
                            <div className="recomment">{WALLET.recommend[LANG]}：{userInfo.referral || ''}</div>
                            <div className="mining-record">
                                <h3 className="table-title">{WALLET.miningRecord[LANG]}</h3>
                                {record.list.length > 0
                                    && <div className="mining-table">
                                        <div className="table-head">
                                            <div className="head-item"></div>
                                            <div className="head-item">{WALLET.tableTitle.output[LANG]}</div>
                                            <div className="head-item">{WALLET.tableTitle.data[LANG]}</div>
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
                                }
                                {record.list.length > 0
                                    && <Pagination
                                        selectComponentClass={Select}
                                        showSizeChanger
                                        showQuickJumper={{ goButton: <button>确定</button> }}
                                        defaultPageSize={20}
                                        defaultCurrent={1}
                                        onShowSizeChange={this.onShowSizeChange}
                                        onChange={this.onChange}
                                        total={record.number}
                                    />}
                                {/* <Pagination simple showQuickJumper={{ goButton: true }} defaultCurrent={1} total={50} />
                            <Pagination onChange={this.onChange} current={this.state.current} total={25} /> */}
                            </div>
                        </div>
                    </div>
                    <div className="search-result mobile">
                        <div className="top">
                            <div className="header">{WALLET.addr[LANG]}：{this.props.params.searchkey}</div>
                            <div className="info-list">
                                <div className="info-item">
                                    <img src={require('img/balance.png')} />
                                    <p>{WALLET.balance[LANG]}</p>
                                    <div className="gog"><span className="gog-number">{userInfo.balance || 0}</span> GOG</div>
                                </div>
                                <div className="info-item">
                                    <img src={require('img/balance.png')} />
                                    <p>{WALLET.device[LANG]}</p>
                                    <div className="number">{userInfo.deviceSum || 0}</div>
                                </div>
                                <div className="info-item">
                                    <img src={require('img/balance.png')} />
                                    <p>{WALLET.power[LANG]}</p>
                                    <div className="number">{userInfo.power || 0}</div>
                                </div>
                                <div className="info-item">
                                    <img src={require('img/balance.png')} />
                                    <p>{WALLET.dailyProduce[LANG]}</p>
                                    <div className="number">{userInfo.dailyProduce || 0}</div>
                                </div>
                            </div>
                            <div className="recomment">{WALLET.recommend[LANG]}：{userInfo.referral || ''}</div>
                        </div>
                        <div className="mining-record">
                            <h3 className="table-title">{WALLET.miningRecord[LANG]}</h3>
                            {record.list.length > 0
                                && <div className="mining-table">
                                    <div className="table-head">
                                        <div className="head-item"></div>
                                        <div className="head-item">{WALLET.tableTitle.output[LANG]}</div>
                                        <div className="head-item">{WALLET.tableTitle.data[LANG]}</div>
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
                                </div>}
                        </div>
                    </div>
                </div> : null
        );
    }
}
