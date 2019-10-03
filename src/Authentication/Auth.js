import auth0 from 'auth0-js';
import history from './history';
import config from './config.json';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: config.domain,
        clientID: config.clientID,
        redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : config.callback,
        audience: config.audience,
        responseType: 'token id_token',
        scope: 'openid'
    });

    login = () => {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/home');
            } else if (err) {
                history.replace('/home');
            }
        });
    }

    setSession = (authResult) => {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        history.replace('/home');
    }

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        const returnTo = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/home' : config.logoutCallback;
        this.auth0.logout({ returnTo: returnTo, clientID: config.clientID });
    }

    isAuthenticated = () => {
        const expiration = localStorage.getItem('expires_at');
        let expiresAt = JSON.parse(expiration);
        return new Date().getTime() < expiresAt;
    }
}