import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEventStore } from '../../stores'

const EventPage = () => {
    const { event, getEvent } = useEventStore(state => state)
    const params = useParams()

    useEffect(() => {
        if (params.eventId) {
            getEvent(params.eventId)
        }
    }, [getEvent, params])

    return (
        <main>
            {event.id &&
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
        </main>
    )
}

export default EventPage