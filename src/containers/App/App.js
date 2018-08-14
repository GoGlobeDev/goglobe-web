import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

import config from '../../config';
import './App.styl';
// import 'react-select/dist/react-select.css';
// import { REG_ID } from '../../theme/Lang';
// import cookie from 'react-cookie';
// 全局只引用一个HTML5Backend
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

/* eslint new-cap: [2, {capIsNewExceptions: ["DragDropContext"]}] */
// @DragDropContext(HTML5Backend)

import counterpart from 'counterpart';
const localeZh = require('theme/locales/locale-zh.json');

counterpart.registerTranslations('zh', localeZh);
// counterpart.setFallbackLocale('zh');
counterpart.setLocale('zh');

export default class App extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired
    };
    static contextTypes = {
        store: PropTypes.object.isRequired
    };
    render() {
        return (
            <div className="app height">
                <Helmet {...config.app.head}/>
                { this.props.children }
            </div>
        );
    }
}
