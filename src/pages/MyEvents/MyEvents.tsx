import React, {useState} from 'react';
import './MyEvents.scss'
import {myEventsList} from "./events";
import EventCard from "./EventCard/EventCard";

const MyEvents = () => {
    const [myEvents, setMyEvents] = useState(myEventsList)

    return (
        <main>
            <h1>Мои меропрития</h1>
            <div className={'eventsList'}>
                {myEvents.map((event) =>
                    <EventCard event={event} key={event.id}/>
                )}
            </div>
        </main>
    );
};

export default MyEvents;