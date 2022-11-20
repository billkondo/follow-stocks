import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';
import EventsRepository from '@repositories/events_repository';

const FindStocksThatHaveAnyEvent =
  (eventsRepository: EventsRepository) =>
  async (type: StockType): Promise<Stock[]> => {
    return eventsRepository.findStocksThatHaveAnyEvent(type);
  };

export default FindStocksThatHaveAnyEvent;
