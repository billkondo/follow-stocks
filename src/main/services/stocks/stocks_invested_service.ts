import Stock from 'domain/entities/stock/stock';
import StockInvested from 'domain/entities/stock_invested/stock_invested';
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

  async findStocksInvested(): Promise<Stock[]> {
    const stocksInvested =
      await this.stocksInvestedStorage.findAllStocksInvested();

    return stocksInvested.map((stockInvested) => stockInvested.stock);
  }
}

export default StocksInvestedService;
