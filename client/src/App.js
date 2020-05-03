import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

//Private Route
import PrivateRoute from './components/routing/PrivateRoute';
//Profile
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
//Auth
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
//Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    //Setting up token
    useEffect(() => {
        store.dispatch(loadUser());
        // eslint-disable-next-line
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />{' '}
                            <PrivateRoute
                                exact
                                path='/create-profile'
                                component={CreateProfile}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
