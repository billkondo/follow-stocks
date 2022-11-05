import Event from '@entities/event/event';
import EventType from '@entities/event/event_type';
import Price from '@entities/price/price';
import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';
import parseDate from '@usecases/dates/parseDate';
import { readFile, utils } from 'xlsx';

type B3Row = {
  Data: string;
  'Entrada/Saída': string;
  Movimentação: string;
  Produto: string;
  Quantidade: string;
  'Preço unitário': string;
};

class B3Parser {
  EXCEL_SHEETNAME = 'Movimentação';

  processeFile(filePath: string): Event[] {
    const workbook = readFile(filePath);
    const sheet = workbook.Sheets[this.EXCEL_SHEETNAME];
    const jsonData = utils.sheet_to_json(sheet) as B3Row[];

    return jsonData.map((row) => this.parseExcelRow(row));
  }

  parseExcelRow(row: B3Row): Event {
    return {
      date: this.parseExcelDate(row),
      price: this.parseExcelUnitPrice(row),
      quantity: this.parseExcelQuantity(row),
      stock: this.parseExcelStock(row),
      type: this.parseExcelTransactionType(row),
    };
  }

  parseExcelDate(row: B3Row): Date {
    return parseDate(row.Data);
  }

  parseExcelUnitPrice(row: B3Row): Price {
    const price = parseFloat(row['Preço unitário']);

    if (isNaN(price)) {
      return null;
    }

    return {
      code: 'BRL',
      value: price,
    };
  }

  parseExcelQuantity(row: B3Row): number {
    const quantity = parseInt(row.Quantidade);

    if (isNaN(quantity)) {
      return null;
    }

    return quantity;
  }

  parseExcelStock(row: B3Row): Stock {
    const { ticker, name } = this.parseExcelStockName(row);

    return {
      type: this.parseExcelStockType(row),
      ticker,
      name,
    };
  }

  parseExcelStockName(row: B3Row) {
    const excelStockName = row.Produto;
    const excelStockNameParts = excelStockName.split(' - ');

    return {
      ticker: excelStockNameParts[0],
      name: excelStockNameParts.slice(1).join(' - '),
    };
  }

  parseExcelStockType(row: B3Row): StockType {
    const { ticker } = this.parseExcelStockName(row);
    const excelStockName = row.Produto;
    const excelDescription = row.Movimentação;

    const isBDR = (ticker = '') => {
      return ticker.slice(-2) === '34';
    };
    if (isBDR(ticker)) {
      return 'BDR';
    }

    const wordMatchedAnyKeyword = (word: string, keywords: string[]) => {
      for (const keyword of keywords) {
        if (word.match(keyword)) {
          return true;
        }
      }

      return false;
    };

    const subscriptionKeywords = ['Direito', 'Subscrição'];
    if (wordMatchedAnyKeyword(excelDescription, subscriptionKeywords)) {
      return 'SUBSCRIPTION';
    }

    const fiiKeywords = [
      'FII',
      'IMOB',
      'INVESTIMENTO IMOBILIARIO',
      'RENDA URBANA',
    ];
    if (wordMatchedAnyKeyword(excelStockName, fiiKeywords)) {
      return 'FII';
    }

    const fixedIncomeKeywords = ['LCA', 'LCI', 'CDB'];
    if (wordMatchedAnyKeyword(excelStockName, fixedIncomeKeywords)) {
      return 'FIXED_INCOME';
    }

    return 'BR_STOCK';
  }

  parseExcelTransactionType(row: B3Row): EventType {
    const transactionType = row['Entrada/Saída'];
    const transactionDescription = row.Movimentação;
    const buyDescriptions = ['COMPRA / VENDA', 'Transferência - Liquidação'];
    const ignoredDescriptions = [
      'Cessão de Direitos',
      'Direito de Subscrição',
      'Direitos de Subscrição - Não Exercido',
      'Leilão de Fração',
      'Transferência',
      'Cessão de Direitos - Solicitada',
      'Recibo de Subscrição',
      'Solicitação de Subscrição',
      'Atualização',
      'Rendimento - Transferido',
      'Juros Sobre Capital Próprio - Transferido',
      'Dividendo - Transferido',
      'TRANSFERENCIA SEM FINANCEIRO',
      'Fração em Ativos',
    ];
    const profitDescriptions = [
      'Rendimento',
      'Dividendo',
      'Juros Sobre Capital Próprio',
    ];

    if (ignoredDescriptions.includes(transactionDescription)) {
      return 'IGNORED';
    }

    if (transactionType === 'Credito') {
      if (profitDescriptions.includes(transactionDescription)) return 'INCOME';

      if (buyDescriptions.includes(transactionDescription)) return 'BUY';

      if (transactionDescription === 'Desdobro') return 'UNFOLDING';

      if (transactionDescription === 'Bonificação em Ativos') return 'BONUS';

      if (transactionDescription === 'Incorporação') return 'NAME_CHANGED';
    }

    if (transactionType === 'Debito') {
      if (transactionDescription === 'Transferência - Liquidação')
        return 'SELL';

      if (transactionDescription === 'Direitos de Subscrição - Excercído')
        return 'SUBSCRIPTION';
    }

    return 'UNKNOWN';
  }
}

export default B3Parser;
