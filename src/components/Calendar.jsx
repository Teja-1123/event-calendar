import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, addDays, format } from 'date-fns';
import Header from './Header';
import DayCell from './DayCell';
import { useEventContext } from '../context/EventContext';
import '../App.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events } = useEventContext();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);

  const calendarDays = [];
  let day = startDate;

  while (day <= monthEnd || calendarDays.length % 7 !== 0) {
    calendarDays.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="calendar">
      <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div className="day-header" key={d}>{d}</div>
        ))}
        {calendarDays.map(date => (
          <DayCell key={date.toString()} date={date} events={events} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
