import Stock from 'domain/stock';
import compareStocks from 'domain/usecases/compare_stocks';

describe('Compare stocks', () => {
  test('should sort stocks in ascending order by ticker', () => {
    const stocks: Stock[] = [
      { name: 'XPLG STOCK', ticker: 'XPLG11' },
      { name: 'VINO STOCK', ticker: 'VINO11' },
      { name: 'ABCP11 STOCK', ticker: 'ABCP11' },
      { name: 'XPPR STOCK', ticker: 'XPPR11' },
    ];

    expect(stocks.sort(compareStocks)).toEqual([
      { name: 'ABCP11 STOCK', ticker: 'ABCP11' },
      { name: 'VINO STOCK', ticker: 'VINO11' },
      { name: 'XPLG STOCK', ticker: 'XPLG11' },
      { name: 'XPPR STOCK', ticker: 'XPPR11' },
    ]);
  });
});
