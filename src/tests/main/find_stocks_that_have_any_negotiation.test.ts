import Stock from 'domain/stock';
import { mock } from 'jest-mock-extended';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';
import FindStocksThatHaveAnyNegotiation from 'main/usecases/find_stocks_that_have_any_negotiation';

describe('Find stocks that have any negotiation', () => {
  test('should find stocks that have any negotiation', async () => {
    const mockStocksNegotiationsRepository =
      mock<StocksNegotiationsRepository>();
    const findStocksThatHaveAnyNegotiation = FindStocksThatHaveAnyNegotiation(
      mockStocksNegotiationsRepository,
    );
    const mockStocks = mock<Stock[]>();

    mockStocksNegotiationsRepository.findStocksThatHaveAnyNegotiation.mockResolvedValue(
      mockStocks,
    );
    await expect(findStocksThatHaveAnyNegotiation()).resolves.toBe(mockStocks);
    expect(
      mockStocksNegotiationsRepository.findStocksThatHaveAnyNegotiation,
    ).toBeCalled();
  });
});
