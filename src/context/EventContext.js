import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('calendarEvents');
        if (saved) setEvents(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }, [events]);

    const addEvent = (event) => setEvents([...events, event]);
    const updateEvent = (updated) => {
        setEvents(prev =>
            prev.map(ev => (ev.id === updated.id ? updated : ev))
        );
    };
    const deleteEvent = (id) => setEvents(events.filter(ev => ev.id !== id));

    return (
        <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};
