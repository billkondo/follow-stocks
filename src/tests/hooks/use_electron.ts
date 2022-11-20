import electron, { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { mock } from 'jest-mock-extended';
import afterStartup from 'main/afterStartup';
import startup from 'main/startup';
import configurePreload from 'preload/configure_preload';
import useMockHttpService from './use_mock_http_service';

jest.mock('electron', () => {
  return {
    contextBridge: {
      exposeInMainWorld: jest.fn(),
    },
    ipcRenderer: {
      invoke: jest.fn(),
    },
    ipcMain: {
      handle: jest.fn(),
    },
  };
});

const useElectron = () => {
  useMockHttpService();

  beforeAll(() => {
    const handlers: { [key: string]: (...args: any[]) => any } = {};

    (electron.contextBridge.exposeInMainWorld as jest.Mock).mockImplementation(
      (apiKey: keyof Window, api: any) => {
        window[apiKey] = api as never;
      },
    );

    (electron.ipcRenderer.invoke as jest.Mock).mockImplementation(
      (channel: string, ...args: any[]) => {
        const event = mock<IpcMainInvokeEvent>();
        return handlers[channel](event, ...args);
      },
    );

    (electron.ipcMain.handle as jest.Mock).mockImplementation(
      (channel: string, callback: any) => {
        handlers[channel] = callback;
      },
    );

    configurePreload();

    const repositories = startup();
    const browserWindow = mock<BrowserWindow>();

    afterStartup(browserWindow, repositories);
  });
};

export default useElectron;
