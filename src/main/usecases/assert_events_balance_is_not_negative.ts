import Event from '@entities/event/event';
import StockInvested from '@entities/stock_invested/stock_invested';
import DomainError from '@errors/domain_error';
import GenerateAveragePricesFromEvents from './generate_average_prices_from_events';

const AssertEventsBalanceIsNotNegative = (events: Event[]) => {
  const generateAveragePricesFromEvents =
    GenerateAveragePricesFromEvents(events);
  let data = generateAveragePricesFromEvents.next();
  let lastStockInvested: StockInvested;

  do {
    lastStockInvested = data.value as StockInvested;
    const { quantity } = lastStockInvested;

    if (quantity < 0)
      throw new DomainError('total quantity should be greater than zero');

    data = generateAveragePricesFromEvents.next();
  } while (!data.done);

  return lastStockInvested;
};

export default AssertEventsBalanceIsNotNegative;
