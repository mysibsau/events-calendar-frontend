import React from 'react';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import './Months.scss';

export default function Months({onMonthChange}) {
    return(
        <FormControl style={{marginTop: 40, marginBottom: -20}}>
        <InputLabel style={{fontFamily: 'Oswald', position: 'absolute', top: -20, fontSize: 16}}>Месяц</InputLabel>
        <Select defaultValue={new Date().getMonth()} variant={'outlined'} style={{width: 200, fontFamily: 'Oswald'}} onChange={e => onMonthChange(e.target.value)}>
            <MenuItem style={{fontFamily: 'Oswald'}} value={0}>Январь</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={1}>Февраль</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={2}>Март</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={3}>Апрель</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={4}>Май</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={5}>Июнь</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={6}>Июль</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={7}>Август</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={8}>Сентябрь</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={9}>Октябрь</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={10}>Ноябрь</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={11}>Декабрь</MenuItem>
        </Select>
        </FormControl>
    )
}