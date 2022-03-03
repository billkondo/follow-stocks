import HttpService from '@services/http_service';
import Stock from 'domain/stock';
import StockType from 'domain/stock_type';
import NodeHtmlParser from 'node-html-parser';

const StocksFetcher: { [key in StockType]: () => Promise<Stock[]> } = {
  FII: async () => {
    const FIIS_URL = 'https://fiis.com.br/lista-de-fundos-imobiliarios';
    const response = await HttpService.get(FIIS_URL);

    const parsedHtml = NodeHtmlParser(response.html);
    const fiisHtml = parsedHtml.querySelector('#items-wrapper');

    return fiisHtml.childNodes
      .map((child) => child.innerText.split('\n').filter((word) => word.trim()))
      .filter((fii) => fii.length)
      .map(
        (fii) =>
          ({
            ticker: fii[0].trim(),
            name: fii[1].trim(),
            type: 'FII',
          } as Stock),
      );
  },
};

export default StocksFetcher;
