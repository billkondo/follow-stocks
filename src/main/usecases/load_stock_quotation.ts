import Stock from '@entities/stocks/stock';
import StockQuotation from '@entities/stock_quotation';
import StocksQuotationsRepository from '@repositories/stocks_quotations_repository';
import { STOCKS_RATE_LIMIT_MS } from 'config/rate_limit';

const LoadStockQuotation =
  (stocksQuotationsRepository: StocksQuotationsRepository) =>
  async (stock: Stock): Promise<StockQuotation> => {
    const previousQuotation = await lastQuotationWithExpiredRateLimit(
      stocksQuotationsRepository,
    )(stock);

    if (previousQuotation) return previousQuotation;

    const stockQuotation = await stocksQuotationsRepository.loadStockQuotation(
      stock,
    );
    await stocksQuotationsRepository.saveStockQuotation(stockQuotation);

    return stockQuotation;
  };

const lastQuotationWithExpiredRateLimit =
  (stocksQuotationsRepository: StocksQuotationsRepository) =>
  async (stock: Stock): Promise<StockQuotation> => {
    const isLastUpdateInRateLimit = (date: Date) => {
      const currentDate = new Date(Date.now());
      const timePassed = currentDate.getTime() - date.getTime();

      return timePassed < STOCKS_RATE_LIMIT_MS;
    };
    const stockQuotation = await stocksQuotationsRepository.findStockQuotation(
      stock,
    );

    if (!stockQuotation || !isLastUpdateInRateLimit(stockQuotation.updatedAt))
      return null;

    return stockQuotation;
  };

export default LoadStockQuotation;
