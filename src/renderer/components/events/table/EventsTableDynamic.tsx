import Event from '@entities/events/Event';
import EventJSON from '@entities/events/EventJSON';
import FilterOptions from '@entities/filters/FilterOptions';
import FilterResults from '@entities/filters/FilterResults';
import { useState } from 'react';
import useComponentWillMount from 'renderer/hooks/use_component_will_mount';
import EventsTable from './EventsTable';
import EventsTableEmptyList from './EventsTableEmptyList';

const EventsTableDynamic = () => {
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [eventsInPage, setEventsInPage] = useState<Event[]>([]);

  const filterEvents = async (filterOptions: FilterOptions) => {
    const firstPageResults = await window.events.getB3Events(filterOptions);

    updatePage(firstPageResults);
  };

  const updatePage = (filterResults: FilterResults<EventJSON>) => {
    const { results, totalResults } = filterResults;

    setEventsInPage(results.map((eventJSON) => new Event(eventJSON)));
    setEventsCount(totalResults);
  };

  useComponentWillMount(async () => {
    await filterEvents({ page: 0, pageSize: 5 });
  });

  return (
    <EventsTable
      eventsCount={eventsCount}
      eventsInPage={eventsInPage}
      title="Track Record"
      filterEvents={filterEvents}
      renderEmptyEvents={() => <EventsTableEmptyList></EventsTableEmptyList>}
    ></EventsTable>
  );
};

export default EventsTableDynamic;
