import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import AddStockNegotiations from 'main/usecases/add_stock_negotiations';
import useFIIs from 'tests/hooks/use_fiis';
import useSqlite from 'tests/hooks/use_sqlite';

describe('Add FII negotiations', () => {
  useSqlite();
  const { fiisServiceFactory, fiisNegotiationsServiceFactory } = useFIIs();
  const hgreStock: Stock = {
    name: 'HGRE Stock',
    ticker: 'HGRE11',
  };
  const xplgStock: Stock = {
    name: 'XPLG Stock',
    ticker: 'XPLG11',
  };

  const setup = () => {
    const fiisService = fiisServiceFactory();
    const fiisNegotiationsService = fiisNegotiationsServiceFactory();
    const addFIINegotiations = AddStockNegotiations({
      stocksNegotiationsRepository: fiisNegotiationsService,
      stocksRepository: fiisService,
    });

    return {
      addFIINegotiations,
      fiisService,
      fiisNegotiationsService,
    };
  };

  beforeEach(async () => {
    const fiisService = fiisServiceFactory();

    await fiisService.save([hgreStock, xplgStock]);
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
      const { addFIINegotiations, fiisNegotiationsService } = setup();

      await fiisNegotiationsService.saveStockNegotiations(
        stock,
        previousFIINegotiations,
      );
      await addFIINegotiations(fiiNegotiations);

      await expect(
        fiisNegotiationsService.findNegotiationsFromStock(stock),
      ).resolves.toEqual(expectedFIINegotiations);
    },
  );
});
