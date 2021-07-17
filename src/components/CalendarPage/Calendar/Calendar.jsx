import React from 'react';
import Days from './Days/Days'
import Months from './Months/Months';
import Years from './Years/Years';
import './Calendar.scss';
import { getEventsByDate } from '../../../api/events';


export default function Calendar() {
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    getEvents();
  }, [month, year])

  const getEvents = async () => {
    const response = await getEventsByDate(String(month + 1).length === 1 ? '0' + (month+1) : month + 1, year);
    setEvents(response)
  };
    
    return(
      <div style={{width: '70vw', alignSelf: 'center'}}>
        <div>
          <Months onMonthChange={m => setMonth(m)}/>
          <Years onYearChange={y => {
            console.log(y)
            setYear(y)}}/>
        </div>
        <Days month={month} year={year} events={events}/>
      </div>
    )
}