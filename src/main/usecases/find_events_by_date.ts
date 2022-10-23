import Stock from '@entities/stock/stock';
import EventsRepository from 'main/repositories/events_repository';

const FindEventsByDate =
  (eventsRepository: EventsRepository) => async (stock: Stock, date: Date) => {
    return await eventsRepository.findEventsByDate(stock, date);
  };

export default FindEventsByDate;
