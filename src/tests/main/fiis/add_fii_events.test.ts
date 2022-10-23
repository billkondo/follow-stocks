import Event from '@entities/event/event';
import Stock from '@entities/stock/stock';
import StockInvested from '@entities/stock_invested/stock_invested';
import StocksInvestedRepository from '@repositories/stocks_invested_repository';
import { mock } from 'jest-mock-extended';
import AddEvents from 'main/usecases/add_events';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';
import useUnitOfWork from 'tests/hooks/use_unit_of_work';

describe('Add FII events', () => {
  useSqlite();
  const {
    stocksServiceFactory,
    eventsServiceFactory,
    stocksInvestedServiceFactory,
  } = useStocks();
  const { unitOfWorkServiceFactory } = useUnitOfWork();
  const hgreStock: Stock = {
    name: 'HGRE Stock',
    ticker: 'HGRE11',
    type: 'FII',
  };
  const xplgStock: Stock = {
    name: 'XPLG Stock',
    ticker: 'XPLG11',
    type: 'FII',
  };
  const vinoStock: Stock = {
    name: 'VINO11',
    ticker: 'VINO Stock',
    type: 'FII',
  };

  const setup = () => {
    const stocksService = stocksServiceFactory();
    const eventsService = eventsServiceFactory();
    const stocksInvestedService = stocksInvestedServiceFactory();
    const unitOfWork = unitOfWorkServiceFactory();
    const addEvents = AddEvents({
      eventsRepository: eventsService,
      stocksRepository: stocksService,
      stocksInvestedRepository: stocksInvestedService,
      unitOfWorkRepository: unitOfWork,
    });

    return {
      addEvents,
      stocksService,
      eventsService,
      stocksInvestedService,
      unitOfWork,
    };
  };

  beforeEach(async () => {
    const stocksService = stocksServiceFactory();

    await stocksService.save([hgreStock, xplgStock, vinoStock]);
  });

  test.each([
    [
      hgreStock,
      [
        {
          type: 'SELL',
          price: {
            value: 170,
            code: 'BRL',
          },
          quantity: 15,
          stock: hgreStock,
          date: new Date(2022, 3, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 100,
            code: 'BRL',
          },
          quantity: 10,
          stock: hgreStock,
          date: new Date(2022, 3, 10),
        },
      ],
      [
        {
          type: 'BUY',
          price: {
            value: 120,
            code: 'BRL',
          },
          quantity: 20,
          stock: hgreStock,
          date: new Date(2022, 1, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 150,
            code: 'BRL',
          },
          quantity: 50,
          stock: hgreStock,
          date: new Date(2022, 2, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 120,
            code: 'BRL',
          },
          quantity: 5,
          stock: hgreStock,
          date: new Date(2022, 4, 10),
        },
      ],
      [
        {
          type: 'BUY',
          price: {
            value: 120,
            code: 'BRL',
          },
          quantity: 20,
          stock: hgreStock,
          date: new Date(2022, 1, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 150,
            code: 'BRL',
          },
          quantity: 50,
          stock: hgreStock,
          date: new Date(2022, 2, 10),
        },
        {
          type: 'SELL',
          price: {
            value: 170,
            code: 'BRL',
          },
          quantity: 15,
          stock: hgreStock,
          date: new Date(2022, 3, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 100,
            code: 'BRL',
          },
          quantity: 10,
          stock: hgreStock,
          date: new Date(2022, 3, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 120,
            code: 'BRL',
          },
          quantity: 5,
          stock: hgreStock,
          date: new Date(2022, 4, 10),
        },
      ],
      {
        quantity: 70,
        stock: hgreStock,
        totalInvested: { value: 9378.5714, code: 'BRL' },
        averagePrice: { value: 133.9796, code: 'BRL' },
      } as StockInvested,
    ],
    [
      xplgStock,
      [
        {
          type: 'BUY',
          price: {
            value: 100,
            code: 'BRL',
          },
          quantity: 10,
          stock: xplgStock,
          date: new Date(2022, 4, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 140,
            code: 'BRL',
          },
          quantity: 30,
          stock: xplgStock,
          date: new Date(2022, 4, 10),
        },
      ],
      [
        {
          type: 'BUY',
          price: {
            value: 120,
            code: 'BRL',
          },
          quantity: 20,
          stock: xplgStock,
          date: new Date(2022, 4, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 120,
            code: 'BRL',
          },
          quantity: 20,
          stock: xplgStock,
          date: new Date(2022, 4, 10),
        },
        {
          type: 'SELL',
          price: {
            value: 120,
            code: 'BRL',
          },
          quantity: 40,
          stock: xplgStock,
          date: new Date(2022, 4, 12),
        },
      ],
      [
        {
          type: 'BUY',
          price: {
            value: 100,
            code: 'BRL',
          },
          quantity: 10,
          stock: xplgStock,
          date: new Date(2022, 4, 10),
        },
        {
          type: 'BUY',
          price: {
            value: 140,
            code: 'BRL',
          },
          quantity: 30,
          stock: xplgStock,
          date: new Date(2022, 4, 10),
        },
        {
          type: 'SELL',
          price: {
            value: 120,
            code: 'BRL',
          },
          quantity: 40,
          stock: xplgStock,
          date: new Date(2022, 4, 12),
        },
      ],
      {
        stock: { name: 'XPLG Stock', ticker: 'XPLG11', type: 'FII' },
        quantity: 0,
        totalInvested: { value: 0, code: 'BRL' },
        averagePrice: { value: 0, code: 'BRL' },
      } as StockInvested,
    ],
  ])(
    'should add FII events',
    async (
      stock: Stock,
      fiiEvents: Event[],
      previousFIIEvents: Event[],
      expectedFIIEvents: Event[],
      expectedStockInvested: StockInvested,
    ) => {
      const { addEvents, eventsService, stocksInvestedService } = setup();

      await eventsService.saveEvents(stock, previousFIIEvents);
      await addEvents(fiiEvents);

      await expect(eventsService.findEventsByStock(stock)).resolves.toEqual(
        expectedFIIEvents,
      );
      await expect(
        stocksInvestedService.findStockInvestedByStockTicker(stock.ticker),
      ).resolves.toEqual(expectedStockInvested);
    },
  );

  test('should not modify events when stock invested save fails', async () => {
    const { eventsService, stocksService, unitOfWork } = setup();
    const mockStocksInvestedRepository = mock<StocksInvestedRepository>();
    const addEvents = AddEvents({
      stocksInvestedRepository: mockStocksInvestedRepository,
      eventsRepository: eventsService,
      stocksRepository: stocksService,
      unitOfWorkRepository: unitOfWork,
    });
    const previousEvents: Event[] = [
      {
        date: new Date(2022, 11, 28),
        price: {
          code: 'BRL',
          value: 150,
        },
        quantity: 20,
        stock: hgreStock,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 30),
        price: {
          code: 'BRL',
          value: 140,
        },
        quantity: 10,
        stock: hgreStock,
        type: 'BUY',
      },
    ];

    mockStocksInvestedRepository.saveStockInvested.mockRejectedValue(
      new Error('Mock Error'),
    );

    await eventsService.saveEvents(hgreStock, previousEvents);

    await expect(eventsService.findEventsByStock(hgreStock)).resolves.toEqual(
      previousEvents,
    );

    await expect(
      addEvents([
        {
          date: new Date(2022, 12, 1),
          price: {
            code: 'BRL',
            value: 120,
          },
          quantity: 20,
          stock: hgreStock,
          type: 'BUY',
        },
      ]),
    ).rejects.toThrow(new Error('Mock Error'));

    await expect(eventsService.findEventsByStock(hgreStock)).resolves.toEqual(
      previousEvents,
    );
  });

  test('should add multiple events concurrently', async () => {
    const { addEvents, eventsService, stocksInvestedService } = setup();

    const EventsFactory = (stock: Stock) => {
      const Events: Event[] = [
        {
          date: new Date(2022, 12, 1),
          price: {
            code: 'BRL',
            value: 125,
          },
          quantity: 20,
          stock,
          type: 'BUY',
        },
        {
          date: new Date(2022, 12, 1),
          price: {
            code: 'BRL',
            value: 150,
          },
          quantity: 5,
          stock,
          type: 'SELL',
        },
        {
          date: new Date(2022, 12, 1),
          price: {
            code: 'BRL',
            value: 115,
          },
          quantity: 10,
          stock,
          type: 'BUY',
        },
      ];

      return Events;
    };

    await Promise.all([
      addEvents(EventsFactory(xplgStock)),
      addEvents(EventsFactory(hgreStock)),
      addEvents(EventsFactory(vinoStock)),
    ]);

    for (const stock of [xplgStock, hgreStock, vinoStock]) {
      await expect(eventsService.findEventsByStock(stock)).resolves.toEqual(
        EventsFactory(stock),
      );

      await expect(
        stocksInvestedService.findStockInvestedByStockTicker(stock.ticker),
      ).resolves.toEqual({
        quantity: 25,
        stock,
        averagePrice: {
          code: 'BRL',
          value: 121,
        },
        totalInvested: {
          code: 'BRL',
          value: 3025,
        },
      } as StockInvested);
    }
  });

  test('should handle decimal quantities', async () => {
    const { addEvents, stocksInvestedService } = setup();

    await addEvents([
      {
        date: new Date(2022, 12, 1),
        price: {
          code: 'BRL',
          value: 200,
        },
        quantity: 0.3333,
        stock: xplgStock,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 1),
        price: {
          code: 'BRL',
          value: 205,
        },
        quantity: 0.7777,
        stock: xplgStock,
        type: 'BUY',
      },
    ]);
    await expect(
      stocksInvestedService.findStockInvestedByStockTicker(xplgStock.ticker),
    ).resolves.toEqual({
      quantity: 1.111,
      stock: xplgStock,
      totalInvested: {
        code: 'BRL',
        value: 226.0885,
      },
      averagePrice: {
        code: 'BRL',
        value: 203.5,
      },
    } as StockInvested);

    await addEvents([
      {
        date: new Date(2022, 12, 2),
        price: {
          code: 'BRL',
          value: 243.23,
        },
        quantity: 0.5673,
        stock: xplgStock,
        type: 'SELL',
      },
      {
        date: new Date(2022, 12, 2),
        price: {
          code: 'BRL',
          value: 245.25,
        },
        quantity: 0.5437,
        stock: xplgStock,
        type: 'SELL',
      },
    ]);
    await expect(
      stocksInvestedService.findStockInvestedByStockTicker(xplgStock.ticker),
    ).resolves.toEqual({
      averagePrice: {
        code: 'BRL',
        value: 0,
      },
      quantity: 0,
      stock: xplgStock,
      totalInvested: {
        code: 'BRL',
        value: 0,
      },
    } as StockInvested);
  });
});
