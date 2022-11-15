import Event from '@entities/events/Event';
import { useState } from 'react';
import Status from 'renderer/domain/status';
import useComponentWillMount from 'renderer/hooks/use_component_will_mount';
import EventsContext from './EventsContext';

const EventsProvider = () => {
  const [listLoadStatus, setListLoadStatus] = useState<Status>('LOADING');
  const [events, setEvents] = useState<Event[]>([]);

  useComponentWillMount(async () => {
    console.log('hi nice to meet you');
  });

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
