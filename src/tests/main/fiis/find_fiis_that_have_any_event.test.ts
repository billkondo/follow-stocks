import Event from '@entities/events/Event';
import Stock from '@entities/stocks/Stock';
import compareStocksInAscendingOrderByTicker from '@usecases/stock/compare_stocks_in_ascending_order_by_ticker';
import FindStocksThatHaveAnyEvent from 'main/usecases/find_stocks_that_have_any_event';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Find FIIs that have any event', () => {
  useSqlite();
  const { stocksServiceFactory, eventsServiceFactory } = useStocks();
  const xplgStock: Stock = {
    name: 'XPLG STOCK',
    ticker: 'XPLG11',
    type: 'FII',
    currencyCode: 'BRL',
  };
  const hgreStock: Stock = {
    name: 'HGRE STOCK',
    ticker: 'HGRE11',
    type: 'FII',
    currencyCode: 'BRL',
  };

  const setup = () => {
    const eventsService = eventsServiceFactory();
    const findStocksThatHaveAnyEvent =
      FindStocksThatHaveAnyEvent(eventsService);

    return {
      findStocksThatHaveAnyEvent,
    };
  };

  beforeEach(async () => {
    const fiisService = stocksServiceFactory();
    const fiisEventsService = eventsServiceFactory();

    await fiisService.saveMany([
      xplgStock,
      hgreStock,
      {
        name: 'HGLG STOCK',
        ticker: 'HGLG11',
        type: 'FII',
        currencyCode: 'BRL',
      },
    ]);

    await fiisEventsService.saveMany([
      new Event({
        stock: xplgStock,
        date: new Date(2022, 12, 1),
        quantity: 25,
        type: 'BUY',
        totalValue: null,
        unitPrice: 100,
      }),
      new Event({
        stock: xplgStock,
        date: new Date(2022, 12, 2),
        quantity: 17,
        type: 'SELL',
        totalValue: null,
        unitPrice: 125,
      }),
    ]);

    await fiisEventsService.saveMany([
      new Event({
        stock: hgreStock,
        date: new Date(2022, 12, 1),
        quantity: 5,
        type: 'BUY',
        totalValue: null,
        unitPrice: 150,
      }),
    ]);
  });

  test('should find FIIs that have any event', async () => {
    const { findStocksThatHaveAnyEvent } = setup();
    const fiis = await findStocksThatHaveAnyEvent('FII');

    expect(fiis.sort(compareStocksInAscendingOrderByTicker)).toEqual(
      [xplgStock, hgreStock].sort(compareStocksInAscendingOrderByTicker),
    );
  });
});
