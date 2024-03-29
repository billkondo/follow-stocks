import Stock from '@entities/stocks/Stock';
import SearchStocksByTicker from 'main/usecases/search_stocks_by_ticker';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Search FIIs by ticker', () => {
  useSqlite();
  const { stocksServiceFactory } = useStocks();

  const setup = () => {
    const stocksService = stocksServiceFactory();
    const searchStocksByTicker = SearchStocksByTicker(stocksService);

    return {
      searchStocksByTicker,
    };
  };

  beforeEach(async () => {
    const stocksService = stocksServiceFactory();

    await stocksService.saveMany([
      {
        currencyCode: 'BRL',
        name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
        ticker: 'HGRE11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
        ticker: 'HGRU11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
        ticker: 'HGLG11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
        ticker: 'XPCI11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'XP LOG FDO INV IMOB - FII',
        ticker: 'XPLG11',
        type: 'FII',
      },
    ]);
  });

  test.each([
    [
      'HG',
      [
        {
          currencyCode: 'BRL',
          name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
          ticker: 'HGRE11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
          ticker: 'HGRU11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
          type: 'FII',
        },
      ],
    ],
    [
      'G11',
      [
        {
          currencyCode: 'BRL',
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
          type: 'FII',
        },
      ],
    ],
    [
      'LG',
      [
        {
          currencyCode: 'BRL',
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
          type: 'FII',
        },
      ],
    ],
    [
      'XP',
      [
        {
          currencyCode: 'BRL',
          name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
          ticker: 'XPCI11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
          type: 'FII',
        },
      ],
    ],
    [
      '',
      [
        {
          currencyCode: 'BRL',
          name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
          ticker: 'HGRE11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
          ticker: 'HGRU11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
          ticker: 'XPCI11',
          type: 'FII',
        },
        {
          currencyCode: 'BRL',
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
          type: 'FII',
        },
      ],
    ],
  ])(
    'should search FIIs by ticker text',
    async (searchText: string, expectedStocks: Stock[]) => {
      const { searchStocksByTicker } = setup();

      expect(await searchStocksByTicker(searchText, 'FII')).toEqual(
        expectedStocks,
      );
    },
  );
});
