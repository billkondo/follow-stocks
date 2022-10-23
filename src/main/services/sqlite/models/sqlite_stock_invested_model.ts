import PriceCode from 'domain/entities/price/price_code';
import StockType from 'domain/entities/stock/stock_type';

interface SqliteStockInvestedModel {
  quantity: number;
  total_invested: number;
  average_price: number;
  price_code: PriceCode;
  stock_ticker: string;
  stock_name: string;
  stock_type: StockType;
}

export default SqliteStockInvestedModel;
