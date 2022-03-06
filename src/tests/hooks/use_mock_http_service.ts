import HttpService from '@services/http_service';
import HttpResponse from 'domain/http_response';

const useMockHttpService = () => {
  const expectedURLs: { [key: string]: string } = {
    'https://fiis.com.br/lista-de-fundos-imobiliarios': `
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
    `,
  };

  beforeAll(() => {
    (HttpService.get as jest.Mock).mockImplementation(async (url: string) => {
      return {
        status: 200,
        html: expectedURLs[url],
      } as HttpResponse;
    });
  });
};

export default useMockHttpService;
