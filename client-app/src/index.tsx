import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './app/layout/ScrollToTop';

ReactDOM.render(
    <BrowserRouter>
        <ScrollToTop>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ScrollToTop>
    </BrowserRouter>,
    document.getElementById('root')
);
