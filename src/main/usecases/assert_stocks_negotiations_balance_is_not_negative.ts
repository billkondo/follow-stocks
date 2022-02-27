import DomainError from 'domain/domain_error';
import StockNegotiation from 'domain/stock_negotiation';
import GenerateAveragePricesFromStocksNegotiations from './generate_average_prices_from_stocks_negotiations';

const AssertStocksNegotiationsBalanceIsNotNegative = (
  stocksNegotiations: StockNegotiation[],
) => {
  const generateAveragePricesFromStocksNegotiations =
    GenerateAveragePricesFromStocksNegotiations(stocksNegotiations);
  let data = generateAveragePricesFromStocksNegotiations.next();

  do {
    const { totalQuantity } = data.value as {
      totalQuantity: number;
    };

    if (totalQuantity < 0)
      throw new DomainError('total quantity should be greater than zero');

    data = generateAveragePricesFromStocksNegotiations.next();
  } while (!data.done);
};

export default AssertStocksNegotiationsBalanceIsNotNegative;
