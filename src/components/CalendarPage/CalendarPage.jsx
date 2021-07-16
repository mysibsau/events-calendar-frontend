import React from 'react';
import Calendar from './Calendar/Calendar';
import Header from '../Header/Header';
import './CalendarPage.scss';


export default function CalendarPage() {
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Header />
            <Calendar />
        </div>
    )
}