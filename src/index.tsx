import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './authentication/Routes';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';

ReactDOM.render(<Routes />, document.getElementById('root'));
serviceWorker.unregister();