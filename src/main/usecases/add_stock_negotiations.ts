import DomainError from 'domain/domain_error';
import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';
import StocksRepository from 'main/repositories/stocks_repository';
import AddStockNegotiationsToList from './add_stock_negotiations_to_list';
import AssertStocksNegotiationsBalanceIsNotNegative from './assert_stocks_negotiations_balance_is_not_negative';

const AddStockNegotiations =
  ({
    stocksRepository,
    stocksNegotiationsRepository,
  }: {
    stocksRepository: StocksRepository;
    stocksNegotiationsRepository: StocksNegotiationsRepository;
  }) =>
  async (stockNegotiations: StockNegotiation[]) => {
    assertNotEmpty(stockNegotiations);
    assertHaveSameStock(stockNegotiations);
    assertHaveSameCurrency(stockNegotiations);
    assertHaveSameDate(stockNegotiations);
    assertPriceIsPositive(stockNegotiations);
    assertQuantityIsPositive(stockNegotiations);

    const stock = stockNegotiations[0].stock;

    await assertStockExists(stocksRepository)(stock);

    const oldStocksNegotiations =
      await stocksNegotiationsRepository.findNegotiationsFromStock(stock);
    const newStocksNegotiations = AddStockNegotiationsToList(
      oldStocksNegotiations,
      stockNegotiations,
    );

    assertHaveSameCurrencyAfterInsertion(newStocksNegotiations);
    AssertStocksNegotiationsBalanceIsNotNegative(newStocksNegotiations);
    await stocksNegotiationsRepository.saveStockNegotiations(
      stock,
      newStocksNegotiations,
    );
  };

const assertNotEmpty = (stocksNegotiations: StockNegotiation[]) => {
  if (!stocksNegotiations.length) {
    throw new DomainError('stocks negotiations should not be empty');
  }
};

const assertHaveSameStock = (stocksNegotiations: StockNegotiation[]) => {
  const compareStocks = (stockA: Stock, stockB: Stock) =>
    JSON.stringify(stockA) == JSON.stringify(stockB);
  const firstStock = stocksNegotiations[0].stock;

  for (const stockNegotiation of stocksNegotiations)
    if (!compareStocks(firstStock, stockNegotiation.stock))
      throw new DomainError('stocks negotiations should have same stock');
};

const assertPriceIsPositive = (stocksNegotiations: StockNegotiation[]) => {
  for (const stockNegotiation of stocksNegotiations)
    if (stockNegotiation.price.value <= 0)
      throw new DomainError('stock negotiations prices should be positive');
};

const assertQuantityIsPositive = (stocksNegotiations: StockNegotiation[]) => {
  for (const stockNegotiation of stocksNegotiations)
    if (stockNegotiation.quantity <= 0)
      throw new DomainError('stock negotiations quantities should be positive');
};

const assertStockExists =
  (stocksRepository: StocksRepository) => async (stock: Stock) => {
    const exists = await stocksRepository.exists(stock);

    if (!exists) throw new DomainError('stock does not exist');
  };

const assertHaveSameCurrency = (stocksNegotiations: StockNegotiation[]) => {
  const firstCode = stocksNegotiations[0].price.code;

  for (const stockNegotiation of stocksNegotiations)
    if (stockNegotiation.price.code !== firstCode)
      throw new DomainError('stocks negotiations should have same currency');
};

const assertHaveSameDate = (stocksNegotiations: StockNegotiation[]) => {
  const firstDate = stocksNegotiations[0].date;

  for (const stockNegotiation of stocksNegotiations)
    if (firstDate.getTime() !== stockNegotiation.date.getTime())
      throw new DomainError('stocks negotiations should have same date');
};

const assertHaveSameCurrencyAfterInsertion = (
  stocksNegotiations: StockNegotiation[],
) => {
  try {
    assertHaveSameCurrency(stocksNegotiations);
  } catch (error) {
    if (
      error instanceof DomainError &&
      error.message === 'stocks negotiations should have same currency'
    )
      throw new DomainError(
        'stocks negotiations inserted do not have same currency than previous negotiations',
      );
  }
};

export default AddStockNegotiations;