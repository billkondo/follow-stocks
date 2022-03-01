import Stock from 'domain/stock';
import { mock } from 'jest-mock-extended';
import StocksRepository from 'main/repositories/stocks_repository';
import LoadStocksFirstTime from 'main/usecases/load_stocks_first_time';

describe('Load stocks first time', () => {
  test('should not load stocks for first time if stocks are already loaded', async () => {
    const mockStocksRepository = mock<StocksRepository>();
    const loadStocksFirstTime = LoadStocksFirstTime(mockStocksRepository);

    mockStocksRepository.count.mockResolvedValue(5);
    await expect(loadStocksFirstTime()).resolves.toBeFalsy();
    expect(mockStocksRepository.load).not.toBeCalled();
  });

  test('should load stocks for first time', async () => {
    const mockStocksRepository = mock<StocksRepository>();
    const mockStocks = mock<Stock[]>();
    const loadStocksFirstTime = LoadStocksFirstTime(mockStocksRepository);

    mockStocksRepository.count.mockResolvedValue(0);
    mockStocksRepository.load.mockResolvedValue(mockStocks);
    await expect(loadStocksFirstTime()).resolves.toBeTruthy();
    expect(mockStocksRepository.load).toBeCalled();
    expect(mockStocksRepository.save).toBeCalledWith(mockStocks);
  });
});
