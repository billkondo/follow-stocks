import CurrencyCode from '@entities/currencies/CurrencyCode';
import StockType from './StockType';

interface Stock {
  currencyCode: CurrencyCode;
  ticker: string;
  name: string;
  type: StockType;
}

export default Stock;
