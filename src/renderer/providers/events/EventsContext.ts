import Event from '@entities/events/Event';
import { createContext } from 'react';
import Status from 'renderer/domain/status';

type EventsContextType = {
  listLoadStatus: Status;
  events: Event[];
};

const EventsContext = createContext<EventsContextType>({
  listLoadStatus: 'LOADING',
  events: [],
});

export default EventsContext;
