import "./CreateReportPage.scss"
import React, { useEffect, useState } from 'react';
import { IReport } from '../../types/report';
import { useEventsStore } from '../../stores';
import CreateReportStep from "./CreateReportStep";
import InformationAboutReport from "./InformationAboutReport";
import { useParams } from "react-router-dom";
import { IEvent } from "../../types/events";
import { Button } from "../../components/UI";


const CreateReportPage = () => {
    const { createReport, getEvent, getReport } = useEventsStore(state => state)

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
        organizators: []
    })

    const saveReport = () => {
        if (params.eventId) {
            createReport(params.eventId, data);
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