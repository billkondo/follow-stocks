import Stock from '@entities/stocks/Stock';
import EventsRepository from '@repositories/events_repository';

const FindEventsByStockAndDate =
  (eventsRepository: EventsRepository) => async (stock: Stock, date: Date) => {
    return await eventsRepository.findEventsByStockAndDate(stock, date);
  };

export default FindEventsByStockAndDate;
