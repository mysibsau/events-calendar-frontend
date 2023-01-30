import React, { useEffect, useState } from 'react'
import { Button, ColorTypes, Modal } from '../../../../components/UI';
import { useAuthStore, useEventsStore } from '../../../../stores';
import { IEvent } from '../../../../types/events'
import RejectModal from '../RejectModal';
import "./EventInfo.scss";


interface IProps {
    event: IEvent;
}

interface IElipsData {
    color: ColorTypes;
    message: string;
}

const EventInfo: React.FC<IProps> = ({ event }) => {
    const { verifiedEvent } = useEventsStore(state => state)
    const { user } = useAuthStore(state => state)

    const [showRejectModal, setShowRejectModal] = useState(false)

    const elipceData = (): IElipsData => {
        switch (event!.status) {
            case "0":
                return { color: "danger", message: "Отклонено" }
            case "1":
                return { color: "default", message: "В обработке" }
            case "2":
                return { color: "warning", message: "В ожидании отчета" }
            case "3":
                return { color: "success", message: "Верефицировано" }
            case "4":
                return { color: "danger", message: "Отклонен отчет" }
            case "5":
                return { color: "primary", message: "В ожидании верификации отчета" }
            default:
                return { color: "default", message: "В обработке" }
        }
    }

    const onConfirmRejectModal = (msg?: string) => {
        if (msg) {
            verifiedEvent(event.id, false, msg)
        }

        setShowRejectModal(false)
    }

    return (
        <div className={"event-info-container"}>
            <div className={"info"}>
                <div>
                    <h5>Место проведения</h5>
                    <p>{event.place}</p>
                </div>
                <div>
                    <h5>Количество часов</h5>
                    <p>{event.hours_count}</p>
                </div>
                <div>
                    <h5>Охват учасников по плану</h5>
                    <p>{event.coverage_participants_plan}</p>
                </div>
                <div>
                    <h5>Даты проведения</h5>
                    <p>{event.start_date === event.stop_date
                        ? <span>{new Date(event.start_date).toLocaleString().split(",")[0]}</span>
                        : <span>с {new Date(event.start_date).toLocaleString().split(",")[0]} по {new Date(event.stop_date).toLocaleString().split(",")[0]}</span>
                    }</p>
                </div>
                <div>
                    <h5>Ответственное лицо</h5>
                    <p>{event.author_name}</p>
                </div>
                <div>
                    <h5>Воспитательные работы</h5>
                    <p>{event.educational_work_in_opop ? "В рамках ОПОП" : "За пределами ОПОП"}</p>
                </div>
                <div>
                    <h5>Направление воспитательной работы</h5>
                    <p>{event.direction}</p>
                </div>
                <div>
                    <h5>Уровень мероприятия</h5>
                    <p>{event.level}</p>
                </div>
                <div>
                    <h5>Роль СибГУ</h5>
                    <p>{event.role}</p>
                </div>
                <div>
                    <h5>Формат мероприятия</h5>
                    <p>{event.format}</p>
                </div>
                <div>
                    <h5>Ответственное подразделение</h5>
                    <p>{event.organization}</p>
                </div>
                <div>
                    <h5>Статус верификации</h5>
                    <p>{elipceData().message}</p>
                </div>
            </div>
            <div className='description'>
                <h5>Описание мероприятия:</h5>
                <p>{event.description}</p>
            </div>
            {event.comment && event.status === "0"
                ? <div className='comment'>
                    <h5>Комментарий отклонения:</h5>
                    <p>{event.comment}</p>
                </div>
                : null
            }
            <div className='buttons-container'>
                {(event.status === "2" || event.status === "4")
                    && event.author_id === user.id
                    ? <Button variant={"success"} onClick={() => window.location.href = `/create-report/${event.id}`}>Создать отчет</Button>
                    : null
                }
                {event.status === "1" && user.role === 1 ? <Button variant={"success"} onClick={() => verifiedEvent(event.id, true)}>Верифицировать</Button> : null}
                {event.status === "1" && user.role === 1 ? <Button variant={"danger"} onClick={() => setShowRejectModal(true)}>Отклонить</Button> : null}
            </div>
            <Modal isShow={showRejectModal} setIsShow={setShowRejectModal} title={`Отклонение мероприятия: ${event.name}`}>
                <RejectModal onConfirm={onConfirmRejectModal} />
            </Modal>
        </div>
    )
}

export default EventInfo