import FIIsService from 'main/services/fiis_service';
import HttpService from 'main/services/http_service';
import FIIsStorageSqlite from 'main/services/sqlite/fiis_storage_sqlite';
import SqliteConnection from 'main/services/sqlite/sqlite_connection';
import LoadFIIsFirstTime from 'main/usecases/load_fiis_first_time';
import useSqlite from 'tests/hooks/use_sqlite';

jest.mock('main/services/http_service');

describe('Load FIIs for the first time', () => {
  useSqlite();

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
    const sqliteConnection = SqliteConnection.connect();
    const fiisStorage = new FIIsStorageSqlite(sqliteConnection);
    const fiisService = new FIIsService(fiisStorage);
    const loadFIIsFirstTime = LoadFIIsFirstTime(fiisService);

    return { fiisService, loadFIIsFirstTime };
  };

  test('should load FIIs when there is not FII stored', async () => {
    (HttpService.get as jest.Mock).mockReturnValue({ html: MOCK_HTML });

    const { fiisService, loadFIIsFirstTime } = setup();

    expect(await loadFIIsFirstTime()).toBeTruthy();
    expect(await fiisService.findFIIs()).toEqual([
      { name: 'XP Log', ticker: 'XPLG11' },
    ]);
  });

  test('should not load FIIs when there is FII stored', async () => {
    const { fiisService, loadFIIsFirstTime } = setup();

    await fiisService.saveFIIs([{ name: 'FII name', ticker: 'FII11' }]);
    expect(await loadFIIsFirstTime()).toBeFalsy();
  });
});