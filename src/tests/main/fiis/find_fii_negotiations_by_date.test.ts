import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import FindStockNegotiationsByDate from 'main/usecases/find_stock_negotiations_by_date';
import useFIIs from 'tests/hooks/use_fiis';
import useSqlite from 'tests/hooks/use_sqlite';

describe('Find FII negotiations by date', () => {
  useSqlite();
  const { fiisServiceFactory, fiisNegotiationsServiceFactory } = useFIIs();
  const hgreStock: Stock = {
    name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
    ticker: 'HGRE11',
  };
  const xplgStock: Stock = {
    name: 'XP LOG FDO INV IMOB - FII',
    ticker: 'XPLG11',
  };

  const setup = () => {
    const fiisNegotiationsRepository = fiisNegotiationsServiceFactory();
    const findFIINegotiationsByDate = FindStockNegotiationsByDate(
      fiisNegotiationsRepository,
    );

    return { findFIINegotiationsByDate };
  };

  beforeEach(async () => {
    const fiisService = fiisServiceFactory();
    const fiisNegotiationsService = fiisNegotiationsServiceFactory();

    await fiisService.save([hgreStock, xplgStock]);
    await fiisNegotiationsService.saveStockNegotiations(hgreStock, [
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
    await fiisNegotiationsService.saveStockNegotiations(xplgStock, [
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
      ],
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
      ],
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
      ],
    ],
  ])(
    'should find FII negotiations on given date',
    async (
      date: Date,
      stock: Stock,
      expectedStockNegotiations: StockNegotiation[],
    ) => {
      const { findFIINegotiationsByDate } = setup();

      await expect(findFIINegotiationsByDate(stock, date)).resolves.toEqual(
        expectedStockNegotiations,
      );
    },
  );
});
