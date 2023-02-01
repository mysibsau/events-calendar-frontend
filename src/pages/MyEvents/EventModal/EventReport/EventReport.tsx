import React, { useState } from 'react'
import { Button, Modal } from '../../../../components/UI';
import { useAuthStore, useEventsStore } from '../../../../stores';
import { IEventStatus } from '../../../../types/events';
import { IReport } from '../../../../types/report';
import RejectModal from '../RejectModal';
import "./EventReport.scss";


interface IProps {
    report: IReport;
    eventId: number;
    eventStatus: IEventStatus;
    authorId: number; 
    comment?: string;
}

const EventReport: React.FC<IProps> = ({ report, eventId, eventStatus, comment, authorId }) => {

    const { generateReport, verifiedEvent } = useEventsStore(state => state)
    const { user } = useAuthStore(state => state)

    const [showRejectModal, setShowRejectModal] = useState(false)

    const onConfirmRejectModal = (msg?: string) => {
        if (msg) {
            verifiedEvent(eventId, false, msg)
        }

        setShowRejectModal(false)
    }

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
                <h5>Количественные показатели: </h5>
                <p>{report.count_index}</p>
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
            {comment
                ? <div className='comment'>
                    <h5>Комментарий отклонения:</h5>
                    <p>{comment}</p>
                </div>
                : null
            }
            <div className='buttons-container'>
                {authorId === user.id && (eventStatus === "5" || eventStatus === "4")
                    ? <Button variant={"primary"} onClick={() => window.location.href = `/edit-report/${eventId}`}>Редактировать</Button> : null
                }
                {user.role === 1
                    ? <>
                        {eventStatus === "3" ? <Button variant={"success"} onClick={() => generateReport(eventId)}>Загрузить отчет</Button> : null}
                        {eventStatus === "5" ? <Button variant={"success"} onClick={() => verifiedEvent(eventId, true)}>Верифицировать отчет</Button> : null}
                        {eventStatus === "5" ? <Button variant={"danger"} onClick={() => setShowRejectModal(true)}>Отклонить отчет</Button> : null}
                    </>
                    : null
                }
            </div>
            <Modal isShow={showRejectModal} setIsShow={setShowRejectModal} title={`Отклонение отчета`}>
                <RejectModal onConfirm={onConfirmRejectModal} />
            </Modal>
        </div >
    )
}

export default EventReport