import Event from '@entities/event/event';
import Stock from '@entities/stocks/stock';
import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';

import MessageType from '@entities/message_type';
import StockType from '@entities/stocks/stock_type';

export interface IStocks {
  load: (type: StockType) => Promise<{ message: MessageType }>;
  listInvested: (type: StockType) => Promise<StockInvestedWithQuotation[]>;
  searchStocksByTicker: (type: StockType, ticker: string) => Promise<Stock[]>;
  listStockNegotiationsAtDate: (stock: Stock, date: Date) => Promise<Event[]>;
}

declare global {
  interface Window {
    stocks: IStocks;
  }
}
