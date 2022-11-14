import HttpService from 'main/services/http_service';
import LoadStocksFirstTime from 'main/usecases/load_stocks_first_time';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Load FIIs for the first time', () => {
  useSqlite();
  const { stocksServiceFactory } = useStocks();
  const MOCK_HTML = `
    <div id="items-wrapper">
      <div class="item">
        <a href="https://fiis.com.br/afof11">
          <span class="ticker">XPLG11</span>
          <span class="name">XP Log</span>
        </a>
      </div>
    </div>
  `;

  const setup = () => {
    const stocksService = stocksServiceFactory();
    const loadStocksFirstTime = LoadStocksFirstTime(stocksService);

    return { stocksService, loadStocksFirstTime };
  };

  test('should load FIIs when there is not FII stored', async () => {
    (HttpService.get as jest.Mock).mockReturnValue({ html: MOCK_HTML });

    const { stocksService, loadStocksFirstTime } = setup();

    expect(await loadStocksFirstTime('FII')).toBeTruthy();
    expect(await stocksService.findAll('FII')).toEqual([
      { name: 'XP Log', ticker: 'XPLG11', type: 'FII' },
    ]);
  });

  test('should not load FIIs when there is FII stored', async () => {
    const { stocksService, loadStocksFirstTime } = setup();

    await stocksService.saveMany([
      { name: 'FII name', ticker: 'FII11', type: 'FII' },
    ]);
    expect(await loadStocksFirstTime('FII')).toBeFalsy();
  });
});
