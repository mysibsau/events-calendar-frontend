import React, { useEffect } from 'react';
import './MyEvents.scss'
import EventCard from "./EventCard/EventCard";
import { useEventsStore } from '../../stores';
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
    const { eventList, fetchEventList, loading } = useEventsStore(state => state)
    const navigate = useNavigate()

    useEffect(() => {
        fetchEventList()
    }, [])

    return (
        <main>
            <h1>Мои меропрития</h1>
            {loading && !eventList.length && 
                <h2 style={{ "textAlign": "center" }}>Загрузка...</h2>
            }
            {eventList.length === 0 && !loading &&
                <h2 style={{ "textAlign": "center" }}>Мероприятия отсутствуют 😞. &nbsp;
                    <span className={"addContent"} onClick={() => navigate("/create-event/")}>
                        Создать?
                    </span></h2>
            }
            <div className={'eventsList'}>
                {eventList.map(event =>
                    <EventCard event={event} key={event.id} />
                )}
            </div>
        </main>
    );
};

export default MyEvents;