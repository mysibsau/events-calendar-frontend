import React, { useEffect, useState } from 'react';
import MyInput from '../../../components/UI/MyInput';
import { useAuthStore } from '../../../stores';
import { IUpdateUser, TStatus } from '../../../types/auth';
import { ICreateEvnet } from '../../../types/event';
import "./StepFour.scss";


interface IProps {
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepFour: React.FC<IProps> = ({ setData }) => {
    const { user, updateUser } = useAuthStore(state => state)

    const [position, setPosition] = useState(user.position ? user.position : "")
    const [phone, setPhone] = useState(user.contacts && user.contacts.phone ? user.contacts.phone : "")
    const [status, setStatus] = useState<TStatus>(user.personal_status)
    const [messenger, setMessenger] = useState(user.contacts.messenger_link ? user.contacts.messenger_link : "")

    useEffect(() => {
        const contacts = {
            phone: phone,
            messenger_link: messenger
        }

        const data: IUpdateUser = {
            contacts: contacts
        }

        setData(prev => ({
            ...prev,
            responsible: user.name,
            author: user.id
        }))

        updateUser(data)        
    }, [position, phone, messenger, status])

    return (
        <div className={"stepFour-container"}>
            <div>
                <label htmlFor="">Ответственное лицо: </label>
                <span className={"responsible"}>{user.name} (вы)</span>
            </div>
            <div>
                <label htmlFor={""}>Ваша должность: 
                <span className={"responsible"}>{user.personal_status}</span>
                </label>
            </div>
            <div>
                <label htmlFor="">{status === 0
                    ? <>Должность: </>
                    : <>Группа и институт: </>
                }</label>
                <span className={"responsible"}>{user.position}</span>
            </div>
            <div>
                <label htmlFor="">Номер телефона</label>
                <MyInput type={"text"} value={phone} onChange={setPhone} />
            </div>
            <div>
                <label htmlFor="">Ссылка на соцсети</label>
                <MyInput type={"text"} value={messenger} onChange={setMessenger} />
            </div>
        </div>
    )
}

export default StepFour