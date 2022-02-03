import React from 'react';
import { TextField, MenuItem, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
import { useReferences } from '../../api/references';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import './AddEventPage.scss';
import { addEvent } from '../../api/events';
import { DateTimePicker } from '@material-ui/pickers';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function AddEventPage(){
    const dateParams = useParams();
    const [eventState, setEventState] = React.useState({
        name: '',
        start_date: dateParams.date,
        stop_date: dateParams.date,
        place: '',
        coverage_participants_plan: '',
        direction: '',
        organization: '',
        important_dates: [],
    });
    const [addingImportantDate, setAddingImportantDate] = React.useState({
        name: '',
        date: new Date(),
    })
    const {directions, organizations} = useReferences();
    const history = useHistory();
    
    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const addEventOnDate = async (e) => {
        e.preventDefault();
        const res = await addEvent(eventState)
        if (!res.error) {
            history.push('/')
            window.location.reload()
        } else {
            // setErrorText(res.error)
            // setShowError(true)
        }
    };

    return(
        <>
        <Snackbar open={showError} autoHideDuration={4000} onClose={() => setShowError(false)}>
            <Alert severity="warning">
                {errorText}
            </Alert>
        </Snackbar>
        <div className={'eventPage'}>
            <div className={'edit-form'} style={{paddingTop: 50}} onSubmit={addEventOnDate}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginRight: 50}}>
                <TextField id={'name'} className={'edit-input'} value={eventState.name} onChange={e => setEventState({...eventState, name: e.target.value})} label={'Название мероприятия'} variant={'outlined'} type={'text'}/>
                <TextField id={'date'} className={'edit-input'} defaultValue={dateParams} value={eventState.start_date} onChange={e => setEventState({...eventState, start_date: e.target.value})} label={'Дата начала'} variant={'outlined'} type={'date'}/>
                <TextField id={'date'} className={'edit-input'} defaultValue={dateParams} value={eventState.stop_date} onChange={e => setEventState({...eventState, stop_date: e.target.value})} label={'Дата окончания'}  variant={'outlined'} type={'date'}/>
                <TextField id={'place'} className={'edit-input'} value={eventState.place} onChange={e => setEventState({...eventState, place: e.target.value})} label={'Место проведения'} variant={'outlined'} type={'text'}/>
                <TextField id={'count'} className={'edit-input'} value={eventState.coverage_participants_plan} onChange={e => setEventState({...eventState, coverage_participants_plan: e.target.value})} label={'Охват участников (план)'} variant={'outlined'} type={'number'}/>
                <TextField select id={'direction'} className={'edit-input'} value={eventState.direction}  onChange={e => setEventState({...eventState, direction: e.target.value})} label={'Направление'} variant={'outlined'}>
                    {directions.map(item => {
                        return(<MenuItem key={item.id} value={Number(item.id)}>{item.name}</MenuItem>)
                    })}
                </TextField>
                <TextField select id={'organization'} className={'edit-input'} value={eventState.organization} label={'Организация'} onChange={e => setEventState({...eventState, organization: e.target.value})} variant={'outlined'}>
                    {organizations.map(item => {
                        return(<MenuItem key={item.id} value={Number(item.id)}>{item.name}</MenuItem>)
                    })}
                </TextField>
                </div>
                <div>
                    <p>Ключевые даты</p> 
                    {eventState.important_dates.map(date => {
                        return(
                        <div key={eventState.important_dates.indexOf(date)} style={{display: 'flex', flexDirection: 'row'}}>
                            <p style={{width: 250}}>Название: {date.name}</p>
                            <p style={{marginRight: 20}}>Дата: {date.date.toString()}</p>
                            <Button onClick={() => setEventState({...eventState, important_dates: eventState.important_dates.filter(item => item !== date)})}>Удалить</Button>
                        </div>);
                    })}
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <TextField style={{width: 250}} id={'name'} onKeyPress={e => {
                            if (e.key === 'Enter') {
                                setEventState({...eventState, important_dates: [...eventState.important_dates, addingImportantDate]})
                                setAddingImportantDate({name: '', date: dateParams.date})
                            }
                        }} className={'edit-input'} value={addingImportantDate.name} onChange={e => setAddingImportantDate({...addingImportantDate, name: e.target.value})} label={'Название ключевой даты'} variant={'outlined'} type={'text'}/>
                        {/* <TextField style={{width: 250}} id={'datetime'} className={'edit-input'} value={addingImportantDate.date} onChange={e => setAddingImportantDate({...addingImportantDate, date: e.target.value})} label={'Дата'} variant={'outlined'} type={'date'}/> */}
                        <DateTimePicker label={'Дата и время'} id={'datetime'} className={'edit-input'} value={addingImportantDate.date} onChange={e => setAddingImportantDate({...addingImportantDate, date: e})} label={'Дата'} variant={'outlined'} />
                    <Button type={'button'} style={{width: 150}} onClick={() => {
                        setEventState({...eventState, important_dates: [...eventState.important_dates, addingImportantDate]})
                        setAddingImportantDate({name: '', date: dateParams.date})
                    }} className={'form-button accept'}>Добавить</Button>
                    </div>
                </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                    <Button type={'submit'} style={{width: 300}} onClick={addEventOnDate} className={'form-button accept'}>Создать мероприятие</Button>
                </div>
            </div>
        </div>
        </>
    )
}