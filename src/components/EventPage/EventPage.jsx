import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './EventPage.scss';
import { getEventData } from '../../api/events';
import { TextField, CircularProgress } from '@material-ui/core';
import { useReferences } from '../../api/references';


export default function EventPage(props) {
    const [event, setEvent] = React.useState({});
    const [loaded, setLoaded] = React.useState(false)
    const [isError, setIsError] = React.useState(false);
    const [isDisable, setIsDisable] = React.useState(true)
    const {directions, formats, levels, organizations, roles, isReferenceLoaded} = useReferences()
    const params = useParams()

    React.useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        const response = await getEventData(params.id)
        if (response) {
            console.log(response)
            setEvent(response)
            setLoaded(true)
        } else {
            setIsError(true)
        }
    }

    return(
    <div>
        <header>
            <Link to={'/'} style={{display: 'flex', flexDirection: 'row', textDecoration: 'none', color: '#006AB3', margin: 10}}>
                <img src="https://img.icons8.com/ios-filled/50/000000/long-arrow-left.png" style={{marginRight: 15, width: 60}}/>
                <h3>Вернуться к календарю</h3>
            </Link>
        </header>
        {loaded ? <div>
            {isDisable ? 
            <div>
                <h2 className="event-title">{event.name}</h2>
                <p className="event-info">Ответственный: {event.responsible}</p>
                <p className="event-info">Даты проведения: {event.start_date.split('-').reverse().join('/')}-{event.stop_date.split('-').reverse().join('/')}</p>
                <p className="event-info">Место проведения: {event.place}</p>
                {isReferenceLoaded &&
                <>
                <p>Организация: {event.organization}</p>
                <p>Уровень мероприятия: {levels.filter(item => item.id === event.level)[0].name}</p>
                <p>Роль СибГУ: {roles.filter(item => item.id === event.role)[0].name}</p>
                <p>Формат мероприятия: {formats.filter(item => item.id === event.format)[0].name}</p>
                <p>Направление: {event.direction}</p>
                </>}
            </div> : <div></div>}
        </div> :
        <CircularProgress style={{borderColor: '#006AB3', position: 'absolute', left: '50%', top: '50%'}}/>}
    </div>)
}