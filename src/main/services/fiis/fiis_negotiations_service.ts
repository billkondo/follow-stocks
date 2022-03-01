import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';
import StocksNegotiationsStorage from 'main/repositories/stocks_negotiations_storage';

class FIIsNegotiationsService implements StocksNegotiationsRepository {
  fiisNegotiationsStorage: StocksNegotiationsStorage;

  constructor(fiisNegotiationsStorage: StocksNegotiationsStorage) {
    this.fiisNegotiationsStorage = fiisNegotiationsStorage;
  }

  async saveStockNegotiations(
    stock: Stock,
    stockNegotiations: StockNegotiation[],
  ) {
    await this.fiisNegotiationsStorage.saveStockNegotiations(
      stock,
      stockNegotiations,
    );
  }

  async findNegotiationsFromStock(stock: Stock): Promise<StockNegotiation[]> {
    return this.fiisNegotiationsStorage.findStockNegotiationsByStock(stock);
  }

  async findStockNegotiationsByDate(stock: Stock, date: Date) {
    return this.fiisNegotiationsStorage.findStockNegotiationsByDate(
      stock,
      date,
    );
  }

  async findStocksThatHaveAnyNegotiation(): Promise<Stock[]> {
    return this.fiisNegotiationsStorage.findStocksThatHaveAnyNegotiation();
  }
}

export default FIIsNegotiationsService;
