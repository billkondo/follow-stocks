import Stock from 'domain/stock';

interface StocksStorage {
  searchByTicker: (tickerText: string) => Promise<Stock[]>;
}

export default StocksStorage;
