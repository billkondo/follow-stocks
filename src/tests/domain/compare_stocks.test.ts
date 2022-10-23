import Stock from '@entities/stock/stock';
import compareStocks from 'domain/usecases/compare_stocks';

describe('Compare stocks', () => {
  test('should sort stocks in ascending order by ticker', () => {
    const stocks: Stock[] = [
      { name: 'XPLG STOCK', ticker: 'XPLG11', type: 'FII' },
      { name: 'VINO STOCK', ticker: 'VINO11', type: 'FII' },
      { name: 'ABCP11 STOCK', ticker: 'ABCP11', type: 'FII' },
      { name: 'XPPR STOCK', ticker: 'XPPR11', type: 'FII' },
    ];

    expect(stocks.sort(compareStocks)).toEqual([
      { name: 'ABCP11 STOCK', ticker: 'ABCP11', type: 'FII' },
      { name: 'VINO STOCK', ticker: 'VINO11', type: 'FII' },
      { name: 'XPLG STOCK', ticker: 'XPLG11', type: 'FII' },
      { name: 'XPPR STOCK', ticker: 'XPPR11', type: 'FII' },
    ]);
  });
});
