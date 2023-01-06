import React from 'react';
import { withRouter, Route, Switch } from 'react-router';
import Home from './Home';
import Login from './Login';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route path='/home' component={Home} />
        </Switch>
    );
}

export default withRouter(Routes);