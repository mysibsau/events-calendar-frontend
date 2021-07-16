import React from 'react';
import Days from './Days/Days'
import Months from './Months/Months';
import Years from './Years/Years';
import './Calendar.scss';


export default function Calendar() {
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());
    
    return(
      <div style={{width: '70vw', alignSelf: 'center'}}>
        <div>
          <Months onMonthChange={m => setMonth(m)}/>
          <Years onYearChange={y => {
            console.log(y)
            setYear(y)}}/>
        </div>
        <Days month={month} year={year}/>
      </div>
    )
}