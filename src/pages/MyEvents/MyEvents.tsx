import React, { useEffect } from 'react';
import './MyEvents.scss'
import EventCard from "./EventCard/EventCard";
import { useEventsStore } from '../../stores';

const MyEvents = () => {
    const { eventList, fetchEventList } = useEventsStore(state => state)

    useEffect(() => {
        (async () => {
            fetchEventList()
        })();
    }, [])

    return (
        <main>
            <h1>Мои меропрития</h1>
            <div className={'eventsList'}>
                {eventList.map(event =>
                    <EventCard event={event} key={event.id} />
                )}
            </div>
        </main>
    );
};

export default MyEvents;