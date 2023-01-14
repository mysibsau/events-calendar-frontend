import React, { useEffect, useState } from 'react'
import { Button, Input, Select, useNotification } from '../../../components/UI';
import { usePersonalStore } from '../../../stores';
import "./AddPersonal.scss";


interface IProps {
    personal: "authors" | "moderators"
}

const personalStatusOpt = [
    {
        id: "0",
        name: "Студент"
    },
    {
        id: "1",
        name: "Сотрудник"
    }
]

const AddPersonal: React.FC<IProps> = ({ personal }) => {
    const { addPersonal, inviteLink } = usePersonalStore(state => state);
    const { addNotific } = useNotification()

    const [personalStatus, setPersonalStatus] = useState(personalStatusOpt[0].id)
    const [position, setPosition] = useState("")

    useEffect(() => {
        setPosition("")
    }, [personalStatus])

    const addPersonalHandler = () => {
        if (personal === 'authors') {
            addPersonal(0, { status: parseInt(personalStatus), position: position })
        } else {
            addPersonal(1, { status: parseInt(personalStatus), position: position })
        }
    }

    const copyTextHandler = () => {
        if (inviteLink) {
            navigator.clipboard.writeText(`http://localhost:3000/?invite=${inviteLink}`)
            addNotific({ title: "Успех!", body: "Ссылка успешно скопирована!", type: "success" })
        }
    }

    return (
        <div className={"addPersonal-container"}>
            <div>
                <p>
                    Введите необходимые данные, чтобы получить ссылку. <br />
                    Эту ссылку отправьте новому участику. <br />
                    Чтобы войти в сервис ему нужно только ввести логин и пароль от сервиса pallada.
                </p>
            </div>
            <div className={"inputs-container"}>
                <div>
                    <label>Выберите статус</label>
                    <Select options={personalStatusOpt} setValue={setPersonalStatus} value={personalStatus} />
                </div>
                <div>
                    <label>Введите {personalStatus === "0"
                        ? <>группу и институт</>
                        : <>должность</>
                    }</label>
                    <Input type={"text"} value={position} onChange={setPosition} />
                </div>
            </div>
            <div className={"button-container"}>
                <Button onClick={addPersonalHandler} variant={`${position.length ? "primary" : "disabled"}`}>Получить ссылку</Button>
            </div>
            {inviteLink &&
                <div className={"inviteLink-container"}>
                    <span onClick={copyTextHandler}>
                        http://localhost:3000/?invite={inviteLink}
                    </span>
                </div>
            }
        </div>
    )
}

export default AddPersonal