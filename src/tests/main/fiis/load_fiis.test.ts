import HttpService from 'main/services/http_service';
import LoadStocks from 'main/usecases/load_stocks';
import useFIIs from 'tests/hooks/use_fiis';
import useSqlite from 'tests/hooks/use_sqlite';

jest.mock('main/services/http_service');

describe('Load FIIs', () => {
  useSqlite();
  const { fiisServiceFactory } = useFIIs();
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

  const setup = () => {
    const fiisService = fiisServiceFactory();
    const loadFIIs = LoadStocks(fiisService);

    return { loadFIIs, fiisService };
  };

  test('should load FIIs', async () => {
    (HttpService.get as jest.Mock).mockReturnValue({
      html: MOCK_HTML,
    });
    const { loadFIIs, fiisService } = setup();

    await loadFIIs();

    expect(await fiisService.findFIIs()).toEqual([
      { ticker: 'AFOF11', name: 'Alianza FOF' },
      { ticker: 'HTMX11', name: 'Hotel Maxinvest' },
      { ticker: 'VGIR11', name: 'Valora RE III' },
    ]);
  });
});
