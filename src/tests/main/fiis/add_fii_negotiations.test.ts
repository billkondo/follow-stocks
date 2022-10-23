import Stock from '@entities/stock/stock';
import StockInvested from '@entities/stock_invested/stock_invested';
import StockNegotiation from '@entities/stock_negotiation/stock_negotiation';
import { mock } from 'jest-mock-extended';
import StocksInvestedRepository from 'main/repositories/stocks_invested_repository';
import AddStockNegotiations from 'main/usecases/add_stock_negotiations';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';
import useUnitOfWork from 'tests/hooks/use_unit_of_work';

describe('Add FII negotiations', () => {
  useSqlite();
  const {
    stocksServiceFactory,
    stocksNegotiationsServiceFactory,
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
    const stocksNegotiationsService = stocksNegotiationsServiceFactory();
    const stocksInvestedService = stocksInvestedServiceFactory();
    const unitOfWork = unitOfWorkServiceFactory();
    const addStockNegotiations = AddStockNegotiations({
      stocksNegotiationsRepository: stocksNegotiationsService,
      stocksRepository: stocksService,
      stocksInvestedRepository: stocksInvestedService,
      unitOfWorkRepository: unitOfWork,
    });

    return {
      addStockNegotiations,
      stocksService,
      stocksNegotiationsService,
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
    'should add FII negotiations',
    async (
      stock: Stock,
      fiiNegotiations: StockNegotiation[],
      previousFIINegotiations: StockNegotiation[],
      expectedFIINegotiations: StockNegotiation[],
      expectedStockInvested: StockInvested,
    ) => {
      const {
        addStockNegotiations,
        stocksNegotiationsService,
        stocksInvestedService,
      } = setup();

      await stocksNegotiationsService.saveStockNegotiations(
        stock,
        previousFIINegotiations,
      );
      await addStockNegotiations(fiiNegotiations);

      await expect(
        stocksNegotiationsService.findNegotiationsFromStock(stock),
      ).resolves.toEqual(expectedFIINegotiations);
      await expect(
        stocksInvestedService.findStockInvestedByStockTicker(stock.ticker),
      ).resolves.toEqual(expectedStockInvested);
    },
  );

  test('should not modify stocks negotiations when stock invested save fails', async () => {
    const { stocksNegotiationsService, stocksService, unitOfWork } = setup();
    const mockStocksInvestedRepository = mock<StocksInvestedRepository>();
    const addStockNegotiations = AddStockNegotiations({
      stocksInvestedRepository: mockStocksInvestedRepository,
      stocksNegotiationsRepository: stocksNegotiationsService,
      stocksRepository: stocksService,
      unitOfWorkRepository: unitOfWork,
    });
    const previousStockNegotiations: StockNegotiation[] = [
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

    await stocksNegotiationsService.saveStockNegotiations(
      hgreStock,
      previousStockNegotiations,
    );

    await expect(
      stocksNegotiationsService.findNegotiationsFromStock(hgreStock),
    ).resolves.toEqual(previousStockNegotiations);

    await expect(
      addStockNegotiations([
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

    await expect(
      stocksNegotiationsService.findNegotiationsFromStock(hgreStock),
    ).resolves.toEqual(previousStockNegotiations);
  });

  test('should add multiple negotiations concurrently', async () => {
    const {
      addStockNegotiations,
      stocksNegotiationsService,
      stocksInvestedService,
    } = setup();

    const stockNegotiationsFactory = (stock: Stock) => {
      const stockNegotiations: StockNegotiation[] = [
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

      return stockNegotiations;
    };

    await Promise.all([
      addStockNegotiations(stockNegotiationsFactory(xplgStock)),
      addStockNegotiations(stockNegotiationsFactory(hgreStock)),
      addStockNegotiations(stockNegotiationsFactory(vinoStock)),
    ]);

    for (const stock of [xplgStock, hgreStock, vinoStock]) {
      await expect(
        stocksNegotiationsService.findNegotiationsFromStock(stock),
      ).resolves.toEqual(stockNegotiationsFactory(stock));

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
    const { addStockNegotiations, stocksInvestedService } = setup();

    await addStockNegotiations([
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

    await addStockNegotiations([
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
