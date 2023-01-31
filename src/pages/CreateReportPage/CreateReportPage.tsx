import "./CreateReportPage.scss"
import React, { useEffect, useState } from 'react';
import { IReport } from '../../types/report';
import { useEventsStore } from '../../stores';
import CreateReportStep from "./CreateReportStep";
import InformationAboutReport from "./InformationAboutReport";
import { useParams } from "react-router-dom";
import { IEvent } from "../../types/events";
import { Button, useNotification } from "../../components/UI";


const CreateReportPage = () => {
    const { createReport, getEvent, getReport } = useEventsStore(state => state)
    
    const { addNotific } = useNotification()

    const params = useParams()

    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState<IEvent>()
    const [step, setStep] = useState<number>(1)
    const [data, setData] = useState<IReport>({
        start_date_fact: "",
        stop_date_fact: "",
        place_fact: "",
        coverage_participants_fact: 0,
        links: "",
        organizators: [],
        count_index: ""
    })

    const saveReport = () => {
        if (params.eventId) {
            let errorMsg = "";
            if (!data.coverage_participants_fact) {
                errorMsg = "Введите фактический охват учасников"
            } else if (!data.place_fact.length) {
                errorMsg = "Введите фактическое место проведения мероприятия"
            } else if (!data.start_date_fact.length || !data.stop_date_fact.length) {
                errorMsg = "Введите фактические даты проведения"
            } else if (!data.count_index.length) {
                errorMsg = "Введите количествене показатели"
            } else if (!data.links.length) {
                errorMsg = "Введите ссыдки на материалы в интернете"
            } else if (!data.organizators.length) {
                errorMsg = "Добавьте организаторов мероприятия"
            }
    
            if (errorMsg.length) {
                addNotific({
                    type: "danger",
                    title: "Ошибка",
                    body: errorMsg
                })
            } else {
                createReport(params.eventId, data);
            }
        }
    };

    useEffect(() => {
        if (params.eventId) {
            getEvent(params.eventId).then((res) => {
                setEvent(res)

                if (res.status > "2") {
                    getReport(`${res.id}`).then((resp) => {
                        setData(resp)
                        setLoading(false)
                    })
                } else {
                    setLoading(false)
                }
            })
        }
    }, [])

    if (loading) {
        return (
            <main className={"create-event"}>
                <h1>Создание отчёта</h1>
                <h2>Загрузка...</h2>
            </main >
        )
    }

    return (
        <main className={"create-event"}>
            <h1>Создание отчёта</h1>
            <div className='create-event-container'>
                <div className='create-event-switch-container'>
                    <ul>
                        <li className={step === 1 ? "active" : ""} onClick={() => setStep(1)}>Cоздание отчёта</li>
                        <li className={step === 2 ? "active" : ""} onClick={() => setStep(2)}>Информация о мероприятии</li>
                    </ul>
                    <Button variant={'primary'} onClick={saveReport}>Сохранить</Button>
                </div>
                <div className='create-report-form-container'>
                    <div className={"step-container"}>
                        {step === 1 && event ? <CreateReportStep data={data} setData={setData} eventDateStart={event.start_date} /> : null}
                        {step === 2 && event ? <InformationAboutReport event={event} /> : null}
                    </div>
                </div>
            </div>
        </main >
    )
}

export default CreateReportPage