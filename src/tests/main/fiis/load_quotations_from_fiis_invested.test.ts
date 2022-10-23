import HttpService from '@services/http_service';
import HttpResponse from 'domain/entities/http_response';
import Stock from 'domain/entities/stock/stock';
import StockQuotation from 'domain/entities/stock_quotation';
import LoadQuotationsFromStocksInvested from 'main/usecases/load_quotations_from_stocks_invested';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';
import MOCK_STOCK_QUOTATION_HTML from 'tests/main/mocks/mock_stock_quotation_html';

describe('Load quotations from FIIs invested', () => {
  useSqlite();
  const {
    stocksServiceFactory,
    stocksInvestedServiceFactory,
    stocksQuotationsServiceFactory,
  } = useStocks();

  const setup = () => {
    const stocksService = stocksServiceFactory();
    const stocksInvestedService = stocksInvestedServiceFactory();
    const stocksQuotationsService = stocksQuotationsServiceFactory();
    const loadQuotationsFromStocksInvested = LoadQuotationsFromStocksInvested({
      stocksInvestedRepository: stocksInvestedService,
      stocksQuotationsRepository: stocksQuotationsService,
    });

    return {
      loadQuotationsFromStocksInvested,
      stocksService,
      stocksInvestedService,
      stocksQuotationsService,
    };
  };

  test('should load quotations from FIIs invested', async () => {
    (HttpService.get as jest.Mock).mockResolvedValue({
      html: MOCK_STOCK_QUOTATION_HTML,
      status: 200,
    } as HttpResponse);
    (Date.now as jest.Mock).mockReturnValue(new Date(2022, 12, 1).getTime());

    const {
      loadQuotationsFromStocksInvested,
      stocksService,
      stocksInvestedService,
      stocksQuotationsService,
    } = setup();
    const stocks: Stock[] = [
      {
        name: 'A Stock',
        ticker: 'A11',
        type: 'FII',
      },
      {
        name: 'B Stock',
        ticker: 'B11',
        type: 'FII',
      },
    ];

    await stocksService.save(stocks);
    await Promise.all(
      stocks.map((stock) =>
        stocksInvestedService.saveStockInvested({
          averagePrice: {
            code: 'BRL',
            value: 123,
          },
          quantity: 25,
          stock,
          totalInvested: {
            code: 'BRL',
            value: 1230,
          },
        }),
      ),
    );
    await loadQuotationsFromStocksInvested();

    await Promise.all(
      stocks.map((stock) => {
        expect(
          stocksQuotationsService.findStockQuotation(stock),
        ).resolves.toEqual({
          stock,
          quotation: {
            code: 'BRL',
            value: 256.43,
          },
          updatedAt: new Date(2022, 12, 1),
        } as StockQuotation);
      }),
    );
  });
});
