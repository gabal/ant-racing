import React, { Component } from 'react';
import AntCollection from './AntCollection';
import './Home.scss';

class Home extends Component {
    login = () => {
        const props: any = this.props;
        props.auth.login();
    }
    logout = () => {
        const props: any = this.props;
        props.auth.logout();
    }
    render() {
        const props: any = this.props;
        const { isAuthenticated } = props.auth;
        return (
            <div>
                {
                    isAuthenticated() &&
                    <div className="container column">
                        <h5>
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={this.logout}
                                href="#"
                            >
                                Log Out
              </a>.
            </h5>
                        <div className="App">
                            <AntCollection />
                        </div>
                    </div>
                }
                {
                    !isAuthenticated() && (
                        <div className="container column">
                            <h5>Welcome to Ant Racing 3000</h5>
                            <h5>
                                You are not logged in! Please{' '}
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.login}
                                    href="#"
                                >
                                    Log In
                </a>
                                {' '}to continue.
              </h5>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Home;