import React from 'react';
import './Days.scss';

const weekdayshort = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']


export default function Days({month, year}) {
    const [daysInMonth, setDaysInMonth] = React.useState(null)

    React.useEffect(() => {
        generateDays();
    }, [month, year])

    const firstDayOfMonth = () => {
        return new Date(year, month, 1).getDay();
    };

    const daysCount =  (month, year) =>  {
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
