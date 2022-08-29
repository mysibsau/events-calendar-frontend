import classnames from 'classnames';
import React, { useEffect, useState } from 'react'
import { IconArrowDown, IconArrowUp } from '../../../assets/Icons';
import { useNotification } from '../../../components/UI/MyNotification/useNotification';
import { useEventsStore } from '../../../stores'
import { IEvent } from '../../../types/events';
import "./EventModal.scss";


interface IProps {
    eventId: string;
    isShowEvent: boolean;
}

type menuSelect = "description" | "report";

const EventModal: React.FC<IProps> = ({ eventId, isShowEvent }) => {
    const {
        rolesList,
        levelsList,
        formatsList,
        directionList,
        organizationsList,
        getEvent
    } = useEventsStore(state => state)
    const { addToast } = useNotification()

    const [menuSelect, setMenuSelect] = useState<menuSelect>("description")
    const [role, setRole] = useState("")
    const [level, setLevel] = useState("")
    const [format, setFormat] = useState("")
    const [direction, setDirection] = useState("")
    const [organization, setOrganization] = useState("")

    const [event, setEvent] = useState<IEvent>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isShowEvent) {
            getEvent(eventId).then((resp) => {
                setLoading(false)
                setEvent(resp)
            })
        }
    }, [isShowEvent])

    useEffect(() => {
        if (event && !loading && rolesList.length && levelsList.length && formatsList.length && directionList.length && organizationsList.length) {
            setRole(rolesList.filter(item => item.id === event.role)[0].name)
            setLevel(levelsList.filter(item => item.id === event.level)[0].name)
            setFormat(formatsList.filter(item => item.id === event.format)[0].name)
            setDirection(directionList.filter(item => item.id === event.direction)[0].name)
            setOrganization(organizationsList.filter(item => item.id === event.organization)[0].name)
        }
    }, [event, rolesList, levelsList, formatsList, directionList, organizationsList])

    const eventStatus = () => {
        if (event) {
            switch (event.status) {
                case "0":
                    return "Отклонено"
                case "1":
                    return "В обработке"
                case "2":
                    return "В ожидании отчета"
                case "3":
                    return "Верефицировано"
            }
        }
    }

    return (
        <div>
            {!loading && event
                ? <div className={"eventModal-container"}>
                    <div className={"switch-container"}>
                        <div className={classnames("switch-item", { "active": menuSelect === "description" })} onClick={() => setMenuSelect("description")}>
                            Описание мероприятия
                            {menuSelect === "description"
                                ? <IconArrowDown color={"primary"} />
                                : <IconArrowUp color={"default"} />
                            }
                        </div>
                        <div className={classnames("switch-item", { "active": menuSelect === "report" })} onClick={() => {
                            if (event.status === "3") {
                                setMenuSelect("report")
                            } else {
                                addToast("Упс!", "Страница пока недоступна", "danger")
                            }
                        }}>
                            Отчет о проведении мероприятия
                            {menuSelect === "report"
                                ? <IconArrowDown color={"primary"} />
                                : <IconArrowUp color={"default"} />
                            }
                        </div>
                    </div>
                    <div className={"main-container"}>
                        <div className={"info"}>
                            <div>
                                <h3>Место проведения</h3>
                                <p>{event.place}</p>
                            </div>
                            <div>
                                <h3>Количество часов</h3>
                                <p>{event.hours_count}</p>
                            </div>
                            <div>
                                <h3>Охват учасников по плану</h3>
                                <p>{event.coverage_participants_plan}</p>
                            </div>
                            <div>
                                <h3>Даты проведения</h3>
                                <p>{event.start_date === event.stop_date
                                    ? <span>{new Date(event.start_date).toLocaleString().split(",")[0]}</span>
                                    : <span>с {new Date(event.start_date).toLocaleString().split(",")[0]} по {new Date(event.stop_date).toLocaleString().split(",")[0]}</span>
                                }</p>
                            </div>
                            <div>
                                <h3>Ответственное лицо</h3>
                                <p>{event.author}</p>
                            </div>
                            <div>
                                <h3>Воспитательные работы</h3>
                                <p>{event.educational_work_in_opop ? "В рамках ОПОП" : "За пределами ОПОП"}</p>
                            </div>
                            <div>
                                <h3>Направление воспитательной работы</h3>
                                <p>{direction}</p>
                            </div>
                            <div>
                                <h3>Уровень мероприятия</h3>
                                <p>{level}</p>
                            </div>
                            <div>
                                <h3>Роль СибГУ</h3>
                                <p>{role}</p>
                            </div>
                            <div>
                                <h3>Формат мероприятия</h3>
                                <p>{format}</p>
                            </div>
                            <div>
                                <h3>Ответственное подразделение</h3>
                                <p>{organization}</p>
                            </div>
                            <div>
                                <h3>Статус верификации</h3>
                                <p>{eventStatus()}</p>
                            </div>
                        </div>
                        {event.important_dates.length ?
                            <div className={"importantDates"}>
                                {event.important_dates.map(item =>
                                    <div className={"importantDates-item"}>
                                        <h4>{item.date}</h4>
                                        <span>{item.name}</span>
                                    </div>
                                )}
                            </div>
                            : <></>
                        }
                        <div className={"description"}>
                            <h3>Описание мероприятия:</h3>
                            <p>{event.description}</p>
                        </div>
                    </div>
                    <div className={"buttons-container"}>

                    </div>
                </div>
                : <h2>Загрузка...</h2>
            }
        </div>
    )
}

export default EventModal