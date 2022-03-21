import MessageType from 'domain/message_type';
import Stock from 'domain/stock';
import StockInvestedWithQuotation from 'domain/stock_invested_with_quotation';
import StockType from 'domain/stock_type';

export interface IStocks {
  load: (type: StockType) => Promise<{ message: MessageType }>;
  listInvested: (type: StockType) => Promise<StockInvestedWithQuotation[]>;
  searchStocksByTicker: (type: StockType, ticker: string) => Promise<Stock[]>;
}

declare global {
  interface Window {
    stocks: IStocks;
  }
}
