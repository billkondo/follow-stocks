import Stock from 'domain/entities/stock/stock';
import StockQuotation from 'domain/entities/stock_quotation';
import StocksQuotationsRepository from 'main/repositories/stocks_quotations_repository';
import StocksQuotationsStorage from 'main/storage/stocks_quotations_storage';
import StocksQuotationsFetcher from './fetcher/stocks_quotations_fetcher';

class StocksQuotationsService implements StocksQuotationsRepository {
  stocksQuotationsStorage: StocksQuotationsStorage;

  constructor(stocksQuotationsStorage: StocksQuotationsStorage) {
    this.stocksQuotationsStorage = stocksQuotationsStorage;
  }

  async loadStockQuotation(stock: Stock): Promise<StockQuotation> {
    return StocksQuotationsFetcher.fetch(stock);
  }

  async saveStockQuotation(stockQuotation: StockQuotation): Promise<void> {
    await this.stocksQuotationsStorage.save(stockQuotation);
  }

  async findStockQuotation(stock: Stock): Promise<StockQuotation> {
    return this.stocksQuotationsStorage.find(stock);
  }
}

export default StocksQuotationsService;
