import Event from '@entities/event/event';

const AddEventsToList = (events: Event[], newEvents: Event[]) => {
  const eventsByDate: { [key: string]: Event[] } = {};

  for (const event of events) {
    const dateMS = event.date.getTime();
    const hasDateAppeared = !!eventsByDate[dateMS];

    if (!hasDateAppeared) eventsByDate[dateMS] = [];

    eventsByDate[dateMS].push(event);
  }

  const newDateMS = newEvents[0].date.getTime();
  const hasNewDateAppeared = !!eventsByDate[newDateMS];

  if (!hasNewDateAppeared) {
    eventsByDate[newDateMS] = newEvents;
  } else {
    const removeBuysAndSellsThatHaveNewDate = () => {
      eventsByDate[newDateMS] = eventsByDate[newDateMS].filter(
        (event) => !['BUY', 'SELL'].includes(event.type),
      );
    };

    removeBuysAndSellsThatHaveNewDate();
    eventsByDate[newDateMS].push(...newEvents);
  }

  const eventsAfterInsetions: Event[] = [];
  const orderedDatesMS = Object.keys(eventsByDate)
    .map((dateMS) => parseInt(dateMS))
    .sort();

  for (const dateMS of orderedDatesMS)
    eventsAfterInsetions.push(...eventsByDate[dateMS]);

  return eventsAfterInsetions;
};

export default AddEventsToList;
