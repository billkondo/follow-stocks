import MessageType from 'domain/message_type';
import StockInvestedWithQuotation from 'domain/stock_invested_with_quotation';
import StockType from 'domain/stock_type';

export interface IStocks {
  load: (type: StockType) => Promise<{ message: MessageType }>;
  listInvested: (type: StockType) => Promise<StockInvestedWithQuotation[]>;
}

declare global {
  interface Window {
    stocks: IStocks;
  }
}
