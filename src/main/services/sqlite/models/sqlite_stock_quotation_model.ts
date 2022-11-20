import CurrencyCode from '@entities/currencies/CurrencyCode';
import StockType from '@entities/stocks/StockType';

interface SqliteStockQuotationModel {
  stock_name: string;
  stock_ticker: string;
  stock_type: StockType;
  stock_currency_code: CurrencyCode;
  quotation: number;
  updated_at: string;
}

export default SqliteStockQuotationModel;
