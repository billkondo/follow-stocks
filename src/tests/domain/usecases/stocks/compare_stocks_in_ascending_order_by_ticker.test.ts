import Stock from '@entities/stocks/Stock';
import compareStocksInAscendingOrderByTicker from '@usecases/stock/compare_stocks_in_ascending_order_by_ticker';

describe('Compare stocks in ascending order by ticker', () => {
  test('should sort stocks in ascending order by ticker', () => {
    const stocks: Stock[] = [
      {
        currencyCode: 'BRL',
        name: 'XPLG STOCK',
        ticker: 'XPLG11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'VINO STOCK',
        ticker: 'VINO11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'ABCP11 STOCK',
        ticker: 'ABCP11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'XPPR STOCK',
        ticker: 'XPPR11',
        type: 'FII',
      },
    ];

    expect(stocks.sort(compareStocksInAscendingOrderByTicker)).toEqual([
      {
        currencyCode: 'BRL',
        name: 'ABCP11 STOCK',
        ticker: 'ABCP11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'VINO STOCK',
        ticker: 'VINO11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'XPLG STOCK',
        ticker: 'XPLG11',
        type: 'FII',
      },
      {
        currencyCode: 'BRL',
        name: 'XPPR STOCK',
        ticker: 'XPPR11',
        type: 'FII',
      },
    ]);
  });
});
