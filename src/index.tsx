import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


axios.defaults.baseURL = 'https://api-calendar.mysibsau.ru/v1/';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

