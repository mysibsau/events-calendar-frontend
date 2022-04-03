import React, { ChangeEvent } from 'react';

import './MyInput.scss';


interface InputProps {
    img?: string;
    type: string;
    placeholder: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
}

const MyInput: React.FC<InputProps> = ({img, placeholder, type, id, value, onChange}) => {
    return(
        <div className={'input-container'}>
            <span style={{
                background: `url(${img})`
            }}></span>
            <input
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                id={id}
            />
        </div>
    );
};

export default MyInput;