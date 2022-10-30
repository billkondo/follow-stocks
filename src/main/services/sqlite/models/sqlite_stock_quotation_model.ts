import PriceCode from '@entities/price/price_code';
import StockType from '@entities/stocks/stock_type';

interface SqliteStockQuotationModel {
  stock_name: string;
  stock_ticker: string;
  stock_type: StockType;
  quotation_value: number;
  quotation_code: PriceCode;
  updated_at: string;
}

export default SqliteStockQuotationModel;
