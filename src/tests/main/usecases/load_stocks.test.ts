import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';
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
    expect(mockStocksRepository.save).toBeCalledWith(mockStocks);
  });
});
