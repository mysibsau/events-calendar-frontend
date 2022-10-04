import React, { useEffect, useState } from 'react';
import MyButton from '../../components/UI/MyButton';
import "./CreateEnevntPage.scss";
import { ICreateEvnet } from '../../types/events';
import { useNotification } from '../../components/UI/MyNotification/useNotification';
import { useEventsStore } from '../../stores';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { useParams } from 'react-router-dom';


const defaultData: ICreateEvnet = {
    name: "",
    place: "",
    hours_count: -1,
    coverage_participants_plan: -1,
    description: "",
    //
    start_date: "",
    stop_date: "",
    //
    educational_work_in_opop: false,
    direction: -1,
    format: -1,
    organization: -1,
    level: -1,
    role: -1,
}

interface IProps {
    edited: boolean;
}

const CreateEnevntPage: React.FC<IProps> = ({ edited }) => {
    const { addToast } = useNotification()
    const { createEvent, getEvent } = useEventsStore(state => state)

    const [isEdited, setIsEdited] = useState({ edited: edited, eventId: "" })
    const [loading, setLoading] = useState(edited)

    const [step, setStep] = useState<number>(1)
    const [data, setData] = useState<ICreateEvnet>(defaultData)

    const nextStepHandler = () => {
        if (step === 1) {
            if (data.name.length === 0) {
                addToast("Ошибка", "Введите название мероприятия", "danger")
                return
            }
            if (data.place.length === 0) {
                addToast("Ошибка", "Введите место прохождения мероприятия", "danger")
                return
            }
            if (data.description.length === 0) {
                addToast("Ошибка", "Введите описание мероприятия", "danger")
                return
            }
            if (data.coverage_participants_plan === -1) {
                addToast("Ошибка", "Введите ожидаемый охват участников", "danger")
                return
            }
            if (data.hours_count === -1) {
                addToast("Ошибка", "Введите количество часов", "danger")
                return
            }
        } else if (step === 2) {
            if (data.start_date.length === 0) {
                addToast("Ошибка", "Введите начальную дату", "danger")
                return
            }
            if (data.stop_date.length === 0) {
                addToast("Ошибка", "Введите конечную", "danger")
                return
            }
        } else if (step === 3) {
            if (data.direction === -1) {
                addToast("Ошибка", "Выберите направление мероприятия", "danger")
                return
            }
            if (data.role === -1) {
                addToast("Ошибка", "Выберите роль СибГУ", "danger")
                return
            }
            if (data.level === -1) {
                addToast("Ошибка", "Выберите уровень мероприятия", "danger")
                return
            }
            if (data.format === -1) {
                addToast("Ошибка", "Выберите формат мероприятия", "danger")
                return
            }
            if (data.organization === -1) {
                addToast("Ошибка", "Выберите ответственное подразделение", "danger")
                return
            }
        }

        setStep(step + 1)
    }

    const createEventHandler = () => {
        createEvent(data, isEdited)
        setData(defaultData)
        setStep(1)
    }

    const params = useParams()

    useEffect(() => {
        if (params.eventId && loading) {
            getEvent(params.eventId).then((resp) => {
                setData({
                    ...defaultData,
                    name: resp.name,
                    place: resp.place,
                    hours_count: resp.hours_count,
                    coverage_participants_plan: resp.coverage_participants_plan,
                    description: resp.description,
                    //
                    start_date: resp.start_date,
                    stop_date: resp.stop_date,
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

    return (
        <main className={"create-event"}>
            <h1>Создание мероприятия</h1>
            {!loading
                ? <>
                    <div className={"create-event-container"}>
                        <div className={"create-form"}>
                            <div className={"step-container"}>
                                {step === 1 && <StepOne data={data} setData={setData} />}
                                {step === 2 && <StepTwo data={data} setData={setData} />}
                                {step === 3 && <StepThree data={data} setData={setData} />}
                                {step === 4 && <StepFour />}
                            </div>
                        </div>
                    </div>
                    <div className={"select-step-container"}>
                        {step > 1 && <MyButton variant={"secondary"} onClick={() => setStep(step - 1)}>Назад</MyButton>}
                        {step < 4
                            ? <MyButton variant={"primary"} onClick={nextStepHandler}>Далее</MyButton>
                            : <MyButton variant={"primary"} onClick={createEventHandler} >Сохранить</MyButton>
                        }
                    </div>
                </>
                : <h2>Загрузка...</h2>
            }
        </main >
    )
}

export default CreateEnevntPage