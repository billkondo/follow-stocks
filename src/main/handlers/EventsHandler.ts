import Event from '@entities/events/Event';
import EventJSON from '@entities/events/EventJSON';
import Repositories from '@repositories/repositories';
import SaveEvent from '@usecases/events/SaveEvent';
import { app, BrowserWindow, dialog, IpcMainInvokeEvent } from 'electron';
import fs from 'fs';
import B3Parser from 'main/parsers/B3Parser';
import JSONFile from 'main/storage/JSONFile';
import path from 'path';

const EventsHandler = (
  browserWindow: BrowserWindow,
  repositories: Repositories,
) => {
  const { events: eventsRepository, stocks: stocksRepository } = repositories;

  const getB3EventsCache = () => {
    const b3EventsCachePath = path.join(app.getPath('temp'), 'b3-events.json');
    const b3EventsCache = new JSONFile(b3EventsCachePath);

    return b3EventsCache;
  };

  return {
    saveB3Events: async (_event: IpcMainInvokeEvent) => {
      const saveEvent = SaveEvent({
        eventsRepository,
        stocksRepository,
      });
      const b3EventsCache = getB3EventsCache();
      const b3EventsJSON: EventJSON[] = b3EventsCache.read();

      if (!b3EventsJSON) {
        return;
      }

      const b3Events = b3EventsJSON.map(
        (b3EventJSON) => new Event(b3EventJSON),
      );

      for (const event of b3Events) {
        await saveEvent(event);
      }

      b3EventsCache.remove();
    },
    uploadB3SpreadSheet: async (
      _event: IpcMainInvokeEvent,
    ): Promise<EventJSON[]> => {
      const results = await dialog.showOpenDialog(browserWindow, {
        filters: [
          {
            name: 'Spreadsheets',
            extensions: ['xlsx'],
          },
        ],
      });

      const { canceled, filePaths } = results;

      if (canceled || !filePaths.length) {
        return [];
      }

      const b3SpreadsheetPath = filePaths[0];

      const b3File = fs.readFileSync(b3SpreadsheetPath);

      const b3Parser = new B3Parser();
      const b3Events = b3Parser.parseExcelFile(b3File);

      const b3EventsCache = getB3EventsCache();
      b3EventsCache.save(b3Events);

      const b3EventsJSON = b3Events.map((b3Event) => b3Event.toJSON());

      return b3EventsJSON;
    },
  };
};

export default EventsHandler;
