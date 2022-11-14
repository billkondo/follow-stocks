import EventType from '@entities/event/event_type';
import PriceCode from '@entities/price/price_code';
import StockType from '@entities/stocks/stock_type';

interface SqliteEventModel {
  date: string;
  quantity: number;
  price_value?: number;
  price_code?: PriceCode;
  stock_ticker: string;
  stock_name: string;
  stock_type: StockType;
  type: EventType;
}

export default SqliteEventModel;
