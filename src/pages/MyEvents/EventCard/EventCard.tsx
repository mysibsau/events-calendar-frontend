import React, { useState } from 'react';
import './EventCard.scss'
import { IEvent } from "../../../types/event";
import MyButton from '../../../components/UI/MyButton';
import { IconElips, IconPen, IconTrushSquare } from '../../../assets/Icons';
import Tooltip from '../../../components/UI/Tooltip';
import { useEventsStore } from '../../../stores';

interface IProps {
    event: IEvent;
}

const EventCard: React.FC<IProps> = ({ event }) => {
    const { deleteEvent } = useEventsStore(state => state)

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
                        <span>{event.responsible}</span>
                    </div>
                    <div>
                        <span>Аудитория: </span>
                        <span>{event.place}</span>
                    </div>
                </div>
                <div className={"graphic-info"}>
                    <div className={"icon-container"}>
                        <Tooltip text={"Статус верификации"} >
                            <IconElips color={"gray"} size={25} />
                        </Tooltip>
                        <Tooltip text={"Редактировать"} >
                            <IconPen color={"gray"} size={25} />
                        </Tooltip>
                        <Tooltip text={"Удалить"} >
                            <span onClick={() => deleteEvent(event.id.toString())}>
                                <IconTrushSquare color={"gray"} size={25} />
                            </span>
                        </Tooltip>
                    </div>
                    <div className={"buttons"}>
                        <MyButton variant={"success"} onClick={() => window.open(`/events/${event.id}`)}>Подробнее</MyButton>
                        <MyButton variant={"primary"} onClick={() => window.open(`/events/${event.id}`)}>Создать отчет</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;