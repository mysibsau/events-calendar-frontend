import React, { ChangeEvent, useState } from "react";

import "./Input.scss";


type TInput = "text" | "number" | "date" | "time" | "password" | "datetime-local"

interface IProps {
    type: TInput;
    value: string | number;
    onChange: (value: string) => void;
    inputIcon?: JSX.Element;
    placeholder?: string;
    id?: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
}

const Input: React.FC<IProps> = ({ inputIcon, placeholder, type, id, value, onChange, required, readonly, disabled }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`input-container ${inputIcon ? "icon" : ""}`}>
            {disabled && <div className="disabled"></div>}
            <input
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type === "password" && showPassword ? "text" : type}
                id={id}
                required={required}
                readOnly={readonly}
            />
            {inputIcon
                ? <span onClick={() => {
                    if (type === "password") {
                        setShowPassword(!showPassword);
                    }
                }}>{inputIcon}</span>
                : null
            }
        </div>
    );
};

export default Input;