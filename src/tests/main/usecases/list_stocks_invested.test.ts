import StockInvestedWithQuotation from 'domain/stock_invested_with_quotation';
import StockType from 'domain/stock_type';
import { mock } from 'jest-mock-extended';
import StocksInvestedWithQuotationsRepository from 'main/repositories/stocks_invested_wtih_quotations_repository';
import ListStocksInvested from 'main/usecases/list_stocks_invested';

describe('List stocks invested', () => {
  test('should list stocks invested', async () => {
    const mockStocksInvestedWithQuotationsRepository =
      mock<StocksInvestedWithQuotationsRepository>();
    const mockStocksInvestedWithQuotations =
      mock<StockInvestedWithQuotation[]>();
    const mockStockType = mock<StockType>();
    const listStocksInvested = ListStocksInvested(
      mockStocksInvestedWithQuotationsRepository,
    );

    mockStocksInvestedWithQuotationsRepository.listStocksInvestedWithQuotations.mockResolvedValue(
      mockStocksInvestedWithQuotations,
    );

    await expect(listStocksInvested(mockStockType)).resolves.toEqual(
      mockStocksInvestedWithQuotations,
    );
    expect(
      mockStocksInvestedWithQuotationsRepository.listStocksInvestedWithQuotations,
    ).toBeCalledWith(mockStockType);
  });
});
