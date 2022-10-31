import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';
import { contextBridge, ipcRenderer } from 'electron';

const configurePreload = () => {
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
