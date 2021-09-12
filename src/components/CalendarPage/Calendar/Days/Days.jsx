import React from 'react';
import { Link } from 'react-router-dom';
import { getAddVerifyRight } from '../../../../api/rights';
import './Days.scss'
const weekdayshort = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']


export default function Days({events, month, year}){
    const [weeks, setWeeks] = React.useState([])
    const [isConfirmed, setIsConfirmed] = React.useState(false)

    React.useEffect(() => {
        console.log(events)
        getRights();
        generateDays();
    }, [month])

    const getRights = async () => {
        const data = await getAddVerifyRight();
        setIsConfirmed(data.confirmed)
    }

    const firstDayOfMonth = () => {
        const firstDay = {'0': 7, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6}
        return firstDay[String(new Date(`${String(year)}-${String(month + 1).length === 1 ? '0' + String(month + 1) : String(month + 1)}-01`).getDay())];
    };

    const daysCount = () =>  {
        return new Date(year, month + 1, 0).getDate();
    }

    const getWeekEventsCount = (week) => {
        let eventsCount = 0;
        events.map(item => {
            let thereIs = false
            item.important_dates.map(importantDate => {
                let date = new Date(importantDate.date)
                if (date >= week.start_date && date <= week.stop_date){
                    thereIs = true
                }
            })

            thereIs && eventsCount++;
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

        for (let i = 0; i < daysCount(); i++){
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

    function hashCode(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
           hash = str.charCodeAt(i) + ((hash << 3) - hash);
        }

        return Math.floor(hash);
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
                    if ((item.start_date >= start &&
                        item.start_date <= stop) || 
                        (item.stop_date >= start && item.stop_date <= stop) ||
                        (start >= item.start_date && stop <= item.stop_date)){
                        return event
                    }
                })
                
                return(
                    <tr>
                        {item.list.map(d => {
                            if(d){
                                return (
                                <td valign='top' className="calendar-day" style={{overflow: 'visible'}}>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        {d.getDate()}
                                        {isConfirmed && <Link to={`/add-event/${d.getFullYear()}-${String(d.getMonth() + 1).length === 1 ? 
                                            '0' + String(d.getMonth() + 1) : String(d.getMonth() + 1)}-${String(d.getDate()).length === 1 ? '0' + String(d.getDate()) : 
                                        String(d.getDate())}`} 
                                            style={{textDecoration: 'none'}}><div className="plus-button">+</div></Link>}
                                    </div>
                                    {weekEvents.map(event => {
                                        return(<div>
                                            {event.important_dates.map(importantDate => {
                                                let day = new Date(`${importantDate.date}`)
                                                if (d.getDate() === day.getDate()){
                                                    return(
                                                        <Link to={`/event/${event.id}`} style={{textDecoration: 'none', position: 'relative'}}>
                                                            <div 
                                                                className="event-div" 
                                                                style={{ borderRadius: 15, backgroundColor: event.is_verified ? '#' +  intToRGB(hashCode(event.name)) : '#ccc'}}
                                                            >{importantDate.name}
                                                            </div>
                                                            {/* <div className="tip-div">
                                                                <p className="tip-div__name">{importantDate.name}</p>
                                                                <p className="tip-div__event">Мероприятие: {event.name}</p>
                                                            </div> */}
                                                        </Link>
                                                    )
                                                }
                                        })}</div>)
                                    })}
                                </td>)
                            } else { 
                                return <td className="calendar-day empty"/>
                            }
                        })}
                    </tr>
                )
            })}
          </tbody>
        </table>
    )
}