import PriceCode from 'domain/price_code';
import StockType from 'domain/stock_type';

interface SqliteStockQuotationModel {
  stock_name: string;
  stock_ticker: string;
  stock_type: StockType;
  quotation_value: number;
  quotation_code: PriceCode;
  updated_at: string;
}

export default SqliteStockQuotationModel;
