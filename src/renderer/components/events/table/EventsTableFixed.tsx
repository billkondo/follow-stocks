import Event from '@entities/events/Event';
import FilterOptions from '@entities/filters/FilterOptions';
import { Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import EventsTable from './EventsTable';
import UploadB3SpreadSheet from './UploadB3SpreadSheet';

type Props = {
  title: string;
};

const EventsTableFixed: FC<Props> = ({ title }) => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [eventsInPage, setEventsInPage] = useState<Event[]>([]);
  const isSaveButtonDisabled = allEvents.length === 0;

  const filterEvents = (filterOptions: FilterOptions) => {
    setEventsInPage(sliceEvents(allEvents, filterOptions));
  };

  const onAllEventsLoaded = (events: Event[]) => {
    setAllEvents(events);
  };

  const sliceEvents = (events: Event[], filterOptions: FilterOptions) => {
    const { page, pageSize } = filterOptions;

    return events.slice(page * pageSize, (page + 1) * pageSize);
  };

  const onSave = async () => {
    await window.events.saveB3Events();
    setAllEvents([]);
  };

  useEffect(() => {
    const initialFilterOptions: FilterOptions = {
      page: 0,
      pageSize: 5,
    };

    setEventsInPage(sliceEvents(allEvents, initialFilterOptions));
  }, [allEvents]);

  return (
    <EventsTable
      eventsCount={allEvents.length}
      eventsInPage={eventsInPage}
      title={title}
      filterEvents={filterEvents}
      renderEmptyEvents={() => (
        <UploadB3SpreadSheet onLoad={onAllEventsLoaded}></UploadB3SpreadSheet>
      )}
      renderHeader={() => (
        <Button
          variant="contained"
          onClick={onSave}
          disabled={isSaveButtonDisabled}
        >
          Save
        </Button>
      )}
    ></EventsTable>
  );
};

export default EventsTableFixed;
