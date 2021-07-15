import React from 'react';
import moment from 'moment';
import './Calendar.scss';

const weekdayshort = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

export default function Calendar() {
    const [dateObject, setDateObject] = React.useState(moment());
    const [daysInMonth, setDaysInMonth] = React.useState(null)

    React.useEffect(() => {
        generateDays();
    }, [])

    const firstDayOfMonth = () => {
        let firstDay = moment(dateObject)
                     .startOf("month")
                     .format("d"); 
       return firstDay;
    };

    const daysCount =  (month, year) =>  {
        console.log(month, year);
        console.log(new Date(year, month, 0).getDate())
        return new Date(year, month, 0).getDate();
    }

    const generateDays = () => {
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
          {weekdayshort.map(day => {
            return(
              <th key={day} className="week-day">
                {day}
              </th>
            )
          })}
        </thead>
        <tbody>
            {daysInMonth}
        </tbody>
      </table>
    )
}