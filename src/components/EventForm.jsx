



import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/EventContext';

const EventForm = ({ date, event, onClose }) => {
  const { addEvent, updateEvent, deleteEvent } = useEventContext();
  const isEdit = !!event;

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('#03a9f4');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setTime(new Date(event.date).toTimeString().slice(0, 5));
      setDesc(event.desc);
      setColor(event.color);
    } else {
      setTitle('');
      setTime('');
      setDesc('');
      setColor('#03a9f4');
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullDate = new Date(date);
    const [hours, minutes] = time.split(':');
    fullDate.setHours(hours);
    fullDate.setMinutes(minutes);

    const newOrUpdatedEvent = {
      id: event?.id || crypto.randomUUID(),
      title,
      date: fullDate,
      desc,
      color
    };

    if (isEdit) {
      updateEvent(newOrUpdatedEvent);
    } else {
      addEvent(newOrUpdatedEvent);
    }

    onClose();
  };

  const handleDelete = () => {
    if (isEdit && window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
      onClose();
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h3>{isEdit ? 'Edit Event' : 'Add Event'}</h3>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <div className="form-buttons">
        <button type="submit">{isEdit ? 'Update' : 'Save'}</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
            Delete
          </button>
        )}
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default EventForm;
