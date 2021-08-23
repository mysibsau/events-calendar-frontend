import React from 'react';
import { Link } from 'react-router-dom';
import './EventBlock.scss';


export default function EventBlock({event}){
    console.log(event)
    return(
        <Link className={'unverified-event'} to={`/event/${event.id}`}>
            {/* <div style={{display: 'flex', flexDirection: 'row'}}> */}
                <p>{event.name}</p>
                <p>{event.start_date}-{event.stop_date}</p>
            {/* </div> */}
        </Link>
    )
}