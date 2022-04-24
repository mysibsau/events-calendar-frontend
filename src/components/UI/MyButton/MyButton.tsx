import React from 'react';
import './MyButton.scss'

export enum ButtonVariant{
    primary='primary',
    default='default',
    disabled='disabled'
}

interface MyButtonProps {
    variant: ButtonVariant;
    disabled?: boolean
    onClick?: () => void;
    id?: string;
}

const defaultClickFun = () => {}

const MyButton: React.FC<MyButtonProps> = ({id, disabled, variant, onClick = defaultClickFun, children}) => {
    return (
        <button onClick={() => onClick()} id={id} className={variant} disabled={disabled}>{children}</button>
    );
};

export default MyButton;