import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import ScrollToTop from './app/layout/ScrollToTop';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-widgets/dist/css/react-widgets.css';

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <ScrollToTop>
            {/*<React.StrictMode>*/}
                <App />
            {/*</React.StrictMode>*/}
        </ScrollToTop>
    </Router>,
    document.getElementById('root')
);
