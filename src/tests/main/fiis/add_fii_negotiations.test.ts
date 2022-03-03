import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import AddStockNegotiations from 'main/usecases/add_stock_negotiations';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Add FII negotiations', () => {
  useSqlite();
  const { stocksServiceFactory, stocksNegotiationsServiceFactory } =
    useStocks();
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

  const setup = () => {
    const stocksService = stocksServiceFactory();
    const stocksNegotiationsService = stocksNegotiationsServiceFactory();
    const addStockNegotiations = AddStockNegotiations({
      stocksNegotiationsRepository: stocksNegotiationsService,
      stocksRepository: stocksService,
    });

    return {
      addStockNegotiations,
      stocksService,
      stocksNegotiationsService,
    };
  };

  beforeEach(async () => {
    const stocksService = stocksServiceFactory();

    await stocksService.save([hgreStock, xplgStock]);
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
    ],
  ])(
    'should add FII negotiations',
    async (
      stock: Stock,
      fiiNegotiations: StockNegotiation[],
      previousFIINegotiations: StockNegotiation[],
      expectedFIINegotiations: StockNegotiation[],
    ) => {
      const { addStockNegotiations, stocksNegotiationsService } = setup();

      await stocksNegotiationsService.saveStockNegotiations(
        stock,
        previousFIINegotiations,
      );
      await addStockNegotiations(fiiNegotiations);

      await expect(
        stocksNegotiationsService.findNegotiationsFromStock(stock),
      ).resolves.toEqual(expectedFIINegotiations);
    },
  );
});
