import React from 'react';

const EventItem = ({ event }) => {
  return (
    <div className="event-item" style={{ backgroundColor: event.color }}>
      {event.title}
    </div>
  );
};

export default EventItem;
