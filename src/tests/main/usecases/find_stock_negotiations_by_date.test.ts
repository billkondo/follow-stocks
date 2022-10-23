import Stock from 'domain/entities/stock/stock';
import StockNegotiation from 'domain/entities/stock_negotiation/stock_negotiation';
import { mock } from 'jest-mock-extended';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';
import FindStocksNegotiationsByDate from 'main/usecases/find_stock_negotiations_by_date';

describe('Find stock negotiations by date', () => {
  test('should return stock negotiations on given date', async () => {
    const mockStocksNegotiationsRepository =
      mock<StocksNegotiationsRepository>();
    const mockStock = mock<Stock>();
    const mockDate = mock<Date>();
    const mockStockNegotiations = mock<StockNegotiation[]>();
    const findStocksNegotiationsByDate = FindStocksNegotiationsByDate(
      mockStocksNegotiationsRepository,
    );

    mockStocksNegotiationsRepository.findStockNegotiationsByDate.mockResolvedValue(
      mockStockNegotiations,
    );
    expect(await findStocksNegotiationsByDate(mockStock, mockDate)).toBe(
      mockStockNegotiations,
    );
    expect(
      mockStocksNegotiationsRepository.findStockNegotiationsByDate,
    ).toHaveBeenCalledWith(mockStock, mockDate);
  });
});
