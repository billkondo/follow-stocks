import Stock from 'domain/stock';
import { mock } from 'jest-mock-extended';
import StocksRepository from 'main/repositories/stocks_repository';
import LoadStocks from 'main/usecases/load_stocks';

describe('Load stocks', () => {
  test('should loads stocks', async () => {
    const mockStocksRepository = mock<StocksRepository>();
    const mockStocks = mock<Stock[]>();
    const loadStocks = LoadStocks(mockStocksRepository);

    mockStocksRepository.load.mockResolvedValue(mockStocks);
    await loadStocks();
    expect(mockStocksRepository.load).toBeCalled();
    expect(mockStocksRepository.save).toBeCalledWith(mockStocks);
  });
});
