import CurrencyCode from '@entities/currencies/CurrencyCode';
import EventType from '@entities/events/EventType';
import StockType from '@entities/stocks/StockType';

interface SqliteEventModel {
  date: string;
  quantity: number;
  stock_ticker: string;
  stock_name: string;
  stock_type: StockType;
  stock_currency_code: CurrencyCode;
  type: EventType;
  total_value: number;
  unit_price: number;
}

export default SqliteEventModel;
