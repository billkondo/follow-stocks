import CurrencyCode from '@entities/currencies/CurrencyCode';
import StockType from '@entities/stocks/StockType';

interface SqliteStockModel {
  name: string;
  ticker: string;
  type: StockType;
  currency_code: CurrencyCode;
}

export default SqliteStockModel;
