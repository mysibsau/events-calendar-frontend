import React from 'react'
import { IconCloseX } from '../../../assets/Icons';
import Tooltip from '../../../components/UI/Tooltip';
import { IAuth } from '../../../types/auth';
import "./PersonalCard.scss";


interface IProps {
    author: IAuth
}

const personalStatus: Record<string, string> = {
    "-1": "Студент",
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
                <h3>{author.name}</h3>
            </div>
            <div>
                Должность:
                <span className={"contact-info"}>
                    {personalStatus[author.status]}, ИИТК МПА22-01{author.position}
                </span>
            </div>
            <div>
                Телефон:
                <span className={"contact-info"}>
                    89994445566
                    {author.contacts.phone}
                </span>
            </div>
            <div>
                Ссылка на мессенджер:
                <span className={"contact-info"}>
                    www.asd.wqe
                    {author.contacts.messenger_link}
                </span>
            </div>
            <div className={"icon-delete"} onClick={deleteAuthorHandler}>
                <Tooltip text={"удалить пользователя"}>
                    <IconCloseX color={"gray"} size={30}/>
                </Tooltip>
            </div>
        </div>
    )
}

export default PersonalCard