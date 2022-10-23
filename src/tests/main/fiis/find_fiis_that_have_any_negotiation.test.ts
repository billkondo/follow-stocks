import Stock from '@entities/stock/stock';
import compareStocksInAscendingOrderByTicker from 'domain/usecases/compare_stocks_in_ascending_order_by_ticker';
import FindStocksThatHaveAnyNegotiation from 'main/usecases/find_stocks_that_have_any_negotiation';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Find FIIs that have any negotiation', () => {
  useSqlite();
  const { stocksServiceFactory, stocksNegotiationsServiceFactory } =
    useStocks();
  const xplgStock: Stock = {
    name: 'XPLG STOCK',
    ticker: 'XPLG11',
    type: 'FII',
  };
  const hgreStock: Stock = {
    name: 'HGRE STOCK',
    ticker: 'HGRE11',
    type: 'FII',
  };

  const setup = () => {
    const stocksNegotiationsService = stocksNegotiationsServiceFactory();
    const findStocksThatHaveAnyNegotiation = FindStocksThatHaveAnyNegotiation(
      stocksNegotiationsService,
    );

    return {
      findStocksThatHaveAnyNegotiation,
    };
  };

  beforeEach(async () => {
    const fiisService = stocksServiceFactory();
    const fiisNegotiationsService = stocksNegotiationsServiceFactory();

    await fiisService.save([
      xplgStock,
      hgreStock,
      { name: 'HGLG STOCK', ticker: 'HGLG11', type: 'FII' },
    ]);

    await fiisNegotiationsService.saveStockNegotiations(xplgStock, [
      {
        stock: xplgStock,
        date: new Date(2022, 12, 1),
        price: { value: 100, code: 'BRL' },
        quantity: 25,
        type: 'BUY',
      },
      {
        stock: xplgStock,
        date: new Date(2022, 12, 2),
        price: { value: 125, code: 'BRL' },
        quantity: 17,
        type: 'SELL',
      },
    ]);

    await fiisNegotiationsService.saveStockNegotiations(hgreStock, [
      {
        stock: hgreStock,
        date: new Date(2022, 12, 1),
        price: { value: 150, code: 'BRL' },
        quantity: 5,
        type: 'BUY',
      },
    ]);
  });

  test('should find FIIs that have any negotiation', async () => {
    const { findStocksThatHaveAnyNegotiation } = setup();
    const fiis = await findStocksThatHaveAnyNegotiation('FII');

    expect(fiis.sort(compareStocksInAscendingOrderByTicker)).toEqual(
      [xplgStock, hgreStock].sort(compareStocksInAscendingOrderByTicker),
    );
  });
});
