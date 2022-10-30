import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';
import EventsRepository from '@repositories/events_repository';

const FindStocksThatHaveAnyEvent =
  (eventsRepository: EventsRepository) =>
  async (type: StockType): Promise<Stock[]> => {
    return eventsRepository.findStocksThatHaveAnyEvent(type);
  };

export default FindStocksThatHaveAnyEvent;
