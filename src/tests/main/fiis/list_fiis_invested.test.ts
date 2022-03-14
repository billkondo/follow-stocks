import Stock from 'domain/stock';
import StockInvested from 'domain/stock_invested';
import StockInvestedWithQuotation from 'domain/stock_invested_with_quotation';
import ListStocksInvested from 'main/usecases/list_stocks_invested';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('List FIIs invested', () => {
  useSqlite();
  const {
    stocksServiceFactory,
    stocksInvestedWithQuotationsServiceFactory,
    stocksInvestedServiceFactory,
    stocksQuotationsServiceFactory,
  } = useStocks();

  const setup = () => {
    const stocksService = stocksServiceFactory();
    const stocksInvestedService = stocksInvestedServiceFactory();
    const stocksInvestedWithQuotationsService =
      stocksInvestedWithQuotationsServiceFactory();
    const stocksQuotationsService = stocksQuotationsServiceFactory();
    const listStocksInvested = ListStocksInvested(
      stocksInvestedWithQuotationsService,
    );

    return {
      listStocksInvested,
      stocksService,
      stocksInvestedService,
      stocksQuotationsService,
      stocksInvestedWithQuotationsService,
    };
  };

  test('should list FIIs invested', async () => {
    const {
      listStocksInvested,
      stocksService,
      stocksInvestedService,
      stocksQuotationsService,
    } = setup();
    const stockA: Stock = {
      name: 'A Stock',
      ticker: 'A11',
      type: 'FII',
    };
    const stockB: Stock = {
      name: 'B Stock',
      ticker: 'B11',
      type: 'FII',
    };
    const stockAInvested: StockInvested = {
      averagePrice: {
        code: 'BRL',
        value: 124,
      },
      quantity: 25,
      totalInvested: {
        code: 'BRL',
        value: 1250,
      },
      stock: stockA,
    };
    const stockBInvested: StockInvested = {
      averagePrice: {
        code: 'USD',
        value: 20,
      },
      quantity: 100,
      totalInvested: {
        code: 'USD',
        value: 2000,
      },
      stock: stockB,
    };

    await stocksService.save([stockA, stockB]);
    await stocksInvestedService.saveStockInvested(stockAInvested);
    await stocksInvestedService.saveStockInvested(stockBInvested);
    await stocksQuotationsService.saveStockQuotation({
      quotation: {
        code: 'BRL',
        value: 12,
      },
      stock: stockA,
      updatedAt: new Date(2022, 12, 1),
    });

    await expect(listStocksInvested('FII')).resolves.toEqual([
      {
        ...stockAInvested,
        quotation: {
          code: 'BRL',
          value: 12,
        },
      },
      stockBInvested,
    ] as StockInvestedWithQuotation[]);
  });
});
