import HttpService from '@services/http_service';
import PriceCode from 'domain/price_code';
import Stock from 'domain/stock';
import StockQuotation from 'domain/stock_quotation';
import NodeHtmlParser, { HTMLElement } from 'node-html-parser';
import parsePrice from 'utils/parse_price';

class StocksQuotationsFetcher {
  static async fetch(stock: Stock): Promise<StockQuotation> {
    const response = await HttpService.get(buildUrl(stock));

    const html = NodeHtmlParser(response.html);

    const currency = extractCurrencyFromHtml(html);
    const price = extractPriceFromHtml(html);

    return {
      stock,
      quotation: {
        code: currency,
        value: price,
      },
    };
  }
}

const buildUrl = (stock: Stock) => {
  const BASE_URL = 'https://finance.yahoo.com/quote/';
  const suffix = stock.type === 'FII' ? '.SA' : '';

  return `${BASE_URL}${stock.ticker}${suffix}`;
};

const extractCurrencyFromHtml = (html: HTMLElement): PriceCode => {
  const extractLastThreeDigits = (word: string): string => {
    return word.slice(word.length - 3);
  };

  const validatePriceCode = (priceCode: string) => {
    if (priceCode === 'BRL') return;
    if (priceCode === 'USD') return;

    throw new Error(`${priceCode} is a invalid price code`);
  };

  const divWithCurrencyText = html.querySelector(
    '.Fz\\(12px\\), .C\\($tertiaryColor\\)',
  );

  if (!divWithCurrencyText) throw new Error('currency search found nothing');

  const currentText = divWithCurrencyText.text.trim();
  const priceCode = extractLastThreeDigits(currentText);

  validatePriceCode(priceCode);

  return priceCode as PriceCode;
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
