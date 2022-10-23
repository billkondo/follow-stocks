import Stock from '@entities/stock/stock';
import EventsRepository from 'main/repositories/events_repository';

const FindEventsByStockAndDate =
  (eventsRepository: EventsRepository) => async (stock: Stock, date: Date) => {
    return await eventsRepository.findEventsByStockAndDate(stock, date);
  };

export default FindEventsByStockAndDate;
