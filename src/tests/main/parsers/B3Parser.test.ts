import Event from '@entities/event/event';
import B3Parser from 'main/parsers/B3Parser';

import path from 'path';

describe('B3 Parser', () => {
  const buildTestFilePath = (fileName: string) =>
    path.join(__dirname, 'tests_cases', fileName);

  it('should parse valid events', () => {
    const b3Parser = new B3Parser();
    const filePath = buildTestFilePath('valid_events.xlsx');

    const events = b3Parser.processeFile(filePath);

    expect(events).toEqual([
      {
        date: new Date(2022, 8, 5),
        price: {
          code: 'BRL',
          value: 9.01,
        },
        stock: {
          name: 'ITAUSA S/A',
          ticker: 'ITSA4',
          type: 'BR_STOCK',
        },
        quantity: 15,
        type: 'BUY',
      },
      {
        date: new Date(2020, 10, 19),
        price: {
          code: 'BRL',
          value: 128.11,
        },
        quantity: 24,
        stock: {
          name: 'XP LOG FUNDO DE INVESTIMENTO IMOBILIARIO FII',
          ticker: 'XPLG11',
          type: 'FII',
        },
        type: 'SELL',
      },
      {
        date: new Date(2021, 2, 11),
        price: {
          code: 'BRL',
          value: 69.89,
        },
        quantity: 5,
        stock: {
          name: 'APPLE INC.',
          ticker: 'AAPL34',
          type: 'BDR',
        },
        type: 'BUY',
      },
      {
        date: new Date(2021, 1, 22),
        price: null,
        quantity: 2,
        stock: {
          name: 'FDO INV IMOB - FII UBS (BR) RECEB IMOB',
          ticker: 'RECR12',
          type: 'SUBSCRIPTION',
        },
        type: 'SUBSCRIPTION',
      },
      {
        date: new Date(2021, 3, 20),
        price: null,
        quantity: 4,
        stock: {
          name: 'BANCO BRADESCO S/A',
          ticker: 'BBDC4',
          type: 'BR_STOCK',
        },
        type: 'BONUS',
      },
      {
        date: new Date(2021, 2, 30),
        price: null,
        quantity: 100,
        stock: {
          name: 'AES BRASIL ENERGIA S.A.',
          ticker: 'AESB3',
          type: 'BR_STOCK',
        },
        type: 'NAME_CHANGED',
      },
      {
        date: new Date(2021, 3, 29),
        price: null,
        quantity: 10,
        stock: {
          name: 'WEG S.A.',
          ticker: 'WEGE3',
          type: 'BR_STOCK',
        },
        type: 'UNFOLDING',
      },
      {
        date: new Date(2021, 6, 1),
        price: {
          code: 'BRL',
          value: 0.02,
        },
        quantity: 45,
        stock: {
          name: 'BANCO BRADESCO S/A',
          ticker: 'BBDC4',
          type: 'BR_STOCK',
        },
        type: 'INCOME',
      },
      {
        date: new Date(2020, 6, 27),
        price: null,
        quantity: 5,
        stock: {
          name: 'CDB320551LM - PARANA BANCO S/A',
          ticker: 'CDB',
          type: 'FIXED_INCOME',
        },
        type: 'BUY',
      },
    ] as Event[]);
  });

  it('should parse unknown events', () => {
    const b3Parser = new B3Parser();
    const filePath = buildTestFilePath('unknown_type_events.xlsx');

    const events = b3Parser.processeFile(filePath);

    expect(events).toEqual([
      {
        date: new Date(2022, 8, 5),
        price: {
          code: 'BRL',
          value: 9.01,
        },
        quantity: 15,
        stock: {
          name: 'ITAUSA S/A',
          ticker: 'ITSA4',
          type: 'BR_STOCK',
        },
        type: 'UNKNOWN',
      },
      {
        date: new Date(2020, 10, 19),
        price: {
          code: 'BRL',
          value: 128.11,
        },
        quantity: 24,
        stock: {
          name: 'XP LOG FUNDO DE INVESTIMENTO IMOBILIARIO FII',
          ticker: 'XPLG11',
          type: 'FII',
        },
        type: 'UNKNOWN',
      },
      {
        date: new Date(2020, 10, 19),
        price: {
          code: 'BRL',
          value: 128.11,
        },
        quantity: 24,
        stock: {
          name: 'XP LOG FUNDO DE INVESTIMENTO IMOBILIARIO FII',
          ticker: 'XPLG11',
          type: 'FII',
        },
        type: 'UNKNOWN',
      },
    ] as Event[]);
  });

  it('should parse ignored events', () => {
    const b3Parser = new B3Parser();
    const filePath = buildTestFilePath('ignored_events.xlsx');

    const events = b3Parser.processeFile(filePath);

    expect(events).toEqual([
      {
        date: new Date(2020, 9, 16),
        price: null,
        quantity: 21,
        stock: {
          name: 'CSHG RENDA URBANA - FUNDO DE INVESTIMENTO IMOBILIARIO - FII',
          ticker: 'HGRU12',
          type: 'SUBSCRIPTION',
        },
        type: 'IGNORED',
      },
      {
        date: new Date(2021, 2, 11),
        price: null,
        quantity: 7,
        stock: {
          name: 'FDO INV IMOB - FII UBS (BR) RECEB IMOB',
          ticker: 'RECR11',
          type: 'FII',
        },
        type: 'IGNORED',
      },
    ] as Event[]);
  });
});
