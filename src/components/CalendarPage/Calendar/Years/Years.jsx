import React from 'react';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import './Years.scss';


export default function Years({onYearChange}){
    const now = new Date();
    return(
        <FormControl style={{marginTop: 40, marginBottom: -20, marginLeft: 20}}>
        <InputLabel style={{fontFamily: 'Oswald', position: 'absolute', top: -20, fontSize: 16}}>Год</InputLabel>
        <Select onChange={e => onYearChange(e.target.value)} defaultValue={now.getFullYear()} variant={'outlined'} style={{fontFamily: 'Oswald'}}>
            <MenuItem style={{fontFamily: 'Oswald'}} value={now.getFullYear() - 1}>{now.getFullYear() - 1}</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={now.getFullYear()}>{now.getFullYear()}</MenuItem>
            <MenuItem style={{fontFamily: 'Oswald'}} value={now.getFullYear() + 1}>{now.getFullYear() + 1}</MenuItem>
        </Select>
        </FormControl>
    )
}