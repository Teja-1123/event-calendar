

import React, { useState } from 'react';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'year'
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const handleMonthClick = (monthDate) => {
    setCurrentDate(monthDate);
    setViewMode('month');
  };

  return (
    <div className="app-container">
      <Header
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setViewMode={setViewMode}
        viewMode={viewMode}
      />

      {viewMode === 'year' ? (
        <div className="year-view">
          {months.map((monthDate, index) => (
            <div
              className="month-container"
              key={index}
              onClick={() => handleMonthClick(monthDate)}
            >
              <h4 className="month-title">
                {monthDate.toLocaleString('default', { month: 'long' })}
              </h4>
              <CalendarGrid currentDate={monthDate} mini />
            </div>
          ))}
        </div>
      ) : (
        <CalendarGrid currentDate={currentDate} />
      )}
    </div>
  );
}

export default App;
