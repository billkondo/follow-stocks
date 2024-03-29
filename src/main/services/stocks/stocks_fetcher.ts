import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';
import NotImplementedError from '@errors/not_implemented_error';
import HttpService from '@services/http_service';
import NodeHtmlParser from 'node-html-parser';

const StocksFetcher: { [key in StockType]: () => Promise<Stock[]> } = {
  BDR: async () => {
    throw new NotImplementedError();
  },
  BR_STOCK: async () => {
    throw new NotImplementedError();
  },
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
            currencyCode: 'BRL',
          } as Stock),
      );
  },
  FIXED_INCOME: async () => {
    throw new NotImplementedError();
  },
  SUBSCRIPTION: async () => {
    throw new NotImplementedError();
  },
};

export default StocksFetcher;
