import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
    App,
    Index
} from 'containers';

export default function getRoutes() {
    /**
    * Please keep routes in alphabetical order
    */
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
        </Route>
    );
}
