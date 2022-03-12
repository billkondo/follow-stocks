import SqliteConnection from '@sqlite/sqlite_connection';
import SqliteStocksQuotationsStorage from '@sqlite/storages/sqlite_stocks_quotations_storage';
import Stock from 'domain/stock';
import StockQuotation from 'domain/stock_quotation';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Sqlite stocks quotations storage', () => {
  useSqlite();
  const { stocksServiceFactory } = useStocks();
  const xplgStock: Stock = {
    name: 'XPLG Stock',
    ticker: 'XPLG11',
    type: 'FII',
  };

  beforeEach(async () => {
    const stocksService = stocksServiceFactory();

    await stocksService.save([xplgStock]);
  });

  const setup = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksQuotationStorage = new SqliteStocksQuotationsStorage(
      sqliteConnection,
    );

    return { stocksQuotationStorage };
  };

  test('should save stock quotation', async () => {
    const { stocksQuotationStorage } = setup();
    const stockQuotation: StockQuotation = {
      quotation: {
        code: 'BRL',
        value: 125,
      },
      stock: xplgStock,
    };

    await stocksQuotationStorage.save(stockQuotation);
    await expect(stocksQuotationStorage.findAll()).resolves.toEqual([
      stockQuotation,
    ]);
  });

  test('should replace stock quotation', async () => {
    const { stocksQuotationStorage } = setup();
    const stockQuotation: StockQuotation = {
      quotation: {
        code: 'BRL',
        value: 250,
      },
      stock: xplgStock,
    };

    await stocksQuotationStorage.save({
      quotation: {
        code: 'BRL',
        value: 125,
      },
      stock: xplgStock,
    });
    await stocksQuotationStorage.save(stockQuotation);

    await expect(stocksQuotationStorage.findAll()).resolves.toEqual([
      stockQuotation,
    ]);
  });
});
