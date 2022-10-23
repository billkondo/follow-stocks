import Stock from '@entities/stock/stock';
import compareStocksInAscendingOrderByTicker from 'domain/usecases/stock/compare_stocks_in_ascending_order_by_ticker';

describe('Compare stocks in ascending order by ticker', () => {
  test('should sort stocks in ascending order by ticker', () => {
    const stocks: Stock[] = [
      { name: 'XPLG STOCK', ticker: 'XPLG11', type: 'FII' },
      { name: 'VINO STOCK', ticker: 'VINO11', type: 'FII' },
      { name: 'ABCP11 STOCK', ticker: 'ABCP11', type: 'FII' },
      { name: 'XPPR STOCK', ticker: 'XPPR11', type: 'FII' },
    ];

    expect(stocks.sort(compareStocksInAscendingOrderByTicker)).toEqual([
      { name: 'ABCP11 STOCK', ticker: 'ABCP11', type: 'FII' },
      { name: 'VINO STOCK', ticker: 'VINO11', type: 'FII' },
      { name: 'XPLG STOCK', ticker: 'XPLG11', type: 'FII' },
      { name: 'XPPR STOCK', ticker: 'XPPR11', type: 'FII' },
    ]);
  });
});
