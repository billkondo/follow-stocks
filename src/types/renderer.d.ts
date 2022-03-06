import MessageType from 'domain/message_type';
import StockType from 'domain/stock_type';

export interface IStocks {
  load: (type: StockType) => Promise<{ message: MessageType }>;
}

declare global {
  interface Window {
    stocks: IStocks;
  }
}
