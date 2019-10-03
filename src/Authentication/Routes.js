import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from '../pages/Home';
import Loader from '../components/Loader';
import Auth from './Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

const Routes = () => (
    <Router history={history} component={Home}>
        <div>
            <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Loader />
            }} />
        </div>
    </Router>
);

export default Routes;