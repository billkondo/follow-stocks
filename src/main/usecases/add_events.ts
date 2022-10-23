import Event from '@entities/event/event';
import Stock from '@entities/stock/stock';
import DomainError from '@errors/domain_error';
import EventsRepository from '@repositories/events_repository';
import StocksInvestedRepository from '@repositories/stocks_invested_repository';
import StocksRepository from '@repositories/stocks_repository';
import UnitOfWorkRepository from '@repositories/unit_of_work_repository';
import AddEventsToList from './add_events_to_list';
import AssertEventsBalanceIsNotNegative from './assert_events_balance_is_not_negative';

const AddEvents =
  ({
    stocksRepository,
    eventsRepository,
    stocksInvestedRepository,
    unitOfWorkRepository,
  }: {
    stocksRepository: StocksRepository;
    eventsRepository: EventsRepository;
    stocksInvestedRepository: StocksInvestedRepository;
    unitOfWorkRepository: UnitOfWorkRepository;
  }) =>
  async (events: Event[]) => {
    assertNotEmpty(events);
    assertHaveSameStock(events);
    assertHaveSameCurrency(events);
    assertHaveSameDate(events);
    assertPriceIsPositive(events);
    assertQuantityIsPositive(events);

    const stock = events[0].stock;

    await assertStockExists(stocksRepository)(stock);

    const oldEvents = await eventsRepository.findEventsByStock(stock);
    const newEvents = AddEventsToList(oldEvents, events);

    assertHaveSameCurrencyAfterInsertion(newEvents);
    const stockInvested = AssertEventsBalanceIsNotNegative(newEvents);

    await unitOfWorkRepository.work(async () => {
      await eventsRepository.saveEvents(stock, newEvents);
      await stocksInvestedRepository.saveStockInvested(stockInvested);
    });
  };

const assertNotEmpty = (events: Event[]) => {
  if (!events.length) {
    throw new DomainError('events should not be empty');
  }
};

const assertHaveSameStock = (events: Event[]) => {
  const compareStocks = (stockA: Stock, stockB: Stock) =>
    JSON.stringify(stockA) == JSON.stringify(stockB);
  const firstStock = events[0].stock;

  for (const event of events)
    if (!compareStocks(firstStock, event.stock))
      throw new DomainError('events should have same stock');
};

const assertPriceIsPositive = (events: Event[]) => {
  for (const event of events)
    if (event.price.value <= 0)
      throw new DomainError('events prices should be positive');
};

const assertQuantityIsPositive = (events: Event[]) => {
  for (const event of events)
    if (event.quantity <= 0)
      throw new DomainError('events quantities should be positive');
};

const assertStockExists =
  (stocksRepository: StocksRepository) => async (stock: Stock) => {
    const exists = await stocksRepository.exists(stock);

    if (!exists) throw new DomainError('stock does not exist');
  };

const assertHaveSameCurrency = (events: Event[]) => {
  const firstCode = events[0].price.code;

  for (const event of events)
    if (event.price.code !== firstCode)
      throw new DomainError('events should have same currency');
};

const assertHaveSameDate = (events: Event[]) => {
  const firstDate = events[0].date;

  for (const event of events)
    if (firstDate.getTime() !== event.date.getTime())
      throw new DomainError('events should have same date');
};

const assertHaveSameCurrencyAfterInsertion = (events: Event[]) => {
  try {
    assertHaveSameCurrency(events);
  } catch (error) {
    if (
      error instanceof DomainError &&
      error.message === 'events should have same currency'
    )
      throw new DomainError(
        'events inserted do not have same currency than previous events',
      );
  }
};

export default AddEvents;
