import React from 'react';
import './MyLoader.scss'

interface IProps{
    width: number;
    height: number;
}

const MyLoader:React.FC<IProps> = ({width, height}) => {
    const loaderImg = require('../../../assets/loader.png')

    return (
        <div className={'loader'}>
            <img src={loaderImg} alt="" style={{width: width, height: height}}/>
        </div>
    );
};

export default MyLoader;