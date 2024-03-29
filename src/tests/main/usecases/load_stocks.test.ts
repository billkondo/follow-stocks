import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';
import StocksRepository from '@repositories/stocks_repository';
import { mock } from 'jest-mock-extended';
import LoadStocks from 'main/usecases/load_stocks';

describe('Load stocks', () => {
  test('should loads stocks', async () => {
    const mockStocksRepository = mock<StocksRepository>();
    const mockStocks = mock<Stock[]>();
    const mockStockType = mock<StockType>();
    const loadStocks = LoadStocks(mockStocksRepository);

    mockStocksRepository.load.mockResolvedValue(mockStocks);
    await loadStocks(mockStockType);
    expect(mockStocksRepository.load).toBeCalledWith(mockStockType);
    expect(mockStocksRepository.saveMany).toBeCalledWith(mockStocks);
  });
});
