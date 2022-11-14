import Event from '@entities/event/event';
import Stock from '@entities/stocks/stock';
import SqliteConnection from '@services/sqlite/sqlite_connection';
import SqliteEventsStorage from '@services/sqlite/storages/sqlite_events_storage';
import SqliteStocksStorage from '@services/sqlite/storages/sqlite_stocks_storage';
import useSqlite from 'tests/hooks/use_sqlite';

describe('SqliteEventsStorage', () => {
  useSqlite();

  const xplgStock: Stock = {
    name: 'XPLG11',
    ticker: 'XPLG11',
    type: 'FII',
  };

  const hglgStock: Stock = {
    name: 'HGLG11',
    ticker: 'HGLG11',
    type: 'BDR',
  };

  const event: Event = {
    date: new Date(2022, 5, 15),
    price: {
      code: 'USD',
      value: 250.0,
    },
    quantity: 50,
    stock: xplgStock,
    type: 'BUY',
  };

  const setup = async () => {
    const sqliteConnection = SqliteConnection.connect();
    const sqliteStocksStorage = new SqliteStocksStorage(sqliteConnection);
    const sqliteEventsStorage = new SqliteEventsStorage(sqliteConnection);

    await sqliteStocksStorage.saveMany([xplgStock, hglgStock]);

    return {
      sqliteEventsStorage,
    };
  };

  it('should save event', async () => {
    const { sqliteEventsStorage } = await setup();

    expect(await sqliteEventsStorage.findAll()).toEqual([]);

    await sqliteEventsStorage.save(event);

    expect(await sqliteEventsStorage.findAll()).toEqual([event]);
  });

  it('should save events', async () => {
    const { sqliteEventsStorage } = await setup();

    const otherEvent: Event = {
      date: new Date(2017, 2, 27),
      price: {
        code: 'BRL',
        value: 100.0,
      },
      quantity: 74,
      stock: hglgStock,
      type: 'SELL',
    };

    expect(await sqliteEventsStorage.findAll()).toEqual([]);

    await sqliteEventsStorage.saveMany([event, otherEvent]);

    expect(await sqliteEventsStorage.findAll()).toEqual([event, otherEvent]);
  });
});
