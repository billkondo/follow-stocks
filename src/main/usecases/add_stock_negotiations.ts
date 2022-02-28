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

    const oldStockNegotiations =
      await stocksNegotiationsRepository.findNegotiationsFromStock(stock);
    const newStockNegotiations = AddStockNegotiationsToList(
      oldStockNegotiations,
      stockNegotiations,
    );

    assertHaveSameCurrencyAfterInsertion(newStockNegotiations);
    AssertStocksNegotiationsBalanceIsNotNegative(newStockNegotiations);
    await stocksNegotiationsRepository.saveStockNegotiations(
      stock,
      newStockNegotiations,
    );
  };

const assertNotEmpty = (stockNegotiations: StockNegotiation[]) => {
  if (!stockNegotiations.length) {
    throw new DomainError('stock negotiations should not be empty');
  }
};

const assertHaveSameStock = (stockNegotiations: StockNegotiation[]) => {
  const compareStocks = (stockA: Stock, stockB: Stock) =>
    JSON.stringify(stockA) == JSON.stringify(stockB);
  const firstStock = stockNegotiations[0].stock;

  for (const stockNegotiation of stockNegotiations)
    if (!compareStocks(firstStock, stockNegotiation.stock))
      throw new DomainError('stock negotiations should have same stock');
};

const assertPriceIsPositive = (stockNegotiations: StockNegotiation[]) => {
  for (const stockNegotiation of stockNegotiations)
    if (stockNegotiation.price.value <= 0)
      throw new DomainError('stock negotiations prices should be positive');
};

const assertQuantityIsPositive = (stockNegotiations: StockNegotiation[]) => {
  for (const stockNegotiation of stockNegotiations)
    if (stockNegotiation.quantity <= 0)
      throw new DomainError('stock negotiations quantities should be positive');
};

const assertStockExists =
  (stocksRepository: StocksRepository) => async (stock: Stock) => {
    const exists = await stocksRepository.exists(stock);

    if (!exists) throw new DomainError('stock does not exist');
  };

const assertHaveSameCurrency = (stockNegotiations: StockNegotiation[]) => {
  const firstCode = stockNegotiations[0].price.code;

  for (const stockNegotiation of stockNegotiations)
    if (stockNegotiation.price.code !== firstCode)
      throw new DomainError('stock negotiations should have same currency');
};

const assertHaveSameDate = (stockNegotiations: StockNegotiation[]) => {
  const firstDate = stockNegotiations[0].date;

  for (const stockNegotiation of stockNegotiations)
    if (firstDate.getTime() !== stockNegotiation.date.getTime())
      throw new DomainError('stock negotiations should have same date');
};

const assertHaveSameCurrencyAfterInsertion = (
  stockNegotiations: StockNegotiation[],
) => {
  try {
    assertHaveSameCurrency(stockNegotiations);
  } catch (error) {
    if (
      error instanceof DomainError &&
      error.message === 'stock negotiations should have same currency'
    )
      throw new DomainError(
        'stock negotiations inserted do not have same currency than previous negotiations',
      );
  }
};

export default AddStockNegotiations;
