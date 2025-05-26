
import React, { useState } from 'react';
import { isSameDay, format } from 'date-fns';
import EventForm from './EventForm';
import EventItem from './EventItem';

const DayCell = ({ date, events }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dayEvents = events.filter(ev => isSameDay(new Date(ev.date), date));

  const openAddForm = (e) => {
    e.stopPropagation(); // prevent bubbling
    setSelectedEvent(null); // not editing anything
    setShowForm(true);
  };

  const openEditForm = (event, e) => {
    e.stopPropagation(); // prevent click from reaching parent
    setSelectedEvent(event); // editing this event
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedEvent(null);
  };

  return (
    <div className="day-cell" onClick={openAddForm}>
      <div className="day-number">{format(date, 'd')}</div>

      {dayEvents.map(ev => (
        <div key={ev.id} onClick={(e) => openEditForm(ev, e)}>
          <EventItem event={ev} />
        </div>
      ))}

      {showForm && (
        <div className="modal-backdrop" onClick={closeForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <EventForm
              date={date}
              event={selectedEvent}
              onClose={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCell;
