import React, { useState } from 'react'
import "./CreateReportModal.scss";
import MyButton from '../../../components/UI/MyButton'
import MyInput from '../../../components/UI/MyInput'
import MyTextarea from '../../../components/UI/MyTextarea'
import { useEventsStore } from '../../../stores'
import { IOrganizators } from '../../../types/events'


interface IProps {
    eventId: string
}

const CreateReportModal: React.FC<IProps> = ({ eventId }) => {
    const { createReport } = useEventsStore(state => state)

    const [peopleFact, setPeopleFact] = useState("")
    const [links, setLinks] = useState("")
    const [nameOrganizer, setNameOrganizer] = useState("")
    const [position, setPosition] = useState("")
    const [description, setDescription] = useState("")

    const [organizators, setOrganizators] = useState<IOrganizators[]>([])

    const saveReport = () => {
        createReport(
            eventId, {
            coverage_participants_fact: parseInt(peopleFact),
            links: links,
            organizators: organizators
        })
    }

    const addOrganizatorsHandler = () => {
        setOrganizators(prev => ([
            ...prev,
            {
                name: nameOrganizer,
                position: position,
                description: description
            }
        ]))

        setDescription("")
        setNameOrganizer("")
        setPosition("")
    }

    return (
        <div className={"createReport-container"}>
            <div>
                <div className={"input-container"}>
                    <label htmlFor="">Охват участников по факту:</label>
                    <MyInput type={"number"} value={peopleFact} onChange={setPeopleFact} />
                </div>
                <div className={"input-container"}>
                    <label htmlFor="">Ссылки на материалы в интернете:</label>
                    <MyTextarea value={links} onChange={setLinks} />
                </div>
                <div>
                    <div>
                        <div className={"input-container"}>
                            <label htmlFor="">Имя организатора:</label>
                            <MyInput type={"text"} value={nameOrganizer} onChange={setNameOrganizer} />
                        </div>
                        <div className={"input-container"}>
                            <label htmlFor="">Должность:</label>
                            <MyInput type={"text"} value={position} onChange={setPosition} />
                        </div>
                    </div>
                    <div>
                        <div className={"input-container"}>
                            <label htmlFor="">Описание (что делал):</label>
                            <MyTextarea value={description} onChange={setDescription} />
                        </div>
                        <div>
                            <MyButton variant={"primary"} onClick={addOrganizatorsHandler}>Добавить</MyButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"organizatorsList-container"}>
                {organizators.map(item =>
                    <details>
                        <summary><span>{item.name}</span><span>{item.position}</span></summary>
                        <p>{item.description}</p>
                    </details>
                )}
            </div>
        </div>
    )
}

export default CreateReportModal