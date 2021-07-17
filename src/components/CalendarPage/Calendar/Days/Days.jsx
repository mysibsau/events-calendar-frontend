import React from 'react';
import './Days.scss'

const weekdayshort = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']


export default function Days({events, month, year}){
    const [weeks, setWeeks] = React.useState([])

    React.useEffect(() => {
        console.log(events)
        generateDays();
    }, [])

    const firstDayOfMonth = () => {
        return new Date(year, month, 1).getDay();
    };

    const daysCount = () =>  {
        return new Date(year, month, 0).getDate();
    }

    const getWeekEventsCount = (week) => {
        let eventsCount = 0;
        events.map(item => {
            let start = new Date(`${item.start_date}T00:00:00`)
            let stop = new Date(`${item.stop_date}T00:00:00`)
            if ((week.start_date > start &&
                week.start_date < stop) || 
                (week.stop_date > start && week.stop_date < stop) ||
                (start >= week.start_date && stop <= week.stop_date)){
                eventsCount++;
            }
        })

        return eventsCount;
    }

    const generateDays = () => {
        let weeks = [];
        let weekList = [];
        let week = {};
        
        for (let i = 0; i < firstDayOfMonth() - 1; i++){
            weekList.push(null)
        }

        for (let i = 0; i <= daysCount(); i++){
            weekList.push(new Date(`${year}-${String(month + 1).length === 1 ? '0' + (month + 1) : month + 1}-${String(i + 1).length === 1 ? '0' + (i + 1) : i + 1}T00:00:00`));
            if (weekList.length === 7){
                for (let j = 0; j < 7; j++){
                    if (weekList[j] !== null){
                        week['start_date'] = weekList[j];
                        break
                    }
                }
                week['stop_date'] = weekList[weekList.length - 1];
                week['list'] = weekList;
                weeks.push(week)
                weekList = [];
                week = {}
            }
        }

        for (let j = 0; j < weekList.length; j++){
            if (weekList[j] !== null){
                week['start_date'] = weekList[j];
                break
            }
        }
        week['stop_date'] = weekList[weekList.length - 1];
        week['list'] = weekList;
        weeks.push(week)

        setWeeks(weeks);
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

    return(
        <table>
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
            {weeks.map(item => {
                let eventsCount = getWeekEventsCount(item)
                let weekEvents = events.filter(event => {
                    let start = new Date(`${event.start_date}T00:00:00`)
                    let stop = new Date(`${event.stop_date}T00:00:00`)
                    if ((item.start_date > start &&
                        item.start_date < stop) || 
                        (item.stop_date > start && item.stop_date < stop) ||
                        (start >= item.start_date && stop <= item.stop_date)){
                        return event
                    }
                })
                console.log(weekEvents)
                return(
                    <tr style={{height: (eventsCount <= 1 ? 100 : eventsCount * 50 + 20)}}>
                        {item.list.map(d => {
                            if(d)
                                return (<td valign='top' className="calendar-day" style={{overflow: 'visible'}}>
                                    {d.getDate()}
                                    {weekEvents.map(event => {
                                        let start = new Date(`${event.start_date}T00:00:00`)
                                        let stop = new Date(`${event.stop_date}T00:00:00`)
                                        if (d.valueOf() === start.valueOf() && d.valueOf() === stop.valueOf()){
                                            return (<div className="event-div" style={{ borderRadius: 15, backgroundColor: '#' +  intToRGB(hashCode(event.name)), padding: 5, marginTop: weekEvents.indexOf(event) * 45 + 5}}>{event.name}</div>)
                                          } else if(d.valueOf() === start.valueOf()){
                                            return <div className="event-div" style={{ borderTopLeftRadius: 15, zIndex: 3, backgroundColor: '#' +  intToRGB(hashCode(event.name)), borderBottomLeftRadius: 15, marginTop: weekEvents.indexOf(event) * 45 + 5}}>{event.name}</div>
                                          } else if(d.valueOf() === stop.valueOf()) {
                                            return <div className="event-div" style={{borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: '#' +  intToRGB(hashCode(event.name)), marginTop: weekEvents.indexOf(event) * 45 + 5}}></div>
                                          } else if(d.valueOf() > start.valueOf() && stop.valueOf() > d.valueOf() ){
                                            return <div className="event-div" style={{backgroundColor: '#' +  intToRGB(hashCode(event.name)), marginTop: weekEvents.indexOf(event) * 45 + 5}}></div>
                                          }
                                    })}
                                    </td>)
                            else 
                                return <td className="calendar-day empty"/>
                        })}
                    </tr>
                )
            })}
          </tbody>
        </table>
    )
}