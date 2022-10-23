import MessageType from 'domain/entities/message_type';
import StockType from 'domain/entities/stock/stock_type';
import StockInvestedWithQuotation from 'domain/entities/stock_invested/stock_invested_with_quotation';

export interface IStocks {
  load: (type: StockType) => Promise<{ message: MessageType }>;
  listInvested: (type: StockType) => Promise<StockInvestedWithQuotation[]>;
}

declare global {
  interface Window {
    stocks: IStocks;
  }
}
