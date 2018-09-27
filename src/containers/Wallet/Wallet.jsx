import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Helmet from 'react-helmet';
// import Select from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import moment from 'moment';
import 'weui';
import 'react-weui/build/dist/react-weui.css';
import { InfiniteLoader, LoadMore } from 'react-weui';


import { NAV_BAR, LANG, WALLET } from 'theme/Lang';
import { loadWalletData, loadRecord } from '../Index/indexUtil';
import './Wallet.styl';

export default class Wallet extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            activeNav: Number(this.props.params.activeNav),
            userInfo: {},
            record: {},
            pageIndex: 1,
            mobileRecord: {}
        };
    }
    componentWillMount() {
        const data = {
            ethAddress: this.props.params.searchkey
        };
        loadWalletData(data).then(response => response.json()).then((res) => {
            this.setState({ userInfo: res });
        });
        const data1 = {
            ethAddress: this.props.params.searchkey,
            start: 0,
            rows: 20
        };
        loadRecord(data1).then(response => response.json()).then((result) => {
            const _mobileRecord = JSON.parse(JSON.stringify(result));
            _mobileRecord.nextkey = 20;
            this.setState({ record: result, mobileRecord: _mobileRecord });
        });
    }
    toAnchor: Function = (anchor) => {
        if (anchor === '#download') {
            window.open('/download');
        } else {
            const url = '/' + anchor;
            window.location.href = url;
        }
    }
    changePage: Function = (pageIndex) => {
        const data = {
            ethAddress: this.props.params.searchkey,
            start: 20 * (pageIndex - 1),
            rows: 20
        };
        loadRecord(data).then(response => response.json()).then((res) => {
            this.setState({ record: res, pageIndex: pageIndex });
        });
    }
    loadMore: Function = (resolve, finish) => {
        const _mobileRecord = JSON.parse(JSON.stringify(this.state.mobileRecord));
        setTimeout(() => {
            if (_mobileRecord.list.length === _mobileRecord.number) {
                finish();
            } else {
                const data = {
                    ethAddress: this.props.params.searchkey,
                    start: _mobileRecord.nextkey,
                    rows: 20
                };
                loadRecord(data).then(response => response.json()).then((res) => {
                    if (res.list.length > 0) {
                        _mobileRecord.nextkey = _mobileRecord.nextkey + 20;
                        _mobileRecord.list = _mobileRecord.list.concat(res.list);
                        this.setState({ mobileRecord: _mobileRecord });
                    }
                }).then(resolve);
            }
        }, 1000);
    }
    render() {
        const { userInfo, record, mobileRecord, pageIndex } = this.state;
        return (
            userInfo && (record.list || mobileRecord.list)
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
                                    <img src={require('img/miner1.png')} />
                                    <p>{WALLET.device[LANG]}</p>
                                    <div className="number">{userInfo.deviceSum || 0}</div>
                                </div>
                                <div className="info-item">
                                    <img src={require('img/calculate1.png')} />
                                    <p>{WALLET.power[LANG]}</p>
                                    <div className="number">{userInfo.power || 0}</div>
                                </div>
                                <div className="info-item">
                                    <img src={require('img/output1.png')} />
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
                                            <div className="head-item">{WALLET.tableTitle.type[LANG]}</div>
                                            <div className="head-item">{WALLET.tableTitle.data[LANG]}</div>
                                        </div>
                                        <div className="table-body">
                                            {record.list.map((item, index) => {
                                                return (
                                                    <div key={item.id} className="body-row">
                                                        <div className="body-item">{index + 1 + ( pageIndex - 1 ) * 20}</div>
                                                        <div className="body-item">{item.amount}</div>
                                                        <div className="body-item">{item.opCode === 0 ? '余额奖励' : '挖矿奖励'}</div>
                                                        <div className="body-item">{moment(item.time).format('YYYY-MM-DD')}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                }
                                {record.list.length > 0
                                    && <Pagination
                                        showSizeChanger
                                        showQuickJumper={{ goButton: <button>确定</button> }}
                                        defaultPageSize={20}
                                        defaultCurrent={1}
                                        onShowSizeChange={this.onShowSizeChange}
                                        onChange={(evt) => this.changePage(evt)}
                                        total={record.number}
                                    />}
                                {/* <Pagination simple showQuickJumper={{ goButton: true }} defaultCurrent={1} total={50} />
                            <Pagination onChange={this.onChange} current={this.state.current} total={25} /> */}
                            </div>
                        </div>
                    </div>
                    <div className="mobile">
                        <InfiniteLoader id="infiniteCon"
                            onLoadMore={this.loadMore}
                            loaderLoadingIcon={<LoadMore loading> 加载中... </LoadMore>}
                            loaderDefaultIcon={<LoadMore showLine> 已经到底啦 </LoadMore>} >
                            <div className="search-result">
                                <div className="top">
                                    <div className="header">{WALLET.addr[LANG]}：{this.props.params.searchkey}</div>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <img src={require('img/balance.png')} />
                                            <p>{WALLET.balance[LANG]}</p>
                                            <div className="gog"><span className="gog-number">{userInfo.balance || 0}</span> GOG</div>
                                        </div>
                                        <div className="info-item">
                                            <img src={require('img/miner1.png')} />
                                            <p>{WALLET.device[LANG]}</p>
                                            <div className="number">{userInfo.deviceSum || 0}</div>
                                        </div>
                                        <div className="info-item">
                                            <img src={require('img/calculate1.png')} />
                                            <p>{WALLET.power[LANG]}</p>
                                            <div className="number">{userInfo.power || 0}</div>
                                        </div>
                                        <div className="info-item">
                                            <img src={require('img/output1.png')} />
                                            <p>{WALLET.dailyProduce[LANG]}</p>
                                            <div className="number">{userInfo.dailyProduce || 0}</div>
                                        </div>
                                    </div>
                                    <div className="recomment">{WALLET.recommend[LANG]}：{userInfo.referral || ''}</div>
                                </div>
                                <div className="mining-record">
                                    <h3 className="table-title">{WALLET.miningRecord[LANG]}</h3>
                                    {mobileRecord.list.length > 0
                                        && <div className="mining-table">
                                            <div className="table-head">
                                                <div className="head-item"></div>
                                                <div className="head-item">{WALLET.tableTitle.output[LANG]}</div>
                                                <div className="head-item">{WALLET.tableTitle.type[LANG]}</div>
                                                <div className="head-item">{WALLET.tableTitle.data[LANG]}</div>
                                            </div>
                                            <div className="table-body">
                                                {mobileRecord.list.map((item, index) => {
                                                    return (
                                                        <div key={item.id} className="body-row">
                                                            <div className="body-item">{index + 1}</div>
                                                            <div className="body-item">{item.amount}</div>
                                                            <div className="body-item">{item.opCode === 0 ? '余额奖励' : '挖矿奖励'}</div>
                                                            <div className="body-item">{moment(item.time).format('YYYY-MM-DD')}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </InfiniteLoader>
                    </div>
                </div> : null
        );
    }
}
