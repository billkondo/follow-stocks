import Event from '@entities/events/Event';
import EventJSON from '@entities/events/EventJSON';
import FilterResults from '@entities/filters/FilterResults';
import SqliteConnection from '@services/sqlite/sqlite_connection';
import electron, { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { mock, mockClear } from 'jest-mock-extended';
import serviceRepositoriesFactory from 'main/factories/service_repositories_factory';
import sqliteStorageFactory from 'main/factories/sqlite_storage_factory';
import EventsHandler from 'main/handlers/EventsHandler';
import JSONFile from 'main/storage/JSONFile';
import buildTestFilePath from 'tests/buildTestFilePath';
import useSqlite from 'tests/hooks/use_sqlite';
import validEvents, {
  stocksValidEvents,
  validEventsJSON,
} from 'tests/mocks/b3_spreadsheets/validEvents';

jest.mock('electron', () => {
  return {
    app: {
      getPath: jest.fn(),
    },
    dialog: {
      showOpenDialog: jest.fn(),
    },
  };
});

describe('EventsHandler', () => {
  useSqlite();

  const browserWindow = mock<BrowserWindow>();
  const ipcMainInvokeEvent = mock<IpcMainInvokeEvent>();

  const TEMP_PATH = buildTestFilePath('');
  const VALID_EVENTS_SPREADSHEET_PATH = buildTestFilePath(
    'mocks/b3_spreadsheets/validEvents.xlsx',
  );

  const b3EventsFile = new JSONFile(buildTestFilePath('b3-events.json'));

  beforeEach(() => {
    mockClear(browserWindow);
    mockClear(ipcMainInvokeEvent);
    mockClear(electron.dialog.showOpenDialog);

    (electron.app.getPath as jest.Mock).mockImplementation(() => TEMP_PATH);

    (electron.dialog.showOpenDialog as jest.Mock).mockResolvedValue({
      canceled: false,
      filePaths: [VALID_EVENTS_SPREADSHEET_PATH],
    });

    b3EventsFile.remove();
  });

  const setup = () => {
    const sqliteConnection = SqliteConnection.connect();
    const storage = sqliteStorageFactory(sqliteConnection);
    const repositories = serviceRepositoriesFactory(storage);
    const eventsHandler = EventsHandler(browserWindow, repositories);

    return { eventsHandler, storage };
  };

  it('should cache spreadsheet events', async () => {
    const { eventsHandler } = setup();

    expect(b3EventsFile.read()).toBeFalsy();

    await eventsHandler.uploadB3SpreadSheet(ipcMainInvokeEvent);

    const eventsJSON: EventJSON[] = b3EventsFile.read();
    const events: Event[] = eventsJSON.map((eventJSON) => new Event(eventJSON));

    expect(events).toEqual(validEvents);
  });

  it('should save cached B3 events', async () => {
    const { eventsHandler, storage } = setup();

    expect(b3EventsFile.read()).toBeFalsy();
    expect(await storage.events.findAll()).toEqual([]);
    expect(await storage.stocks.findAll()).toEqual([]);

    await eventsHandler.uploadB3SpreadSheet(ipcMainInvokeEvent);
    await eventsHandler.saveB3Events(ipcMainInvokeEvent);

    expect(b3EventsFile.read()).toBeFalsy();
    expect(await storage.events.findAll()).toEqual(validEvents);
    expect(await storage.stocks.findAll()).toEqual(stocksValidEvents);
  });

  it('should list B3 events', async () => {
    const { eventsHandler, storage } = setup();

    expect(await storage.events.findAll()).toEqual([]);
    expect(await storage.stocks.findAll()).toEqual([]);

    await storage.stocks.saveMany(stocksValidEvents);
    await storage.events.saveMany(validEvents);

    expect(
      await eventsHandler.getB3Events(ipcMainInvokeEvent, {
        page: 0,
        pageSize: 100,
      }),
    ).toEqual({
      results: validEventsJSON,
      totalResults: 9,
    } as FilterResults<EventJSON>);
  });
});
