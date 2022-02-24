import FIIsService from 'main/services/fiis_service';
import HttpService from 'main/services/http_service';
import FIIsStorageSqlite from 'main/services/sqlite/fiis_storage_sqlite';
import SqliteConnection from 'main/services/sqlite/sqlite_connection';
import LoadFIIs from 'main/usecases/load_fiis';
import useSqlite from 'tests/hooks/use_sqlite';

jest.mock('main/services/http_service');

describe('Load FIIs', () => {
  useSqlite();

  const MOCK_HTML = `
    <div id="items-wrapper">
      <div class="item">
        <a href="https://fiis.com.br/afof11">
          <span class="ticker">AFOF11</span>
          <span class="name">Alianza FOF</span>
        </a>
      </div>
      <div class="item">
        <a href="https://fiis.com.br/htmx11">
          <span class="ticker">HTMX11</span>
          <span class="name">Hotel Maxinvest</span>
        </a>
      </div>
      <div class="item">
        <a href="https://fiis.com.br/vgir11">
          <span class="ticker">VGIR11</span>
          <span class="name">Valora RE III</span>
        </a>
      </div>
    </div>
  `;

  test('should load FIIs', async () => {
    (HttpService.get as jest.Mock).mockReturnValue({
      html: MOCK_HTML,
    });

    const sqliteConnect = SqliteConnection.connect();
    const fiisStorage = new FIIsStorageSqlite(sqliteConnect);
    const fiisService = new FIIsService(fiisStorage);
    const loadFIIs = LoadFIIs(fiisService);

    await loadFIIs();

    expect(await fiisService.findFIIs()).toEqual([
      { ticker: 'AFOF11', name: 'Alianza FOF' },
      { ticker: 'HTMX11', name: 'Hotel Maxinvest' },
      { ticker: 'VGIR11', name: 'Valora RE III' },
    ]);
  });
});
