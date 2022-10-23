import SqliteConnection from '@sqlite/sqlite_connection';
import SqliteStocksInvestedStorage from '@sqlite/storages/sqlite_stocks_invested_storage';
import SqliteStocksStorage from '@sqlite/storages/sqlite_stocks_storage';
import Stock from 'domain/entities/stock/stock';
import useSqlite from 'tests/hooks/use_sqlite';

describe('Sqlite stocks invested storage', () => {
  useSqlite();

  const setup = () => {
    const sqliteConnection = SqliteConnection.connect();
    const sqliteStocksStorage = new SqliteStocksStorage(sqliteConnection);
    const sqliteStocksInvestedStorage = new SqliteStocksInvestedStorage(
      sqliteConnection,
    );

    return {
      sqliteStocksStorage,
      sqliteStocksInvestedStorage,
    };
  };

  test('should not add two stocks invested for the same stock', async () => {
    const { sqliteStocksStorage, sqliteStocksInvestedStorage } = setup();
    const stock: Stock = {
      name: 'Stock',
      ticker: 'STOCK11',
      type: 'FII',
    };

    await sqliteStocksStorage.save([stock]);

    await sqliteStocksInvestedStorage.saveStockInvested({
      averagePrice: {
        code: 'USD',
        value: 125,
      },
      quantity: 25,
      stock,
      totalInvested: {
        code: 'USD',
        value: 5000,
      },
    });

    await sqliteStocksInvestedStorage.saveStockInvested({
      averagePrice: {
        code: 'USD',
        value: 200,
      },
      quantity: 40,
      stock,
      totalInvested: {
        code: 'USD',
        value: 7000,
      },
    });

    await expect(
      sqliteStocksInvestedStorage.findAllStocksInvested(),
    ).resolves.toEqual([
      {
        averagePrice: {
          code: 'USD',
          value: 200,
        },
        quantity: 40,
        stock,
        totalInvested: {
          code: 'USD',
          value: 7000,
        },
      },
    ]);
  });
});
