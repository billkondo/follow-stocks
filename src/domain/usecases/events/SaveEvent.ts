import Event from '@entities/event/event';
import EventsRepository from '@repositories/events_repository';
import StocksRepository from '@repositories/stocks_repository';
import SaveStock from '@usecases/stocks/SaveStock';

const SaveEvent = ({
  eventsRepository,
  stocksRepository,
}: {
  eventsRepository: EventsRepository;
  stocksRepository: StocksRepository;
}) => {
  const saveStock = SaveStock({ stocksRepository });

  return async (event: Event) => {
    const { stock } = event;

    await saveStock(stock);
    await eventsRepository.save(event);
  };
};

export default SaveEvent;
