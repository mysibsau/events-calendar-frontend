import "./CreateReportPage.scss"
import React, { useEffect, useState } from 'react';
import { IReport } from '../../types/report';
import { useEventsStore } from '../../stores';
import CreateReportStep from "./CreateReportStep";
import InformationAboutReport from "./InformationAboutReport";
import { useNavigate, useParams } from "react-router-dom";
import { IEvent } from "../../types/events";
import { Button } from "../../components/UI";


interface IProps {
    edited: boolean
}

const CreateReportPage: React.FC<IProps> = ({ edited }) => {
    const { createReport, getEvent } = useEventsStore(state => state)

    const params = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(edited)
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
            navigate("/events/")
        }
    };

    useEffect(() => {
        if (params.eventId) {
            getEvent(params.eventId).then((res) => {
                setEvent(res)
                setLoading(false)
            })
        }
    }, [params])

    return (
        <main className={"create-event"}>
            <h1>Создание отчёта</h1>
            {!loading
                ? <>
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
                                {step === 1 ? <CreateReportStep setData={setData} /> : null}
                                {step === 2 && event ? <InformationAboutReport event={event} /> : null}
                            </div>
                        </div>
                    </div>
                </>
                : <h2>Загрузка...</h2>
            }
        </main >
    )
}

export default CreateReportPage