import CurrencyCode from '@entities/currencies/CurrencyCode';
import StockType from '@entities/stocks/StockType';

interface SqliteStockInvestedModel {
  quantity: number;
  total_invested: number;
  average_price: number;
  stock_ticker: string;
  stock_name: string;
  stock_type: StockType;
  stock_currency_code: CurrencyCode;
}

export default SqliteStockInvestedModel;
