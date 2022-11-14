import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';
import StocksRepository from '@repositories/stocks_repository';
import StocksStorage from 'main/storage/stocks_storage';
import StocksFetcher from './stocks_fetcher';

class StocksService implements StocksRepository {
  stocksStorage: StocksStorage;

  constructor(stocksStorage: StocksStorage) {
    this.stocksStorage = stocksStorage;
  }

  exists(stock: Stock): Promise<boolean> {
    return this.stocksStorage.exists(stock);
  }

  async save(stock: Stock) {
    this.stocksStorage.save(stock);
  }

  async saveMany(stocks: Stock[]) {
    this.stocksStorage.saveMany(stocks);
  }

  search(tickerText: string, type: StockType): Promise<Stock[]> {
    return this.stocksStorage.searchByTickerAndType(tickerText, type);
  }

  load(type: StockType): Promise<Stock[]> {
    const stocksFetcher = StocksFetcher[type];

    if (!stocksFetcher)
      throw Error(`${type} does not have stocks fetcher implemented`);

    return stocksFetcher();
  }

  count(type: StockType): Promise<number> {
    return this.stocksStorage.countByType(type);
  }

  findAll(type: StockType): Promise<Stock[]> {
    return this.stocksStorage.findAllByType(type);
  }
}

export default StocksService;
