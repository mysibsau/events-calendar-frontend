import React from 'react';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import './Months.scss';

export default function Months({month, onMonthChange}) {
    return(
        <FormControl style={{marginTop: 20, marginBottom: -20}}>
        <InputLabel>Месяц</InputLabel>
        <Select defaultValue={month} variant={'outlined'} style={{width: 200}} onChange={e => onMonthChange(e.target.value)}>
            <MenuItem value={0}>Январь</MenuItem>
            <MenuItem value={1}>Февраль</MenuItem>
            <MenuItem value={2}>Март</MenuItem>
            <MenuItem value={3}>Апрель</MenuItem>
            <MenuItem value={4}>Май</MenuItem>
            <MenuItem value={5}>Июнь</MenuItem>
            <MenuItem value={6}>Июль</MenuItem>
            <MenuItem value={7}>Август</MenuItem>
            <MenuItem value={8}>Сентябрь</MenuItem>
            <MenuItem value={9}>Октябрь</MenuItem>
            <MenuItem value={10}>Ноябрь</MenuItem>
            <MenuItem value={11}>Декабрь</MenuItem>
        </Select>
        </FormControl>
    )
}