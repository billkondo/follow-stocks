import HttpService from '@services/http_service';
import HttpResponse from 'domain/http_response';
import Stock from 'domain/stock';
import StockQuotation from 'domain/stock_quotation';
import LoadStockQuotation from 'main/usecases/load_stock_quotation';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';
import MOCK_STOCK_QUOTATION_HTML from 'tests/main/mocks/mock_stock_quotation_html';

describe('Load FII quotation', () => {
  useSqlite();
  const hgreStock: Stock = {
    name: 'HGRE Stock',
    ticker: 'HGRE11',
    type: 'FII',
  };
  const { stocksQuotationsServiceFactory, stocksServiceFactory } = useStocks();

  const setup = () => {
    const stocksQuotationsService = stocksQuotationsServiceFactory();
    const loadStockQuotation = LoadStockQuotation(stocksQuotationsService);

    return { loadStockQuotation, stocksQuotationsService };
  };

  beforeEach(async () => {
    const stocksService = stocksServiceFactory();

    await stocksService.save([hgreStock]);
  });

  test('should load FII quotation', async () => {
    (HttpService.get as jest.Mock).mockResolvedValue({
      html: MOCK_STOCK_QUOTATION_HTML,
      status: 200,
    } as HttpResponse);
    const { loadStockQuotation, stocksQuotationsService } = setup();
    const stockQuotation: StockQuotation = {
      quotation: {
        code: 'BRL',
        value: 256.43,
      },
      stock: hgreStock,
    };

    await expect(loadStockQuotation(hgreStock)).resolves.toEqual(
      stockQuotation,
    );

    const shouldHaveSavedStockQuotation = () =>
      expect(
        stocksQuotationsService.findStockQuotation(hgreStock),
      ).resolves.toEqual(stockQuotation);

    await shouldHaveSavedStockQuotation();
  });

  test('should fail if currency found does not match any price code', async () => {
    (HttpService.get as jest.Mock).mockResolvedValue({
      html: `
        <div class="C($tertiaryColor) Fz(12px)">
          <span>São Paulo - São Paulo Delayed Price. Currency in XYZ</span>
        </div>
      `,
    } as HttpResponse);
    const { loadStockQuotation } = setup();

    await expect(loadStockQuotation(hgreStock)).rejects.toEqual(
      new Error('XYZ is a invalid price code'),
    );
  });

  test('should fail if currency search finds nothing', async () => {
    (HttpService.get as jest.Mock).mockResolvedValue({
      html: `
        <div>
          <span>São Paulo - São Paulo Delayed Price. Currency in BRL</span>
        </div>
      `,
    } as HttpResponse);
    const { loadStockQuotation } = setup();

    await expect(loadStockQuotation(hgreStock)).rejects.toEqual(
      new Error('currency search found nothing'),
    );
  });

  test('should fail if price search finds nothing', async () => {
    (HttpService.get as jest.Mock).mockResolvedValue({
      html: `
        <div class="C($tertiaryColor) Fz(12px)">
          <span>São Paulo - São Paulo Delayed Price. Currency in BRL</span>
        </div>
        <fin-streamer data-field="MARKET_PRICE">
          256.43
        </fin-streamer>
      `,
    } as HttpResponse);
    const { loadStockQuotation } = setup();

    await expect(loadStockQuotation(hgreStock)).rejects.toEqual(
      new Error('price search found nothing'),
    );
  });

  test.each(['', 'invalid_value', '1/234', '2.23.234'])(
    'should fail if price search finds invalid value',
    async (price: string) => {
      (HttpService.get as jest.Mock).mockResolvedValue({
        html: `
        <div class="C($tertiaryColor) Fz(12px)">
          <span>São Paulo - São Paulo Delayed Price. Currency in BRL</span>
        </div>
        <fin-streamer data-field="regularMarketPrice">
          ${price}
        </fin-streamer>
      `,
      } as HttpResponse);
      const { loadStockQuotation } = setup();

      await expect(loadStockQuotation(hgreStock)).rejects.toEqual(
        new Error('price search found invalid value'),
      );
    },
  );
});
