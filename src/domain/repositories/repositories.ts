import EventsRepository from './events_repository';
import StocksInvestedWithQuotationsRepository from './stocks_invested_wtih_quotations_repository';
import StocksRepository from './stocks_repository';

interface Repositories {
  stocks: StocksRepository;
  events: EventsRepository;
  stocksInvestedWithQuotations: StocksInvestedWithQuotationsRepository;
}

export default Repositories;
