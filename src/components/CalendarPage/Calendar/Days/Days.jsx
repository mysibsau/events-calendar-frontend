import React from 'react';
import { getEventsByDate } from '../../../../api/events';
import './Days.scss';

const weekdayshort = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']


export default function Days({month, year, onEventSelect}) {
    const [daysInMonth, setDaysInMonth] = React.useState(null)
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
      getEvents();
    }, [month, year])

    const getEvents = async() => {
      const events = await getEventsByDate(correctMonth(), year);
      console.log(events)
      setEvents(events)
      generateDays(events);
    }

    const correctMonth = () => {
      let res = String(month + 1);
      if(res.length === 1){
        res = '0' + res;
      }
      
      return res;
    }

    function hashCode(str) { // java String#hashCode
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 3) - hash);
      }
      return hash;
    } 
  
    function intToRGB(i){
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
    
        return "00000".substring(0, 6 - c.length) + c;
    }

    const firstDayOfMonth = () => {
        return new Date(year, month, 1).getDay();
    };

    const daysCount =  (month, year) =>  {
        return new Date(year, month, 0).getDate();
    }

    const beginMargin = (events, i, d) => {
      let count = 0;
      for(let j = 0; j < i; j++){
        if (Number(events[j].start_date.split('-')[2]) > Number(events[i].start_date.split('-')[2]) && 
        Number(events[j].start_date.split('-')[2]) <= Number(events[i].stop_date.split('-')[2])){
          count ++;
        }
      }

      return count * 45;
    } 

    const endMargin = (events, i, d) => {
      let count = 0;
      for (let j = 0; j < i; j++){
        if (Number(events[j].stop_date.split('-')[2]) >= Number(events[i].start_date.split('-')[2]) && 
        Number(events[j].stop_date.split('-')[2]) < Number(events[i].stop_date.split('-')[2])) {
          count ++
        }
      }

      return count * 45
    }

    const middleMargin = (events, i, d) => {
      let count = 0;
      let eventsCount = 0;
      for (let j = 0; j < i; j++){
        if (
          (Number(events[j].stop_date.split('-')[2]) < Number(events[i].stop_date.split('-')[2]) &&
          Number(events[i].start_date.split('-')[2] <= events[j].stop_date.split('-')[2])) ||

          ((Number(events[j].start_date.split('-')[2]) > Number(events[i].start_date.split('-')[2]) &&
          Number(events[i].stop_date.split('-')[2]) >= Number(events[j].start_date.split('-')[2])) &&
          (d < Number(events[j].start_date.split('-')[2]) || d > Number(events[j].stop_date.split('-')[2])) )
        )
        count ++;

        if (d < Number(events[j].start_date.split('-')[2]) || d > Number(events[j].stop_date.split('-')[2])){
          console.log(d)
          eventsCount++;
        }
      }

      console.log(eventsCount, d, count)
      if (eventsCount === count && i !== 0) count --;
      // count += Math.abs(count - someCount)

      return count * 45;
    }

    const generateDays = (events) => {
        let blanks = [];
        for (let i = 0; i < firstDayOfMonth() - 1; i++) {
            blanks.push(
                <td className="calendar-day empty">{""}</td>
            );
        }
    
        let daysInMonth = [];
        for (let d = 1; d <= daysCount(new Date().getMonth(), new Date().getFullYear()); d++) {
          daysInMonth.push(
              <td key={d} className="calendar-day" valign='top'>
              {d}
              {events.map(item => {
                if (Number(item.start_date.split('-')[2]) === d && Number(item.stop_date.split('-')[2]) === d){
                  return (<div onClick={() => onEventSelect(item)} style={{width: '10vw', height: 30,borderRadius: 15, whiteSpace: 'nowrap', color: 'white', backgroundColor: '#' +  intToRGB(hashCode(item.name)),  padding: 5, marginTop: 5}}>{item.name}</div>)
                } else if(Number(item.start_date.split('-')[2]) === d){
                  return <div style={{width: '10vw', height: 30,padding: 5, whiteSpace: 'nowrap', borderTopLeftRadius: 15, color: 'white', backgroundColor: '#' +  intToRGB(hashCode(item.name)), borderBottomLeftRadius: 15,  borderRightWidth: 0, marginTop: beginMargin(events, events.indexOf(item), d) + 5}}>{item.name}</div>
                } else if(Number(item.stop_date.split('-')[2]) === d) {
                  return <div style={{width: '10vw',height: 30,borderTopRightRadius: 15, borderBottomRightRadius: 15, color: 'white', backgroundColor: '#' +  intToRGB(hashCode(item.name)), borderLeftWidth: 0, padding: 5, marginTop: endMargin(events, events.indexOf(item), d) + 5}}></div>
                } else if(Number(item.start_date.split('-')[2]) < d && Number(item.stop_date.split('-')[2]) > d){
                  return <div style={{width: '10vw',height: 30, color: 'white', backgroundColor: '#' +  intToRGB(hashCode(item.name)), borderLeftWidth: 0, borderRightWidth: 0, padding: 5, marginTop: middleMargin(events, events.indexOf(item), d) + 5}}></div>
                }
              })}
              </td>
          );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
              cells.push(row);
            } else {
              rows.push(cells);
              cells = []; 
              cells.push(row); 
            }
            if (i === totalSlots.length - 1) { 
              rows.push(cells);
            }
          });
        
        let daysinmonth = rows.map((d, i) => {
          return <tr>{d}</tr>;
        });

        setDaysInMonth(daysinmonth);
    }


    return(
        <table className="calendar-div">
        <thead className="weekday-head">
            <tr>
          {weekdayshort.map(day => {
            return(
              <th key={day} className="week-day">
                {day}
              </th>
            )
          })}
          </tr>
        </thead>
        <tbody>
            {daysInMonth}
        </tbody>
      </table>
    );
}
