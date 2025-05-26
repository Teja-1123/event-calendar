import React from 'react';
import { format, setMonth } from 'date-fns';
// import './YearView.css';

const YearView = ({ currentDate, setCurrentDate, setViewMode }) => {
    const months = Array.from({ length: 12 }, (_, i) => setMonth(new Date(currentDate.getFullYear(), 0), i));

    return (
        <div className="year-view">
            {months.map((monthDate, idx) => (
                <div
                    key={idx}
                    className="month-box"
                    onClick={() => {
                        setCurrentDate(monthDate);
                        setViewMode('month');
                    }}
                >
                    {format(monthDate, 'MMMM')}
                </div>
            ))}
        </div>
    );
};

export default YearView;
