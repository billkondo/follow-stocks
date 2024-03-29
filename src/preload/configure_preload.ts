import FilterOptions from '@entities/filters/FilterOptions';
import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';
import { contextBridge, ipcRenderer } from 'electron';

const configurePreload = () => {
  contextBridge.exposeInMainWorld('events', {
    getB3Events: (filterOptions: FilterOptions) =>
      ipcRenderer.invoke('events:getB3Events', filterOptions),
    saveB3Events: () => ipcRenderer.invoke('events:saveB3Events'),
    uploadB3SpreadSheet: () => ipcRenderer.invoke('events:uploadB3SpreadSheet'),
  });

  contextBridge.exposeInMainWorld('stocks', {
    load: (type: StockType) => ipcRenderer.invoke('stocks:load', type),
    listInvested: (type: StockType) =>
      ipcRenderer.invoke('stocks:listInvested', type),
    searchStocksByTicker: (type: StockType, ticker: string) =>
      ipcRenderer.invoke('stocks:searchStocksByTicker', type, ticker),
    listStockNegotiationsAtDate: (stock: Stock, date: Date) =>
      ipcRenderer.invoke('stocks:listStockNegotiationsAtDate', stock, date),
  });
};

export default configurePreload;
