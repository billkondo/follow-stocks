import Stock from 'domain/stock';
import StockType from 'domain/stock_type';
import StocksRepository from 'main/repositories/stocks_repository';
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

  async save(stocks: Stock[]) {
    this.stocksStorage.save(stocks);
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
