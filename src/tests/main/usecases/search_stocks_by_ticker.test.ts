import Stock from 'domain/stock';
import StockType from 'domain/stock_type';
import { mock } from 'jest-mock-extended';
import StocksRepository from 'main/repositories/stocks_repository';
import SearchStocksByTicker from 'main/usecases/search_stocks_by_ticker';

describe('Search stocks by ticker', () => {
  test('should search stocks by ticker text', async () => {
    const mockStocksRepository = mock<StocksRepository>();
    const mockTickerText = 'XPL';
    const mockStocks = mock<Stock[]>();
    const mockStockType = mock<StockType>();
    const searchStocksByTicker = SearchStocksByTicker(mockStocksRepository);

    mockStocksRepository.search.mockResolvedValue(mockStocks);
    await expect(
      searchStocksByTicker(mockTickerText, mockStockType),
    ).resolves.toEqual(mockStocks);
    expect(mockStocksRepository.search).toHaveBeenCalledWith(
      mockTickerText,
      mockStockType,
    );
  });
});
