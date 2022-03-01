import Stock from 'domain/stock';
import SearchStocksByTicker from 'main/usecases/search_stocks_by_ticker';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Search FIIs by ticker', () => {
  useSqlite();
  const { stocksServiceFactory } = useStocks();

  const setup = () => {
    const fiisService = stocksServiceFactory();
    const searchFIIsByTicker = SearchStocksByTicker(fiisService);

    return {
      searchFIIsByTicker,
    };
  };

  beforeEach(async () => {
    const fiisService = stocksServiceFactory();

    await fiisService.save([
      {
        name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
        ticker: 'HGRE11',
        type: 'FII',
      },
      {
        name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
        ticker: 'HGRU11',

        type: 'FII',
      },
      {
        name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
        ticker: 'HGLG11',
        type: 'FII',
      },
      {
        name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
        ticker: 'XPCI11',
        type: 'FII',
      },
      {
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
          name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
          ticker: 'HGRE11',
          type: 'FII',
        },
        {
          name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
          ticker: 'HGRU11',
          type: 'FII',
        },
        {
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
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
          type: 'FII',
        },
        {
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
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
          type: 'FII',
        },
        {
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
          name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
          ticker: 'XPCI11',
          type: 'FII',
        },
        {
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
          name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
          ticker: 'HGRE11',
          type: 'FII',
        },
        {
          name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
          ticker: 'HGRU11',
          type: 'FII',
        },
        {
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
          type: 'FII',
        },
        {
          name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
          ticker: 'XPCI11',
          type: 'FII',
        },
        {
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
          type: 'FII',
        },
      ],
    ],
  ])(
    'should search FIIs by ticker text',
    async (searchText: string, expectedStocks: Stock[]) => {
      const { searchFIIsByTicker } = setup();

      expect(await searchFIIsByTicker(searchText)).toEqual(expectedStocks);
    },
  );
});
