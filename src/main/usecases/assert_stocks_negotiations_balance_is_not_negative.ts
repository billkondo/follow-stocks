import StockInvested from 'domain/entities/stock_invested/stock_invested';
import StockNegotiation from 'domain/entities/stock_negotiation/stock_negotiation';
import DomainError from 'domain/errors/domain_error';
import GenerateAveragePricesFromStocksNegotiations from './generate_average_prices_from_stocks_negotiations';

const AssertStocksNegotiationsBalanceIsNotNegative = (
  stocksNegotiations: StockNegotiation[],
) => {
  const generateAveragePricesFromStocksNegotiations =
    GenerateAveragePricesFromStocksNegotiations(stocksNegotiations);
  let data = generateAveragePricesFromStocksNegotiations.next();
  let lastStockInvested: StockInvested;

  do {
    lastStockInvested = data.value as StockInvested;
    const { quantity } = lastStockInvested;

    if (quantity < 0)
      throw new DomainError('total quantity should be greater than zero');

    data = generateAveragePricesFromStocksNegotiations.next();
  } while (!data.done);

  return lastStockInvested;
};

export default AssertStocksNegotiationsBalanceIsNotNegative;
