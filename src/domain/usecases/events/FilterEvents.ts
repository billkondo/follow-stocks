import Event from '@entities/events/Event';
import FilterOptions from '@entities/filters/FilterOptions';
import FilterResults from '@entities/filters/FilterResults';
import Repositories from '@repositories/repositories';

const FilterEvents = (repositories: Repositories) => {
  const { events } = repositories;

  return async (
    filterOptions: FilterOptions,
  ): Promise<FilterResults<Event>> => {
    const eventsCount = await events.count();
    const filteredEvents = await events.filter(filterOptions);

    return {
      results: filteredEvents,
      totalResults: eventsCount,
    };
  };
};

export default FilterEvents;
