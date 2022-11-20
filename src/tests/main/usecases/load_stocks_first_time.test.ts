import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';
import StocksRepository from '@repositories/stocks_repository';
import { mock } from 'jest-mock-extended';
import LoadStocksFirstTime from 'main/usecases/load_stocks_first_time';

describe('Load stocks first time', () => {
  test('should not load stocks for first time if stocks are already loaded', async () => {
    const mockStocksRepository = mock<StocksRepository>();
    const mockStockType = mock<StockType>();
    const loadStocksFirstTime = LoadStocksFirstTime(mockStocksRepository);

    mockStocksRepository.count.mockResolvedValue(5);
    await expect(loadStocksFirstTime(mockStockType)).resolves.toBeFalsy();
    expect(mockStocksRepository.count).toBeCalledWith(mockStockType);
    expect(mockStocksRepository.load).not.toBeCalled();
  });

  test('should load stocks for first time', async () => {
    const mockStocksRepository = mock<StocksRepository>();
    const mockStocks = mock<Stock[]>();
    const mockStockType = mock<StockType>();
    const loadStocksFirstTime = LoadStocksFirstTime(mockStocksRepository);

    mockStocksRepository.count.mockResolvedValue(0);
    mockStocksRepository.load.mockResolvedValue(mockStocks);
    await expect(loadStocksFirstTime(mockStockType)).resolves.toBeTruthy();
    expect(mockStocksRepository.count).toBeCalledWith(mockStockType);
    expect(mockStocksRepository.load).toBeCalledWith(mockStockType);
    expect(mockStocksRepository.saveMany).toBeCalledWith(mockStocks);
  });
});
