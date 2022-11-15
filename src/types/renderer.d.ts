import Stock from '@entities/stocks/stock';
import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';

import Event from '@entities/events/Event';
import EventJSON from '@entities/events/EventJSON';
import FilterOptions from '@entities/filters/FilterOptions';
import FilterResults from '@entities/filters/FilterResults';
import MessageType from '@entities/message_type';
import StockType from '@entities/stocks/stock_type';

export interface IEvents {
  getB3Events: (
    filterOptions: FilterOptions,
  ) => Promise<FilterResults<EventJSON>>;
  saveB3Events: () => Promise<void>;
  uploadB3SpreadSheet: () => Promise<EventJSON[]>;
}

export interface IStocks {
  load: (type: StockType) => Promise<{ message: MessageType }>;
  listInvested: (type: StockType) => Promise<StockInvestedWithQuotation[]>;
  searchStocksByTicker: (type: StockType, ticker: string) => Promise<Stock[]>;
  listStockNegotiationsAtDate: (stock: Stock, date: Date) => Promise<Event[]>;
}

declare global {
  interface Window {
    events: IEvents;
    stocks: IStocks;
  }
}
