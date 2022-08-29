import React from 'react'
import { IconCloseX } from '../../../assets/Icons';
import Tooltip from '../../../components/UI/Tooltip';
import { IPersonal } from '../../../types/personal';
import "./PersonalCard.scss";


interface IProps {
    author: IPersonal
}

const personalStatus: Record<string, string> = {
    "0": "Студент",
    "1": "Сотрудник"
}

const PersonalCard: React.FC<IProps> = ({ author }) => {
    const deleteAuthorHandler = () => {
        if (window.confirm("Вы уверены что хотите удалть этого автора?")){
            console.log(author.id);   
        }
    }

    return (
        <div className={"authorCard-container"}>
            <div>
                <h3>{author.first_name} {author.last_name}</h3>
            </div>
            <div>
                Должность:
                <span className={"contact-info"}>
                    {personalStatus[author.status]}, {author.position}
                </span>
            </div>
            <div>
                Телефон:
                <span className={"contact-info"}>
                    {author.contacts_info}
                </span>
            </div>
            {/* <div>
                Ссылка на мессенджер:
                <span className={"contact-info"}>
                    {author.contacts}
                </span>
            </div> */}
            <div className={"icon-delete"} onClick={deleteAuthorHandler}>
                <Tooltip text={"удалить пользователя"}>
                    <IconCloseX color={"default"} size={30}/>
                </Tooltip>
            </div>
        </div>
    )
}

export default PersonalCard