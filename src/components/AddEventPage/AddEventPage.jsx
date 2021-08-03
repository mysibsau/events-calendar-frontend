import React from 'react';
import { TextField, MenuItem, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useReferences } from '../../api/references';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import './AddEventPage.scss';
import { addEvent } from '../../api/events';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function AddEventPage(){
    const {directions, organizations} = useReferences();
    const dateParams = useParams();
    const history = useHistory();

    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState(dateParams.date);
    const [endDate, setEndDate] = React.useState(dateParams.date)
    const [place, setPlace] = React.useState('');
    const [count, setCount] = React.useState('');
    const [direction, setDirection] = React.useState('');
    const [organization, setOrganization] = React.useState('')

    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const addEventOnDate = async (e) => {
        e.preventDefault();
        const res = await addEvent(name, date, endDate, place, count, direction, organization)
        if (!res.error) {
            history.push('/')
            window.location.reload()
        } else {
            setErrorText(res.error)
            setShowError(true)
        }
    };

    return(
        <>
        <Header />
        <Snackbar open={showError} autoHideDuration={4000} onClose={() => setShowError(false)}>
            <Alert severity="warning">
                {errorText}
            </Alert>
        </Snackbar>
        <div className={'eventPage'}>
            <div className={'back-button'}>
                <Link to={'/'} style={{display: 'flex', flexDirection: 'row', textDecoration: 'none', color: '#006AB3', margin: 10}}>
                    <h3>Вернуться к календарю</h3>
                </Link>
            </div>
            <form className={'edit-form'} onSubmit={addEventOnDate}>
                <TextField id={'name'} className={'edit-input'} value={name} onChange={e => setName(e.target.value)} label={'Название мероприятия'} variant={'outlined'} type={'text'}/>
                <TextField id={'date'} className={'edit-input'} defaultValue={dateParams} value={date} onChange={e => setDate(e.target.value)}  variant={'outlined'} type={'date'}/>
                <TextField id={'date'} className={'edit-input'} defaultValue={dateParams} value={endDate} onChange={e => setEndDate(e.target.value)}  variant={'outlined'} type={'date'}/>
                <TextField id={'place'} className={'edit-input'} value={place} onChange={e => setPlace(e.target.value)} label={'Место проведения'} variant={'outlined'} type={'text'}/>
                <TextField id={'count'} className={'edit-input'} value={count} onChange={e => setCount(e.target.value)} label={'Охват участников (план)'} variant={'outlined'} type={'number'}/>
                <TextField select id={'direction'} className={'edit-input'} value={direction}  onChange={e => setDirection(e.target.value)} label={'Направление'} variant={'outlined'}>
                    {directions.map(item => {
                        return(<MenuItem value={String(item.id)}>{item.name}</MenuItem>)
                    })}
                </TextField>
                <TextField select id={'organization'} className={'edit-input'} value={organization} label={'Организация'} onChange={e => setOrganization(e.target.value)} variant={'outlined'}>
                    {organizations.map(item => {
                        return(<MenuItem value={String(item.id)}>{item.name}</MenuItem>)
                    })}
                </TextField>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                    <Button type={'submit'} onSubmit={addEventOnDate} className={'form-button accept'}>Добавить</Button>
                </div>
            </form>
        </div>
        </>
    )
}