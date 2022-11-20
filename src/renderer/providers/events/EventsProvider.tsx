import Event from '@entities/events/Event';
import { useState } from 'react';
import Status from 'renderer/domain/status';
import EventsContext from './EventsContext';

const EventsProvider = () => {
  const [listLoadStatus, setListLoadStatus] = useState<Status>('LOADING');
  const [events, setEvents] = useState<Event[]>([]);

  return (
    <EventsContext.Provider
      value={{
        listLoadStatus,
        events,
      }}
    ></EventsContext.Provider>
  );
};

export default EventsProvider;
