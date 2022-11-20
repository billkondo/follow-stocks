import Event from '@entities/events/Event';
import Stock from '@entities/stocks/Stock';
import FindEventsByStockAndDate from 'main/usecases/find_events_by_stock_and_date';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Find FII events by stock and date', () => {
  useSqlite();
  const { stocksServiceFactory, eventsServiceFactory } = useStocks();
  const hgreStock: Stock = {
    currencyCode: 'BRL',
    name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
    ticker: 'HGRE11',
    type: 'FII',
  };
  const xplgStock: Stock = {
    currencyCode: 'BRL',
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
      new Event({
        date: new Date(2022, 12, 1),
        quantity: 20,
        stock: hgreStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 120,
      }),
      new Event({
        date: new Date(2022, 12, 2),
        quantity: 10,
        stock: hgreStock,
        type: 'SELL',
        totalValue: null,
        unitPrice: 150,
      }),
      new Event({
        date: new Date(2022, 12, 2),
        quantity: 10,
        stock: hgreStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 135,
      }),
    ]);
    await eventsService.saveMany([
      new Event({
        date: new Date(2021, 12, 1),
        quantity: 30,
        stock: xplgStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 50,
      }),
      new Event({
        date: new Date(2021, 12, 1),
        quantity: 10,
        stock: xplgStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 100,
      }),
      new Event({
        date: new Date(2021, 12, 1),
        quantity: 40,
        stock: xplgStock,
        type: 'SELL',
        totalValue: null,
        unitPrice: 75,
      }),
    ]);
  });

  test.each([
    [new Date(2022, 12, 3), hgreStock, []],
    [
      new Date(2022, 12, 1),
      hgreStock,
      [
        new Event({
          date: new Date(2022, 12, 1),
          quantity: 20,
          stock: hgreStock,
          type: 'BUY',
          totalValue: null,
          unitPrice: 120,
        }),
      ],
    ],
    [
      new Date(2022, 12, 2),
      hgreStock,
      [
        new Event({
          date: new Date(2022, 12, 2),
          quantity: 10,
          stock: hgreStock,
          type: 'SELL',
          totalValue: null,
          unitPrice: 150,
        }),
        new Event({
          date: new Date(2022, 12, 2),
          quantity: 10,
          stock: hgreStock,
          type: 'BUY',
          totalValue: null,
          unitPrice: 135,
        }),
      ],
    ],
    [
      new Date(2021, 12, 1),
      xplgStock,
      [
        new Event({
          date: new Date(2021, 12, 1),
          quantity: 30,
          stock: xplgStock,
          type: 'BUY',
          totalValue: null,
          unitPrice: 50,
        }),
        new Event({
          date: new Date(2021, 12, 1),
          quantity: 10,
          stock: xplgStock,
          type: 'BUY',
          totalValue: null,
          unitPrice: 100,
        }),
        new Event({
          date: new Date(2021, 12, 1),
          quantity: 40,
          stock: xplgStock,
          type: 'SELL',
          totalValue: null,
          unitPrice: 75,
        }),
      ],
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
