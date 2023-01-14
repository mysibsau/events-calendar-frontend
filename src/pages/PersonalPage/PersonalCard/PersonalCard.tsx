import React from "react";
import { IconCloseX } from "../../../components/UI/Icons";
import { IPersonal } from "../../../types/personal";
import "./PersonalCard.scss";

interface IProps {
  author: IPersonal;
}

const personalStatus: Record<string, string> = {
  "0": "Студент",
  "1": "Сотрудник",
};

const PersonalCard: React.FC<IProps> = ({ author }) => {
  const deleteAuthorHandler = () => {
    if (window.confirm("Вы уверены что хотите удалть этого автора?")) {
      console.log(author.id);
    }
  };

  return (
    <div className={"authorCard-container"}>
      <h3>
        {author.first_name} {author.last_name}
      </h3>
      <div className={"contact-info"}>
        {personalStatus[author.status]}, {author.position}
      </div>
      <div className={"contact-info"}>{author.contacts_info || "телефон не указан"}</div>
      <div className={"icon-delete"} onClick={deleteAuthorHandler}>
          <IconCloseX color={"black"} size={25} />
      </div>
    </div>
  );
};

export default PersonalCard;
