import React from 'react';
import Days from './Days/Days'
import Months from './Months/Months';
import './Calendar.scss';


export default function Calendar() {
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());
    
    return(
      <div style={{width: '70vw', alignSelf: 'center'}}>
        <div>
          <Months month={new Date().getMonth()} onMonthChange={m => setMonth(m)}/>
        </div>
        <Days month={month} year={year}/>
      </div>
    )
}