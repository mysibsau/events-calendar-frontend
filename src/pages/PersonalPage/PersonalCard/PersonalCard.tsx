import React, { useState } from "react";
import { Modal } from "../../../components/UI";
import { IconCloseX } from "../../../components/UI/Icons";
import { IPersonal } from "../../../types/personal";
import DeletePersonalModal from "./DeletePersonalModal";
import "./PersonalCard.scss";

interface IProps {
    author: IPersonal;
}

const personalStatus: Record<string, string> = {
    "0": "Студент",
    "1": "Сотрудник",
};

const PersonalCard: React.FC<IProps> = ({ author }) => {
    const [deleteModal, setDeleteModal] = useState(false)

    return (
        <div className={"authorCard-container"}>
            <h3>
                {author.last_name} {author.first_name}
            </h3>
            <div className={"contact-info"}>
                {personalStatus[author.status]}, {author.position}
            </div>
            <div className={"contact-info"}>{author.contacts_info || "телефон не указан"}</div>
            <div className={"contact-info"}>
                {new Date(author.creation_date).toLocaleDateString()}
            </div>
            <div className={"icon-delete"} onClick={() => setDeleteModal(true)}>
                <IconCloseX color={"black"} size={25} />
            </div>
            <Modal isShow={deleteModal} setIsShow={setDeleteModal} title={`Удаление пользователя: ${author.last_name} ${author.first_name}`}>
                <DeletePersonalModal personalId={author.id} setShow={setDeleteModal} />
            </Modal>
        </div>
    );
};

export default PersonalCard;
