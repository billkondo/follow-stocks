import Stock from 'domain/entities/stock/stock';
import StockType from 'domain/entities/stock/stock_type';
import { mock } from 'jest-mock-extended';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';
import FindStocksThatHaveAnyNegotiation from 'main/usecases/find_stocks_that_have_any_negotiation';

describe('Find stocks that have any negotiation', () => {
  test('should find stocks that have any negotiation', async () => {
    const mockStocksNegotiationsRepository =
      mock<StocksNegotiationsRepository>();
    const mockStockType = mock<StockType>();
    const findStocksThatHaveAnyNegotiation = FindStocksThatHaveAnyNegotiation(
      mockStocksNegotiationsRepository,
    );
    const mockStocks = mock<Stock[]>();

    mockStocksNegotiationsRepository.findStocksThatHaveAnyNegotiation.mockResolvedValue(
      mockStocks,
    );
    await expect(findStocksThatHaveAnyNegotiation(mockStockType)).resolves.toBe(
      mockStocks,
    );
    expect(
      mockStocksNegotiationsRepository.findStocksThatHaveAnyNegotiation,
    ).toBeCalledWith(mockStockType);
  });
});
