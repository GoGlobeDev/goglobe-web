import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
    App,
    Index,
    AirDrop,
    AirDropState,
    AirDropActive,
    AirDropActiveState,
    Wallet
} from 'containers';

/* eslint-disable */
function baiduTongji(pre, next) {
    const _hmt = window._hmt;
    if (_hmt) {
        _hmt.push(['_trackPageview', next.location.pathname]);
    }
}

export default function getRoutes() {
    /**
    * Please keep routes in alphabetical order
    */
    return (
        <Route path="/" component={App} onChange={baiduTongji}>
            <IndexRoute component={Index} />
            <Route path="mining/nav/:activeNav/key/:searchkey" component={Wallet} />
            <Route path="airdrop" component={AirDrop} />
            <Route path="airdrop/state" component={AirDropState} />
            <Route path="airdrop/active" component={AirDropActive} />
            <Route path="airdrop/activestate" component={AirDropActiveState} />
        </Route>
    );
}
