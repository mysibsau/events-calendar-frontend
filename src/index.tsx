import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


axios.defaults.baseURL = "https://calendar-backend.mysibsau.ru/v1/";

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

