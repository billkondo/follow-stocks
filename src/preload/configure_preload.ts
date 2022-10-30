import StockType from '@entities/stocks/stock_type';
import { contextBridge, ipcRenderer } from 'electron';

const configurePreload = () => {
  contextBridge.exposeInMainWorld('stocks', {
    load: (type: StockType) => ipcRenderer.invoke('stocks:load', type),
    listInvested: (type: StockType) =>
      ipcRenderer.invoke('stocks:listInvested', type),
  });
};

export default configurePreload;
