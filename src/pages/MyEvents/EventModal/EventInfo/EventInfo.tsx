import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, ColorTypes } from '../../../../components/UI';
import { useAuthStore, useEventsStore } from '../../../../stores';
import { IEvent } from '../../../../types/events'
import "./EventInfo.scss";


interface IProps {
    event: IEvent;
}

interface IElipsData {
    color: ColorTypes;
    message: string;
}

const EventInfo: React.FC<IProps> = ({ event }) => {
    const {
        rolesList,
        levelsList,
        formatsList,
        directionList,
        organizationsList,
        verifiedEvent
    } = useEventsStore(state => state)
    const { user } = useAuthStore(state => state)
    
    const navigate = useNavigate()

    const [role, setRole] = useState("")
    const [level, setLevel] = useState("")
    const [format, setFormat] = useState("")
    const [direction, setDirection] = useState("")
    const [organization, setOrganization] = useState("")

    useEffect(() => {
        if (rolesList.length && levelsList.length && formatsList.length && directionList.length && organizationsList.length) {
            setRole(rolesList.filter(item => item.id === event.role)[0].name)
            setLevel(levelsList.filter(item => item.id === event.level)[0].name)
            setFormat(formatsList.filter(item => item.id === event.format)[0].name)
            setDirection(directionList.filter(item => item.id === event.direction)[0].name)
            setOrganization(organizationsList.filter(item => item.id === event.organization)[0].name)
        }
    }, [event, rolesList, levelsList, formatsList, directionList, organizationsList])

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
                    <p>{direction}</p>
                </div>
                <div>
                    <h5>Уровень мероприятия</h5>
                    <p>{level}</p>
                </div>
                <div>
                    <h5>Роль СибГУ</h5>
                    <p>{role}</p>
                </div>
                <div>
                    <h5>Формат мероприятия</h5>
                    <p>{format}</p>
                </div>
                <div>
                    <h5>Ответственное подразделение</h5>
                    <p>{organization}</p>
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
            <div className='buttons-container'>
                {(event.status === "2" || event.status === "4") && event.author_id === user.id ? <Button variant={"success"} onClick={() => navigate(`/create-report/${event.id}`)}>Создать отчет</Button> : null}
                {event.status === "1" && user.role === 1 ? <Button variant={"success"} onClick={() => verifiedEvent(event.id, true)}>Верифицировать</Button> : null}
                {event.status === "1" && user.role === 1 ? <Button variant={"danger"} onClick={() => verifiedEvent(event.id, false)}>Отклонить</Button> : null}
            </div>
        </div>
    )
}

export default EventInfo