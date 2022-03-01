import PriceCode from 'domain/price_code';
import StockNegotiationType from 'domain/stock_negotiation_type';
import StockType from 'domain/stock_type';

interface StockNegotiationSqliteModel {
  date: string;
  quantity: number;
  price_value: number;
  price_code: PriceCode;
  stock_ticker: string;
  stock_name: string;
  stock_type: StockType;
  type: StockNegotiationType;
}

export default StockNegotiationSqliteModel;
