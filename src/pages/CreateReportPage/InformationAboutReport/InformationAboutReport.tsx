import React, { useEffect, useState } from 'react'
import { ColorTypes, IconElips, useNotification } from '../../../components/UI';
import { useEventsStore } from '../../../stores'
import { IEvent } from '../../../types/events';
import "./InformationAboutReport.scss";


interface IProps {
    event: IEvent;
}

interface IElipsData {
    color: ColorTypes;
    message: string;
}

const InformationAboutReport: React.FC<IProps> = ({event}) => {
    const {
        rolesList,
        levelsList,
        formatsList,
        directionList,
        organizationsList,
        getEvent
    } = useEventsStore(state => state)
    const { addNotific } = useNotification()


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
                return { color: "success", message: "В обработке" }
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
        <div>
            {event
                ? <div className={"eventModal-container"}>
                    <div className={"info-main-container"}>
                        <div className={"info"}>
                            <div>
                                <h3 className="info-title">Место проведения по плану:</h3>
                                <p>{event.place}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Количество часов по плану:</h3>
                                <p>{event.hours_count}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Охват учасников по плану:</h3>
                                <p>{event.coverage_participants_plan}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Даты проведения по плану:</h3>
                                <p>{event.start_date === event.stop_date
                                    ? <span>{new Date(event.start_date).toLocaleString().split(",")[0]}</span>
                                    : <span>с {new Date(event.start_date).toLocaleString().split(",")[0]} по {new Date(event.stop_date).toLocaleString().split(",")[0]}</span>
                                }</p>
                            </div>
                            <div>
                                <h3 className="info-title">Ответственное лицо: </h3>
                                <p>{event.author_name}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Воспитательные работы: </h3>
                                <p>{event.educational_work_in_opop ? "В рамках ОПОП" : "За пределами ОПОП"}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Направление воспитательной работы: </h3>
                                <p>{direction}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Уровень мероприятия: </h3>
                                <p>{level}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Роль СибГУ: </h3>
                                <p>{role}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Формат мероприятия: </h3>
                                <p>{format}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Ответственное подразделение: </h3>
                                <p>{organization}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Статус верификации: </h3>
                                <p className="circle-status">
                                    {elipceData().message}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="info-title-decription">Описание мероприятия:</h3>
                            <p>{event.description}</p>
                        </div>
                    </div>
                    <div className={"buttons-container"}>

                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default InformationAboutReport