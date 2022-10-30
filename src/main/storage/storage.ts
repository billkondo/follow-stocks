import EventsStorage from './events_storage';
import StocksStorage from './stocks_storage';

interface Storage {
  stocks: StocksStorage;
  events: EventsStorage;
}

export default Storage;
