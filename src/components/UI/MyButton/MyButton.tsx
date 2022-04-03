import React from 'react';
import './MyButton.scss'

export enum ButtonVariant{
    primary='primary',
    default='default'
}

interface MyButtonProps {
    variant: ButtonVariant;
    onClick: () => void;
    id?: string;
}

const MyButton: React.FC<MyButtonProps> = ({id, variant, onClick, children}) => {
    return (
        <button onClick={() => onClick()} id={id} className={variant}>{children}</button>
    );
};

export default MyButton;