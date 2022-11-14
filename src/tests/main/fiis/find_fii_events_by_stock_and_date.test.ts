import Event from '@entities/event/event';
import Stock from '@entities/stocks/stock';
import FindEventsByStockAndDate from 'main/usecases/find_events_by_stock_and_date';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Find FII events by stock and date', () => {
  useSqlite();
  const { stocksServiceFactory, eventsServiceFactory } = useStocks();
  const hgreStock: Stock = {
    name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
    ticker: 'HGRE11',
    type: 'FII',
  };
  const xplgStock: Stock = {
    name: 'XP LOG FDO INV IMOB - FII',
    ticker: 'XPLG11',
    type: 'FII',
  };

  const setup = () => {
    const eventsService = eventsServiceFactory();
    const findEventsByStockAndDate = FindEventsByStockAndDate(eventsService);

    return { findEventsByStockAndDate };
  };

  beforeEach(async () => {
    const stocksService = stocksServiceFactory();
    const eventsService = eventsServiceFactory();

    await stocksService.saveMany([hgreStock, xplgStock]);
    await eventsService.saveMany([
      {
        date: new Date(2022, 12, 1),
        price: { code: 'BRL', value: 120 },
        quantity: 20,
        stock: hgreStock,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 2),
        price: { code: 'BRL', value: 150 },
        quantity: 10,
        stock: hgreStock,
        type: 'SELL',
      },
      {
        date: new Date(2022, 12, 2),
        price: { code: 'BRL', value: 135 },
        quantity: 10,
        stock: hgreStock,
        type: 'BUY',
      },
    ]);
    await eventsService.saveMany([
      {
        date: new Date(2021, 12, 1),
        price: { code: 'BRL', value: 50 },
        quantity: 30,
        stock: xplgStock,
        type: 'BUY',
      },
      {
        date: new Date(2021, 12, 1),
        price: { code: 'BRL', value: 100 },
        quantity: 10,
        stock: xplgStock,
        type: 'BUY',
      },
      {
        date: new Date(2021, 12, 1),
        price: { code: 'BRL', value: 75 },
        quantity: 40,
        stock: xplgStock,
        type: 'SELL',
      },
    ]);
  });

  test.each([
    [new Date(2022, 12, 3), hgreStock, []],
    [
      new Date(2022, 12, 1),
      hgreStock,
      [
        {
          date: new Date(2022, 12, 1),
          price: { code: 'BRL', value: 120 },
          quantity: 20,
          stock: hgreStock,
          type: 'BUY',
        },
      ] as Event[],
    ],
    [
      new Date(2022, 12, 2),
      hgreStock,
      [
        {
          date: new Date(2022, 12, 2),
          price: { code: 'BRL', value: 150 },
          quantity: 10,
          stock: hgreStock,
          type: 'SELL',
        },
        {
          date: new Date(2022, 12, 2),
          price: { code: 'BRL', value: 135 },
          quantity: 10,
          stock: hgreStock,
          type: 'BUY',
        },
      ] as Event[],
    ],
    [
      new Date(2021, 12, 1),
      xplgStock,
      [
        {
          date: new Date(2021, 12, 1),
          price: { code: 'BRL', value: 50 },
          quantity: 30,
          stock: xplgStock,
          type: 'BUY',
        },
        {
          date: new Date(2021, 12, 1),
          price: { code: 'BRL', value: 100 },
          quantity: 10,
          stock: xplgStock,
          type: 'BUY',
        },
        {
          date: new Date(2021, 12, 1),
          price: { code: 'BRL', value: 75 },
          quantity: 40,
          stock: xplgStock,
          type: 'SELL',
        },
      ] as Event[],
    ],
  ])(
    'should find FII events on given date',
    async (date: Date, stock: Stock, expectedEvents: Event[]) => {
      const { findEventsByStockAndDate } = setup();

      await expect(findEventsByStockAndDate(stock, date)).resolves.toEqual(
        expectedEvents,
      );
    },
  );
});
