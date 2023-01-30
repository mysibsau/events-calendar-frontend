import React, { useEffect, useState } from 'react'
import { ColorTypes } from '../../../components/UI';
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

const InformationAboutReport: React.FC<IProps> = ({ event }) => {
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
                                <p>{event.direction}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Уровень мероприятия: </h3>
                                <p>{event.level}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Роль СибГУ: </h3>
                                <p>{event.role}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Формат мероприятия: </h3>
                                <p>{event.format}</p>
                            </div>
                            <div>
                                <h3 className="info-title">Ответственное подразделение: </h3>
                                <p>{event.organization}</p>
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