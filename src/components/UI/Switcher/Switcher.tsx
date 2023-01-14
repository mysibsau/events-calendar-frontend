import React from 'react'
import "./Switcher.scss"

interface IProps {
    state: boolean;
    onClick?: () => void;
}

const Switcher: React.FC<IProps> = ({ state, onClick }) => {
    return (
        <div onClick={onClick} className={`switcher-container${state ? " active" : ""}`}>
            <div className={"switch"}></div>
        </div>
    )
}

export default Switcher