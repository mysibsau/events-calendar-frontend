import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './EventPage.scss';
import { editEvent, getEventData } from '../../api/events';
import { TextField, CircularProgress, MenuItem, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
import { useReferences } from '../../api/references';
import Header from '../Header/Header';
import { getAddVerifyRight } from '../../api/rights';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default function EventPage(props) {
    const [event, setEvent] = React.useState({});
    const [loaded, setLoaded] = React.useState(false)
    const [isDisable, setIsDisable] = React.useState(true)

    const [errorTitle, setErrorTitle] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const {directions, organizations, formats, levels, roles, isReferenceLoaded} = useReferences()

    const [isStaff, setIsStaff] = React.useState(false);

    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [count, setCount] = React.useState(0)
    const [direction, setDirection] = React.useState(0)
    const [organization, setOrganization] = React.useState(0)

    const params = useParams()

    React.useEffect(() => {
        getIsStaff();
        getEvent()
    }, [])

    const getEvent = async () => {
        const response = await getEventData(params.id)
        if (response) {
            setEvent(response)
            setName(response.name)
            setDate(response.start_date)
            setPlace(response.place)
            setCount(response.coverage_participants_plan)
            setDirection(response.direction)
            setOrganization(response.organization)
            setLoaded(true)
        } else {
            // setIsError(true)
        }
    };

    const getIsStaff = async() => {
        const data = await getAddVerifyRight();
        setIsStaff(data.is_staff)
    };

    const editCurrentEvent = async (e) => {
        e.preventDefault();
        const data = await editEvent(params.id, name, date, place, count, direction, organization)
        if (!data.error){
            setEvent(data)
            setIsDisable(true)
        } else {
            setErrorTitle(data.error)
            setShowError(true)
        }
    };

    return(
    <>
    <Header />
    <Snackbar open={showError} autoHideDuration={4000} onClose={() => setShowError(false)}>
        <Alert severity="warning">
            {errorTitle}
        </Alert>
    </Snackbar>
    <div className={'eventPage'}>
        <div className={'back-button'}>
            <Link to={'/'} style={{display: 'flex', flexDirection: 'row', textDecoration: 'none', color: '#006AB3', margin: 10}}>
                {/* <img src="https://img.icons8.com/ios-filled/50/000000/long-arrow-left.png" style={{marginRight: 15, width: 60}}/> */}
                <h3>Вернуться к календарю</h3>
            </Link>
        </div>
        {loaded ? <div>
            {isDisable ? 
            <div className={'eventInfo'}>
                <div className={'event-title-div'}>
                    <h2 className="event-title">{event.name}</h2>
                    {event.can_edit &&
                    <div className={'button-div'}>
                    <div onClick={() => setIsDisable(false)} className={'edit-button'}>
                        <img src="https://img.icons8.com/material-rounded/48/4a90e2/edit--v1.png"/>
                        <p>Редактировать</p>
                    </div>
                    </div>}
                </div>
                {/* <p className="event-info">Ответственный: {event.responsible}</p> */}
                <p className="event-info">Дата проведения: {event.start_date.split('-').reverse().join('/')}</p>
                <p className="event-info">Место проведения: {event.place}</p>
                <p>Охват участников (план): {event.coverage_participants_plan}</p>
                {isReferenceLoaded &&
                <>
                {/* <p>Организация: {event.organization}</p> */}
                {/* <p>Уровень мероприятия: {levels.filter(item => item.id === event.level)[0].name}</p> */}
                {/* <p>Роль СибГУ: {roles.filter(item => item.id === event.role)[0].name}</p> */}
                {/* <p>Формат мероприятия: {formats.filter(item => item.id === event.format)[0].name}</p> */}
                <p>Направление: {directions.filter(item => item.id === event.direction)[0].name}</p>
                </>}
                {!event.verified && isStaff &&
                <div className={'done-button'}>
                    <img src="https://img.icons8.com/ios-glyphs/60/26e07f/ok.png"/>
                    {/* <img src="https://img.icons8.com/ios-glyphs/50/26e07f/checkmark--v1.png"/> */}
                    <p>Верифицировать</p>
                </div>}
            </div> : 
            <form className={'edit-form'} onSubmit={editCurrentEvent}>
                <TextField id={'name'} className={'edit-input'} defaultValue={event.name} onChange={e => setName(e.target.value)} label={'Название мероприятия'} variant={'outlined'} type={'text'}/>
                <TextField id={'date'} className={'edit-input'} defaultValue={event.start_date} onChange={e => setDate(e.target.value)} label={'Дата начала'} variant={'outlined'} type={'date'}/>
                <TextField id={'place'} className={'edit-input'} defaultValue={event.place} onChange={e => setPlace(e.target.value)} label={'Место проведения'} variant={'outlined'} type={'text'}/>
                <TextField id={'count'} className={'edit-input'} defaultValue={event.coverage_participants_plan} onChange={e => setCount(e.target.value)} label={'Охват участников (план)'} variant={'outlined'} type={'number'}/>
                {/* <InputLabel id="label">Направление</InputLabel> */}
                <TextField select id={'direction'} className={'edit-input'} label={'Направление'} onChange={e => setDirection(e.target.value)} defaultValue={event.direction} variant={'outlined'}>
                    {directions.map(item => {
                        return(<MenuItem value={String(item.id)}>{item.name}</MenuItem>)
                    })}
                </TextField>
                {/* <InputLabel id="label">Организация</InputLabel> */}
                <TextField select id={'organization'} className={'edit-input'} label={'Организация'} onChange={e => setOrganization(e.target.value)} defaultValue={event.organization} variant={'outlined'}>
                    {organizations.map(item => {
                        return(<MenuItem value={String(item.id)}>{item.name}</MenuItem>)
                    })}
                </TextField>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                    <Button className={'form-button cancel'} onClick={() => setIsDisable(true)}>Отмена</Button>
                    <Button type={'submit'} onSubmit={editCurrentEvent} className={'form-button accept'}>Подтвердить</Button>
                </div>
            </form>}
        </div> :
        <CircularProgress style={{borderColor: '#006AB3', position: 'absolute', left: '50%', top: '45%'}}/>}
    </div>
    </>)
}