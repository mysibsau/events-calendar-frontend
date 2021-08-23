import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { getUnverifiedApiCall } from '../../api/unverified';
import EventBlock from './EventBlock/EventBlock';
import './UnverifiedPage.scss'


export default function UnverifiedPage(){
    const [events, setEvents] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        getEvents();
    }, [])
    
    const getEvents = async () => {
        const data = await getUnverifiedApiCall();
        setEvents(data)
        setLoaded(true)
    }

    return(
        <div className={'unverified-div'}>
            {loaded ? 
                <>
                {events.length ? 
                <div>
                    {events.map(event => {
                        return (
                            <EventBlock event={event}/>
                        )
                    })}
                </div> : 
                <p className={'no-events'}>
                    Нет неверифицированных мероприятий
                </p>}
                </>
            : <CircularProgress style={{borderColor: '#006AB3', position: 'absolute', left: '50%', top: '45%'}}/>}
        </div>
    )
}