import React, { useState } from 'react'
import { Button } from '../../../../components/UI';
import { usePersonalStore } from '../../../../stores';
import "./DeletePersonalModal.scss";


interface IProps {
    personalId: string;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePersonalModal: React.FC<IProps> = ({ personalId, setShow }) => {
    const { deletePersonal, personalList } = usePersonalStore(state => state);

    const [userForTransfer, setUserForTransfer] = useState<string>()

    const deletePersonalHandler = () => {
        deletePersonal(personalId, userForTransfer!)
    }

    return (
        <div className={"delete-personal-modal-container"}>
            <div className={"delete-personal-label"}>
                Выберите пользователя, которому передать права
            </div>
            <div className={"delete-personal-list-container"}>
                {personalList.map(item =>
                    item.id !== personalId
                        ? <div key={item.id}>
                            <input type="radio" id={`transfer_user_${item.id}`} name={"transfer_users"} onChange={() => setUserForTransfer(item.id)} />
                            <label htmlFor={`transfer_user_${item.id}`}>{item.first_name} {item.last_name}</label>
                        </div>
                        : null
                )}
            </div>
            <div className={"delete-personal-buttons-container"}>
                <Button variant={"default"} onClick={() => setShow(false)}>Отмена</Button>
                <Button variant={userForTransfer ? "primary" : "disabled"} onClick={deletePersonalHandler}>Подтвердить</Button>
            </div>
        </div>
    )
}

export default DeletePersonalModal