import Stock from 'domain/stock';
import StocksRepository from 'main/repositories/stocks_repository';
import StocksStorage from 'main/repositories/stocks_storage';
import NodeHtmlParser from 'node-html-parser';
import HttpService from './http_service';

class FIIsService implements StocksRepository {
  FIIS_URL = 'https://fiis.com.br/lista-de-fundos-imobiliarios';
  fiisStorage: StocksStorage;

  constructor(fiisStorage: StocksStorage) {
    this.fiisStorage = fiisStorage;
  }

  extractFIIs(html: string) {
    const parsedHtml = NodeHtmlParser(html);
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
  }

  async exists(stock: Stock): Promise<boolean> {
    return this.fiisStorage.exists(stock);
  }

  async search(tickerText: string): Promise<Stock[]> {
    return await this.fiisStorage.searchByTickerAndType(tickerText, 'FII');
  }

  async save(stocks: Stock[]) {
    await this.fiisStorage.save(stocks);
  }

  async load(): Promise<Stock[]> {
    const response = await HttpService.get(this.FIIS_URL);

    return this.extractFIIs(response.html);
  }

  async count(): Promise<number> {
    return this.fiisStorage.countByType('FII');
  }

  async findAll(): Promise<Stock[]> {
    return this.fiisStorage.findAllByType('FII');
  }
}

export default FIIsService;
