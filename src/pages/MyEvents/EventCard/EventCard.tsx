import React, { useState } from 'react';
import './EventCard.scss'
import { IMyEvent } from "../../../types/events";
import { arrowDown } from "../../../assets/myEventsIcons/arrowsIcons";
import clsx from "clsx";
import { calendarIcon } from "../../../assets/myEventsIcons/calendarIcon";

interface IProps {
    event: IMyEvent;
    index: number;
}

const EventCard: React.FC<IProps> = ({ event, index }) => {
    const [isActive, setIsActive] = useState(false)

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
        <div className={'eventCard'}>
            <div className={'eventCardBody'}>
                <div className={'number'}>№{index}</div>
                <div className={'eventName'}><span>{event.name}</span></div>
                <div className={'eventDate'}>
                    {event.start_date === event.stop_date
                        ? <span>{start_date}</span>
                        : <span>{start_date}-{stop_date}</span>
                    }
                </div>
                <div className={'eventOrganizer'}>{event.responsible}</div>
                <div className={'eventPlace'}><span>{event.place}</span></div>
                <div className={'eventStatus'}></div>
                <div className={clsx({
                    'dropdown': true,
                    'active': isActive
                })} onClick={() => setIsActive(!isActive)}>{arrowDown()}</div>
            </div>
            {isActive &&
                <div className={'eventCardDesc'}>
                    <h3>Описание мероприятия</h3>
                    <p>Название: <b>{event.name}</b></p>
                    <p>Место проведения: <b>{event.place}</b></p>
                    <p>Ответственное лицо: <b>{event.responsible}</b></p>
                    <p>Воспитательная работа в рамках ОПОП: <b>{event.educational_work_outside_opop}</b></p>
                    <p>Количество часов: <b>{event.hours_count}</b></p>
                    <p>Охват учасников по плану: <b>{event.coverage_participants_plan}</b></p>
                    <p>Направление воспитательной работы: <b>{event.direction}</b></p>
                    <p>Уровень мероприятия: <b>{event.level}</b></p>
                    <p>Формат мероприятия: <b>{event.format}</b></p>
                    <p>Автор: <b>{event.author}</b></p>
                    <p>Ответственное подразделение: <b>{event.organization}</b></p>
                    <p>Статус верификации: </p>
                </div>
            }
        </div>
    );
};

export default EventCard;