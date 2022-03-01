import Stock from 'domain/stock';
import SearchStocksByTicker from 'main/usecases/search_stocks_by_ticker';
import useFIIs from 'tests/hooks/use_fiis';
import useSqlite from 'tests/hooks/use_sqlite';

describe('Search FIIs by ticker', () => {
  useSqlite();
  const { fiisServiceFactory } = useFIIs();

  const setup = () => {
    const fiisService = fiisServiceFactory();
    const searchFIIsByTicker = SearchStocksByTicker(fiisService);

    return {
      searchFIIsByTicker,
    };
  };

  beforeEach(async () => {
    const fiisService = fiisServiceFactory();

    await fiisService.save([
      {
        name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
        ticker: 'HGRE11',
      },
      {
        name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
        ticker: 'HGRU11',
      },
      {
        name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
        ticker: 'HGLG11',
      },
      {
        name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
        ticker: 'XPCI11',
      },
      {
        name: 'XP LOG FDO INV IMOB - FII',
        ticker: 'XPLG11',
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
        },
        {
          name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
          ticker: 'HGRU11',
        },
        {
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
        },
      ],
    ],
    [
      'G11',
      [
        {
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
        },
        {
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
        },
      ],
    ],
    [
      'LG',
      [
        {
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
        },
        {
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
        },
      ],
    ],
    [
      'XP',
      [
        {
          name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
          ticker: 'XPCI11',
        },
        {
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
        },
      ],
    ],
    [
      '',
      [
        {
          name: 'CSHG REAL ESTATE FDO INV IMOB - FII',
          ticker: 'HGRE11',
        },
        {
          name: 'CSHG RENDA URBANA - FDO INV IMOB - FII',
          ticker: 'HGRU11',
        },
        {
          name: 'CSHG LOGÍSTICA FDO INV IMOB - FII',
          ticker: 'HGLG11',
        },
        {
          name: 'XP CREDITO IMOBILIÁRIO - FDO INV IMOB',
          ticker: 'XPCI11',
        },
        {
          name: 'XP LOG FDO INV IMOB - FII',
          ticker: 'XPLG11',
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
