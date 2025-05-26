
import React from 'react';

const EventItem = ({ event }) => {
  return (
    <div
      className="event-item"
      style={{ backgroundColor: event.color }}
    >
      <strong>{event.title}</strong>
      <small>
        {new Date(event.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </small>
    </div>
  );
};

export default EventItem;
