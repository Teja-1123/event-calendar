import React from 'react';
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    format,
    isSameMonth
} from 'date-fns';
import { useEventContext } from '../context/EventContext';
import DayCell from './DayCell';


const CalendarGrid = ({ currentDate, mini = false }) => {
    const { events } = useEventContext();

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const cloneDay = day;
            days.push(
                <DayCell
                    key={cloneDay.toISOString()}
                    date={cloneDay}
                    events={events}
                    isCurrentMonth={isSameMonth(cloneDay, monthStart)}
                    mini={mini}
                />
            );
            day = addDays(day, 1);
        }

        rows.push(
            <div className="calendar-row" key={day.toISOString()}>
                {days}
            </div>
        );
        days = [];
    }

    return (
        <div className={`calendar-grid ${mini ? 'mini-grid' : ''}`}>
            {!mini && (
                <div className="calendar-days">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                        <div className="calendar-day-label" key={d}>
                            {d}
                        </div>
                    ))}
                </div>
            )}
            {rows}
        </div>
    );
};

export default CalendarGrid;
