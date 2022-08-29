import React, { useState } from 'react';
import './EventCard.scss'
import { IEvent } from "../../../types/events";
import MyButton from '../../../components/UI/MyButton';
import { IconElips, IconPen, IconTrushSquare, ColorTypes } from '../../../assets/Icons';
import Tooltip from '../../../components/UI/Tooltip';
import { useEventsStore } from '../../../stores';
import { useNavigate } from 'react-router-dom';
import MyModal from '../../../components/UI/MyModal';
import EventModal from '../EventModal';

interface IProps {
    event: IEvent;
}

interface IElipsData {
    color: ColorTypes;
    message: string;
}

const EventCard: React.FC<IProps> = ({ event }) => {
    const { deleteEvent } = useEventsStore(state => state)
    const navigate = useNavigate()

    const [showEvent, setShowEvent] = useState(false)

    const start_date = new Date(event.start_date).toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })

    const stop_date = new Date(event.stop_date).toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })

    const deleteEventHandler = () => {
        if (window.confirm("Вы действительно хотите удалить мероприятие")) {
            deleteEvent(event.id.toString())
        }
    }

    const elipceData = (): IElipsData => {
        switch (event.status) {
            case "0":
                return { color: "danger", message: "Отклонено" }
            case "1":
                return { color: "default", message: "В обработке" }
            case "2":
                return { color: "warning", message: "В ожидании отчета" }
            case "3":
                return { color: "danger", message: "Отклонен отчет" }
            case "4":
                return { color: "success", message: "Верефицировано" }
            default:
                return { color: "default", message: "В обработке" }
        }
    }

    return (
        <div className={'eventCard-container'}>
            <h2>{event.name}</h2>
            <div className={"cardBody-container"}>
                <div className={"info"}>
                    <div>
                        <span>Даты: </span>
                        {start_date === stop_date
                            ? <span>{start_date}</span>
                            : <span>с {start_date} по {stop_date}</span>
                        }
                    </div>
                    <div>
                        <span>Ответственное лицо: </span>
                        <span>{event.author}</span>
                    </div>
                    <div>
                        <span>Аудитория: </span>
                        <span>{event.place}</span>
                    </div>
                </div>
                <div className={"graphic-info"}>
                    <div className={"icon-container"}>
                        <Tooltip text={elipceData().message} >
                            <IconElips color={elipceData().color} size={25} />
                        </Tooltip>
                        <div onClick={() => navigate(`/create-event/${event.id}`)}>
                            <Tooltip text={"Редактировать"} >
                                <IconPen color={"default"} size={25} />
                            </Tooltip>
                        </div>
                        <Tooltip text={"Удалить"} >
                            <span onClick={deleteEventHandler}>
                                <IconTrushSquare color={"default"} size={25} />
                            </span>
                        </Tooltip>
                    </div>
                    <div className={"buttons"}>
                        <MyButton variant={"success"} onClick={() => setShowEvent(true)}>Подробнее</MyButton>
                        <MyButton variant={"primary"}>Создать отчет</MyButton>
                    </div>
                </div>
            </div>
            <MyModal isShow={showEvent} setIsShow={setShowEvent} title={`Название мероприятия: ${event.name}`}>
                <EventModal eventId={event.id.toString()} isShowEvent={showEvent} />
            </MyModal>
        </div>
    );
};

export default EventCard;