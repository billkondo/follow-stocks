import HttpService from 'main/services/http_service';
import LoadStocksFirstTime from 'main/usecases/load_stocks_first_time';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

jest.mock('main/services/http_service');

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
    const fiisService = stocksServiceFactory();
    const loadFIIsFirstTime = LoadStocksFirstTime(fiisService);

    return { fiisService, loadFIIsFirstTime };
  };

  test('should load FIIs when there is not FII stored', async () => {
    (HttpService.get as jest.Mock).mockReturnValue({ html: MOCK_HTML });

    const { fiisService, loadFIIsFirstTime } = setup();

    expect(await loadFIIsFirstTime()).toBeTruthy();
    expect(await fiisService.findAll()).toEqual([
      { name: 'XP Log', ticker: 'XPLG11', type: 'FII' },
    ]);
  });

  test('should not load FIIs when there is FII stored', async () => {
    const { fiisService, loadFIIsFirstTime } = setup();

    await fiisService.save([
      { name: 'FII name', ticker: 'FII11', type: 'FII' },
    ]);
    expect(await loadFIIsFirstTime()).toBeFalsy();
  });
});
