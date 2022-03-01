import FII from 'domain/fii';
import Stock from 'domain/stock';
import FIIsRepository from 'main/repositories/fiis_repository';
import FIIsStorage from 'main/repositories/fiis_storage';
import NodeHtmlParser from 'node-html-parser';
import HttpService from './http_service';

class FIIsService implements FIIsRepository {
  FIIS_URL = 'https://fiis.com.br/lista-de-fundos-imobiliarios';
  fiisStorage: FIIsStorage;

  constructor(fiisStorage: FIIsStorage) {
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
          } as FII),
      );
  }

  async fetchFIIs() {
    const response = await HttpService.get(this.FIIS_URL);
    return this.extractFIIs(response.html);
  }

  async saveFIIs(fiis: FII[]) {
    await this.fiisStorage.saveFIIs(fiis);
  }

  async findFIIs(): Promise<FII[]> {
    return await this.fiisStorage.findAllFIIs();
  }

  async exists(stock: Stock): Promise<boolean> {
    return this.fiisStorage.exists(stock);
  }

  async search(tickerText: string): Promise<Stock[]> {
    return await this.fiisStorage.searchByTicker(tickerText);
  }

  async save(stocks: Stock[]) {
    await this.fiisStorage.saveFIIs(stocks);
  }

  async load(): Promise<Stock[]> {
    const response = await HttpService.get(this.FIIS_URL);

    return this.extractFIIs(response.html);
  }

  async count(): Promise<number> {
    return this.fiisStorage.count();
  }
}

export default FIIsService;
