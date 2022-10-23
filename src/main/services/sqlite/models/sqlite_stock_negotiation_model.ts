import PriceCode from 'domain/entities/price/price_code';
import StockType from 'domain/entities/stock/stock_type';
import StockNegotiationType from 'domain/entities/stock_negotiation/stock_negotiation_type';

interface SqliteStockNegotiationModel {
  date: string;
  quantity: number;
  price_value: number;
  price_code: PriceCode;
  stock_ticker: string;
  stock_name: string;
  stock_type: StockType;
  type: StockNegotiationType;
}

export default SqliteStockNegotiationModel;
