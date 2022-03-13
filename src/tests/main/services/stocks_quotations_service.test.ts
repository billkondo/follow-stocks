import HttpService from '@services/http_service';
import HttpResponse from 'domain/http_response';
import Stock from 'domain/stock';
import StockQuotation from 'domain/stock_quotation';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';
import MOCK_STOCK_QUOTATION_HTML from 'tests/main/mocks/mock_stock_quotation_html';

describe('Stocks quotations service', () => {
  useSqlite();
  const { stocksQuotationsServiceFactory } = useStocks();
  const xplgStock: Stock = {
    name: 'XPLG Stock',
    ticker: 'XPLG11',
    type: 'FII',
  };

  const setup = () => {
    const stocksQuotationsService = stocksQuotationsServiceFactory();

    return { stocksQuotationsService };
  };

  beforeEach(() => {
    (Date.now as jest.Mock).mockReturnValue(new Date(2022, 1, 12).getTime());
  });

  test('should fetch stock quotation', async () => {
    const { stocksQuotationsService } = setup();
    (HttpService.get as jest.Mock).mockReturnValue({
      html: MOCK_STOCK_QUOTATION_HTML,
      status: 200,
    } as HttpResponse);

    const stockQuotation = await stocksQuotationsService.loadStockQuotation(
      xplgStock,
    );

    expect(stockQuotation).toEqual({
      quotation: {
        code: 'BRL',
        value: 256.43,
      },
      stock: xplgStock,
      updatedAt: new Date(2022, 1, 12),
    } as StockQuotation);

    expect(HttpService.get).toBeCalledWith(
      'https://finance.yahoo.com/quote/XPLG11.SA',
    );
  });
});
