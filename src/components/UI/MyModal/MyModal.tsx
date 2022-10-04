import React from "react";
import "./MyModal.scss";
import classnames from "classnames";
import { IconCloseX } from "../../../assets/Icons";

interface IProps {
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    title?: string;
}

const MyModal: React.FC<IProps> = ({ title, children, isShow, setIsShow }) => {
    return (
        <div className={classnames("modalContainer", { "active": isShow })}>
            <div className={"modalContent"}>
                {title && <div className={"modalTitle"}>{title}</div>}

                <div className={"close"} onClick={() => setIsShow(false)}>
                    <IconCloseX color={"default"} size={25} />
                </div>
                <div className={"modal-body"}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;