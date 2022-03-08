import StockInvested from 'domain/stock_invested';

interface StocksInvestedRepository {
  saveStockInvested: (stockInvested: StockInvested) => Promise<void>;

  findStockInvestedByStockTicker: (ticker: string) => Promise<StockInvested>;
}

export default StocksInvestedRepository;
