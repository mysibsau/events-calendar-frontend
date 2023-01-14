import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/UI';
import { useAuthStore, useEventsStore } from '../../../../stores';
import { IEventStatus } from '../../../../types/events';
import { IReport } from '../../../../types/report';
import "./EventReport.scss";


interface IProps {
    report: IReport;
    eventId: number;
    eventStatus: IEventStatus;
    authorId: number
}

const EventReport: React.FC<IProps> = ({ report, eventId, eventStatus, authorId }) => {

    const { generateReport, verifiedEvent } = useEventsStore(state => state)
    const { user } = useAuthStore(state => state)

    const navigate = useNavigate()

    return (
        <div className='event-report-container'>
            <div className={"info"}>
                <div>
                    <h5>Место проведения по факту</h5>
                    <p>{report.place_fact}</p>
                </div>
                <div>
                    <h5>Охват учасников по факту</h5>
                    <p>{report.coverage_participants_fact}</p>
                </div>
                <div>
                    <h5>Даты проведения по факту</h5>
                    <p>{report.start_date_fact === report.stop_date_fact
                        ? <span>{new Date(report.start_date_fact).toLocaleString().split(",")[0]}</span>
                        : <span>с {new Date(report.start_date_fact).toLocaleString().split(",")[0]} по {new Date(report.stop_date_fact).toLocaleString().split(",")[0]}</span>
                    }</p>
                </div>
            </div>
            <div className='description'>
                <h5>Ссылки на источники в интернете: </h5>
                <p>{report.links}</p>
            </div>
            <div className='organizators-container'>
                <h5>Организаторы: </h5>
                <div className='organizators-list'>
                    {report.organizators.map((item, index) =>
                        <div className='ogranizator-item' key={index}>
                            <div className='organizator-name'>{item.name}</div>
                            <div>{item.position}</div>
                            <div>{item.description}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className='buttons-container'>
                {eventStatus === "3" ? <Button variant={"success"} onClick={() => generateReport(eventId)}>Загрузить отчет</Button> : null}
                {eventStatus === "5" && user.role === 1 ? <Button variant={"success"} onClick={() => verifiedEvent(eventId, true)}>Верифицировать отчет</Button> : null}
                {eventStatus === "5" && user.role === 1 ? <Button variant={"danger"} onClick={() => verifiedEvent(eventId, false)}>Отклонить отчет</Button> : null}
            </div>
        </div>
    )
}

export default EventReport