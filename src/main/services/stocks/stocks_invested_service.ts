import StockInvested from 'domain/stock_invested';
import StocksInvestedRepository from 'main/repositories/stocks_invested_repository';
import StocksInvestedStorage from 'main/storage/stocks_invested_storage';

class StocksInvestedService implements StocksInvestedRepository {
  stocksInvestedStorage: StocksInvestedStorage;

  constructor(stocksInvestedStorage: StocksInvestedStorage) {
    this.stocksInvestedStorage = stocksInvestedStorage;
  }

  async saveStockInvested(stockInvested: StockInvested) {
    await this.stocksInvestedStorage.saveStockInvested(stockInvested);
  }

  async findStockInvestedByStockTicker(ticker: string): Promise<StockInvested> {
    return this.stocksInvestedStorage.findStockInvestedByStockTicker(ticker);
  }
}

export default StocksInvestedService;
