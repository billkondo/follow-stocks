import Stock from '@entities/stocks/Stock';
import StockQuotation from '@entities/stock_quotation';
import HttpService from '@services/http_service';
import NodeHtmlParser, { HTMLElement } from 'node-html-parser';
import parsePrice from 'utils/parse_price';

class StocksQuotationsFetcher {
  static async fetch(stock: Stock): Promise<StockQuotation> {
    const response = await HttpService.get(buildUrl(stock));

    const html = NodeHtmlParser(response.html);
    const price = extractPriceFromHtml(html);

    return {
      stock,
      quotation: price,
      updatedAt: new Date(Date.now()),
    };
  }
}

const buildUrl = (stock: Stock) => {
  const BASE_URL = 'https://finance.yahoo.com/quote/';
  const suffix = stock.type === 'FII' ? '.SA' : '';

  return `${BASE_URL}${stock.ticker}${suffix}`;
};

const extractPriceFromHtml = (html: HTMLElement): number => {
  const finStreamerWithRegularMarkerPriceAttribute = html.querySelector(
    'fin-streamer[data-field="regularMarketPrice"]',
  );

  if (!finStreamerWithRegularMarkerPriceAttribute)
    throw new Error('price search found nothing');

  const price = parsePrice(
    finStreamerWithRegularMarkerPriceAttribute.text.trim(),
  );

  if (isNaN(price)) throw new Error('price search found invalid value');

  return price;
};

export default StocksQuotationsFetcher;
