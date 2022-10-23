import Stock from 'domain/entities/stock/stock';
import StockType from 'domain/entities/stock/stock_type';
import StockNegotiation from 'domain/entities/stock_negotiation/stock_negotiation';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';
import StocksNegotiationsStorage from 'main/storage/stocks_negotiations_storage';

class StocksNegotiationsService implements StocksNegotiationsRepository {
  stocksNegotiationsStorage: StocksNegotiationsStorage;

  constructor(stocksNegotiationsStorage: StocksNegotiationsStorage) {
    this.stocksNegotiationsStorage = stocksNegotiationsStorage;
  }

  async saveStockNegotiations(
    stock: Stock,
    stockNegotiations: StockNegotiation[],
  ) {
    this.stocksNegotiationsStorage.saveStockNegotiations(
      stock,
      stockNegotiations,
    );
  }

  findNegotiationsFromStock(stock: Stock): Promise<StockNegotiation[]> {
    return this.stocksNegotiationsStorage.findStockNegotiationsByStock(stock);
  }

  findStockNegotiationsByDate(
    stock: Stock,
    date: Date,
  ): Promise<StockNegotiation[]> {
    return this.stocksNegotiationsStorage.findStockNegotiationsByDate(
      stock,
      date,
    );
  }

  findStocksThatHaveAnyNegotiation(type: StockType): Promise<Stock[]> {
    return this.stocksNegotiationsStorage.findStocksThatHaveAnyNegotiation(
      type,
    );
  }
}

export default StocksNegotiationsService;
