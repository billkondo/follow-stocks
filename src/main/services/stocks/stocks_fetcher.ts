import HttpService from '@services/http_service';
import Stock from 'domain/entities/stock/stock';
import StockType from 'domain/entities/stock/stock_type';
import NotImplementedError from 'domain/errors/not_implemented_error';
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
