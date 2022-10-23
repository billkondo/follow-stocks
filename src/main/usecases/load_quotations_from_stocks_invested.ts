import StocksInvestedRepository from '@repositories/stocks_invested_repository';
import StocksQuotationsRepository from '@repositories/stocks_quotations_repository';
import LoadStockQuotation from './load_stock_quotation';

const LoadQuotationsFromStocksInvested =
  ({
    stocksInvestedRepository,
    stocksQuotationsRepository,
  }: {
    stocksInvestedRepository: StocksInvestedRepository;
    stocksQuotationsRepository: StocksQuotationsRepository;
  }) =>
  async () => {
    const loadStockQuotation = LoadStockQuotation(stocksQuotationsRepository);
    const stocks = await stocksInvestedRepository.findStocksInvested();

    await Promise.all(stocks.map((stock) => loadStockQuotation(stock)));
  };

export default LoadQuotationsFromStocksInvested;
