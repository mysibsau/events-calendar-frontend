import React from 'react';
import './MyLoader.scss'

const MyLoader = () => {
    const loaderImg = require('../../../assets/loader.png')

    return (
        <div className={'loader'}>
            <img src={loaderImg} alt=""/>
        </div>
    );
};

export default MyLoader;