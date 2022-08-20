import React, { useState } from 'react';
import MyInput from '../../../components/UI/MyInput';
import { useAuthStore } from '../../../stores';
import { ICreateEvnet } from '../../../types/event';
import "./StepFour.scss";


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepFour: React.FC<IProps> = ({ data, setData }) => {
    const { user } = useAuthStore(state => state)

    const [post, setPost] = useState("")
    const [phone, setPhone] = useState("")
    const [telegramm, setTelegramm] = useState("")
    const [vk, setVk] = useState("")

    const handler = (val: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = val.target
    }

    return (
        <div className={"stepFour-container"}>
            <div>
                <label htmlFor="">Ответственное лицо: </label>
                <span className={"responsible"}>{user.name} (вы)</span>
            </div>
            <div>
                <label htmlFor={""}>Ваша должность: </label>
                <div className={"radio-container"}>
                    <div>
                        <label htmlFor="roleOrganizer">Организатор</label>
                        <input
                            id="roleOrganizer"
                            type="radio"
                            name="role"
                            onChange={(e) => handler(e)}
                            value={"organizer"}
                            // checked={role === 0}
                        />
                    </div>
                    <div>
                        <label htmlFor="roleCoOrganizer">Соорганизатор</label>
                        <input
                            id="roleCoOrganizer"
                            type="radio"
                            name="role"
                            onChange={(e) => handler(e)}
                            value={"coOrganizer"}
                            // checked={role === 1}
                        />
                    </div>
                </div>

            </div>
            <div>
                <label htmlFor="">Должность \ Группа и институт</label>
                <MyInput type={"text"} value={post} onChange={setPost} />
            </div>
            <div>
                <label htmlFor="">Номер телефона</label>
                <MyInput type={"text"} value={phone} onChange={setPhone} />
            </div>
            <div>
                <label htmlFor="">Ссылка на телеграмм аккаунт</label>
                <MyInput type={"text"} value={telegramm} onChange={setTelegramm} />
            </div>
            <div>
                <label htmlFor="">Ссылка на ВК</label>
                <MyInput type={"text"} value={vk} onChange={setVk} />
            </div>
        </div>
    )
}

export default StepFour