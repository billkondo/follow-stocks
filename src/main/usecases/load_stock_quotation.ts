import Stock from 'domain/stock';
import StockQuotation from 'domain/stock_quotation';
import StocksQuotationsRepository from 'main/repositories/stocks_quotations_repository';

const LoadStockQuotation =
  (stocksQuotationsRepository: StocksQuotationsRepository) =>
  async (stock: Stock): Promise<StockQuotation> => {
    const stockQuotation = await stocksQuotationsRepository.loadStockQuotation(
      stock,
    );
    await stocksQuotationsRepository.saveStockQuotation(stockQuotation);

    return stockQuotation;
  };

export default LoadStockQuotation;
