
import React, { useState } from 'react';

const Header = ({ currentDate, setCurrentDate, viewMode, setViewMode }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleGoToDate = () => {
    const selected = new Date(selectedMonth);
    if (!isNaN(selected)) {
      setCurrentDate(selected);
    }
  };

  return (
    <div className="calendar-header">
      <button onClick={goToPreviousMonth}>◀</button>
      <button onClick={goToToday}>Today</button>
      <button onClick={goToNextMonth}>▶</button>

      <span className="current-month">
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </span>

      <div className="date-picker">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="month-picker"
        />
        <button onClick={handleGoToDate}>Go</button>
      </div>

      {/* 👇 View toggle button added here */}
      <button
        onClick={() => setViewMode(viewMode === 'month' ? 'year' : 'month')}
        className="view-toggle-button"
      >
        {viewMode === 'month' ? 'Year View' : 'Month View'}
      </button>
    </div>
  );
};

export default Header;
