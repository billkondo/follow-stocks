import FII from 'domain/fii';
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
}

export default FIIsService;
