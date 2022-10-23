import MessageType from '@entities/message_type';
import StockType from '@entities/stock/stock_type';
import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';

export interface IStocks {
  load: (type: StockType) => Promise<{ message: MessageType }>;
  listInvested: (type: StockType) => Promise<StockInvestedWithQuotation[]>;
}

declare global {
  interface Window {
    stocks: IStocks;
  }
}
