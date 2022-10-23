import HttpService from '@services/http_service';
import { STOCKS_RATE_LIMIT_MS } from 'config/rate_limit';
import HttpResponse from 'domain/entities/http_response';
import Stock from 'domain/entities/stock/stock';
import StockQuotation from 'domain/entities/stock_quotation';
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
    (HttpService.get as jest.Mock).mockClear();
    (Date.now as jest.Mock).mockClear();

    const stocksService = stocksServiceFactory();

    await stocksService.save([hgreStock]);
  });

  test('should load FII quotation', async () => {
    (HttpService.get as jest.Mock).mockResolvedValue({
      html: MOCK_STOCK_QUOTATION_HTML,
      status: 200,
    } as HttpResponse);
    (Date.now as jest.Mock).mockReturnValue(new Date(2022, 12, 2).getTime());
    const { loadStockQuotation, stocksQuotationsService } = setup();
    const stockQuotation: StockQuotation = {
      quotation: {
        code: 'BRL',
        value: 256.43,
      },
      stock: hgreStock,
      updatedAt: new Date(2022, 12, 2),
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

  test('should not load stock quotation if it is in rate limit', async () => {
    const { loadStockQuotation, stocksQuotationsService } = setup();
    const currentDateTime = new Date(2022, 12, 1).getTime();
    const updatedAtTime = currentDateTime - STOCKS_RATE_LIMIT_MS + 50;
    const stockQuotation: StockQuotation = {
      quotation: { code: 'BRL', value: 245 },
      stock: hgreStock,
      updatedAt: new Date(updatedAtTime),
    };

    (Date.now as jest.Mock).mockReturnValue(currentDateTime);

    await stocksQuotationsService.saveStockQuotation(stockQuotation);
    await expect(loadStockQuotation(hgreStock)).resolves.toEqual(
      stockQuotation,
    );
    await expect(
      stocksQuotationsService.findStockQuotation(hgreStock),
    ).resolves.toEqual(stockQuotation);
    expect(HttpService.get).not.toBeCalled();
  });
});
