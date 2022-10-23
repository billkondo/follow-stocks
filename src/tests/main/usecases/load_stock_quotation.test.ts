import Stock from '@entities/stock/stock';
import StockQuotation from '@entities/stock_quotation';
import { mock } from 'jest-mock-extended';
import StocksQuotationsRepository from 'main/repositories/stocks_quotations_repository';
import LoadStockQuotation from 'main/usecases/load_stock_quotation';

describe('Load stock quotation', () => {
  test('should load stock quotation', async () => {
    const stocksQuotationsRepository = mock<StocksQuotationsRepository>();
    const loadStockQuotation = LoadStockQuotation(stocksQuotationsRepository);
    const mockStock = mock<Stock>();
    const mockStockQuotation = mock<StockQuotation>();

    stocksQuotationsRepository.loadStockQuotation.mockResolvedValue(
      mockStockQuotation,
    );

    await expect(loadStockQuotation(mockStock)).resolves.toEqual(
      mockStockQuotation,
    );
    expect(stocksQuotationsRepository.loadStockQuotation).toBeCalledWith(
      mockStock,
    );
    expect(stocksQuotationsRepository.saveStockQuotation).toBeCalledWith(
      mockStockQuotation,
    );
  });
});
