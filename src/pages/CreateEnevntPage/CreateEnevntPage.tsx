import React, { useEffect, useState } from 'react';
import "./CreateEnevntPage.scss";
import { ICreateEvnet } from '../../types/events';
import { Button, Loader, useNotification } from '../../components/UI';
import { useEventsStore } from '../../stores';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useParams } from 'react-router-dom';


const defaultData: ICreateEvnet = {
    name: "",
    place: "",
    start_date: "",
    stop_date: "",
    hours_count: -1,
    coverage_participants_plan: -1,
    description: "",
    //
    educational_work_in_opop: false,
    direction: "",
    format: "",
    organization: "",
    level: "",
    role: "",
}

interface IProps {
    edited: boolean;
}

const CreateEnevntPage: React.FC<IProps> = ({ edited }) => {
    const { createEvent, getEvent } = useEventsStore(state => state)
    
    const { addNotific } = useNotification()
    
    const [isEdited, setIsEdited] = useState({ edited: edited, eventId: "" })
    const [loading, setLoading] = useState(edited)

    const [step, setStep] = useState<number>(0)
    const [data, setData] = useState<ICreateEvnet>(defaultData)

    const createEventHandler = () => {
        let errorMsg = "";
        if (!data.name.length) {
            errorMsg = "Введите название мероприятия"
        } else if (!data.place.length) {
            errorMsg = "Введите место проведения мероприятия"
        } else if (!data.start_date.length) {
            errorMsg = "Введите начальную дату мероприятия"
        } else if (!data.stop_date.length) {
            errorMsg = "Введите конечную дату мероприятия"
        } else if (!data.coverage_participants_plan) {
            errorMsg = "Введите охват учасников"
        } else if (!data.hours_count && data.educational_work_in_opop) {
            errorMsg = "Введите количество часов"
        } else if (!data.description.length) {
            errorMsg = "Введите описание мероприятия"
        } else if (!data.direction.length) {
            errorMsg = "Выберите направление воспитательных работ"
        } else if (!data.role.length) {
            errorMsg = "Выберите роль СибГУ"
        } else if (!data.level.length) {
            errorMsg = "Выберите уровень мероприятия"
        } else if (!data.format.length) {
            errorMsg = "Выберите формат мероприятия"
        } else if (!data.organization.length) {
            errorMsg = "Выберите ответственное подразделение"
        }

        if (errorMsg.length) {
            addNotific({
                type: "danger",
                title: "Ошибка",
                body: errorMsg
            })
        } else {
            createEvent(data, isEdited)
        }
    }

    const params = useParams()

    useEffect(() => {
        if (params.eventId && loading) {
            getEvent(params.eventId).then((resp) => {
                setData({
                    ...defaultData,
                    name: resp.name,
                    place: resp.place,
                    start_date: resp.start_date,
                    stop_date: resp.stop_date,
                    hours_count: resp.hours_count,
                    coverage_participants_plan: resp.coverage_participants_plan,
                    description: resp.description,
                    //
                    educational_work_in_opop: resp.educational_work_in_opop,
                    direction: resp.direction,
                    format: resp.format,
                    organization: resp.organization,
                    level: resp.level,
                    role: resp.role
                })

                setIsEdited({ edited: true, eventId: resp.id.toString() })
                setLoading(false)
            })
        }
    }, [params])

    if (loading) {
        return (
            <main className={"myEvents-container loader"}>
                <Loader />
            </main>
        )
    }

    return (
        <main className={"create-event"}>
            <h1>Создание мероприятия</h1>
            <div className='create-event-container'>
                <div className='create-event-switch-container'>
                    <ul>
                        <li className={step === 0 ? "active" : ""} onClick={() => setStep(0)}>Основная информация</li>
                        <li className={step === 1 ? "active" : ""} onClick={() => setStep(1)}>Организационная информация</li>
                    </ul>
                    <Button onClick={createEventHandler} variant={'primary'}>Сохранить</Button>
                </div>
                <div className='create-event-form-container'>
                    <div>
                        {step === 0 ? <StepOne data={data} setData={setData} /> : null}
                        {step === 1 ? <StepTwo data={data} setData={setData} /> : null}
                    </div>
                </div>
            </div>
        </main >
    )
}

export default CreateEnevntPage