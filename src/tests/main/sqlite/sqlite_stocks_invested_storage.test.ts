import Stock from '@entities/stocks/Stock';
import SqliteStocksStorage from '@services/sqlite/storages/SqliteStocksStorage';
import SqliteConnection from '@sqlite/sqlite_connection';
import SqliteStocksInvestedStorage from '@sqlite/storages/sqlite_stocks_invested_storage';
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
      currencyCode: 'USD',
    };

    await sqliteStocksStorage.save(stock);

    await sqliteStocksInvestedStorage.saveStockInvested({
      averagePrice: 125,
      quantity: 25,
      stock,
      totalInvested: 5000,
    });

    await sqliteStocksInvestedStorage.saveStockInvested({
      averagePrice: 200,
      quantity: 40,
      stock,
      totalInvested: 7000,
    });

    await expect(
      sqliteStocksInvestedStorage.findAllStocksInvested(),
    ).resolves.toEqual([
      {
        averagePrice: 200,
        quantity: 40,
        stock,
        totalInvested: 7000,
      },
    ]);
  });
});
