import React from "react";
import "./MyNotification.scss";
import NotificationItem from "./NotificationItem";
import { useNotification } from "./useNotification";



const MyNotification = () => {
    const { position, toastList } = useNotification();

    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    toastList.map((toast) =>
                        <NotificationItem toast={toast} key={toast.id} />
                    )
                }
            </div>
        </>
    );
};

export default MyNotification;