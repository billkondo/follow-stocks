import HttpService from 'main/services/http_service';
import LoadStocks from 'main/usecases/load_stocks';
import useSqlite from 'tests/hooks/use_sqlite';
import useStocks from 'tests/hooks/use_stocks';

describe('Load FIIs', () => {
  useSqlite();
  const { stocksServiceFactory } = useStocks();
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
    const stocksService = stocksServiceFactory();
    const loadStocks = LoadStocks(stocksService);

    return { loadStocks, stocksService };
  };

  test('should load FIIs', async () => {
    (HttpService.get as jest.Mock).mockReturnValue({
      html: MOCK_HTML,
    });
    const { loadStocks, stocksService } = setup();

    await loadStocks('FII');

    expect(await stocksService.findAll('FII')).toEqual([
      { ticker: 'AFOF11', name: 'Alianza FOF', type: 'FII' },
      { ticker: 'HTMX11', name: 'Hotel Maxinvest', type: 'FII' },
      { ticker: 'VGIR11', name: 'Valora RE III', type: 'FII' },
    ]);
  });
});
