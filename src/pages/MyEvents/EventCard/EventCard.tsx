import React from 'react';
import './EventCard.scss'
import {IMyEvent} from "../../../types/events";
import {Link} from "react-router-dom";

interface IProps{
    event: IMyEvent
}

const EventCard:React.FC<IProps> = ({event}) => {
    return (
        <div className={'eventCard'}>
            <div className={'cardBody'}>
                <p>{event.name}</p>
                {event.start_date === event.stop_date
                    ? <p>{event.start_date}</p>
                    : <p>{event.start_date}-<br/>{event.stop_date}</p>
                }
            </div>
            <Link to={'#'} className={'changeBut'}>Настроить</Link>
        </div>
    );
};

export default EventCard;