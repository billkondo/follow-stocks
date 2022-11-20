import Event from '@entities/events/Event';
import B3Parser from 'main/parsers/B3Parser';
import validEvents from 'tests/mocks/b3_spreadsheets/validEvents';
import readTestFilePath from 'tests/readTestFilePath';

describe('B3 Parser', () => {
  it('should parse valid events', () => {
    const b3Parser = new B3Parser();
    const file = readTestFilePath('mocks/b3_spreadsheets/validEvents.xlsx');

    const events = b3Parser.parseExcelFile(file);

    expect(events).toEqual(validEvents);
  });

  it('should parse unknown events', () => {
    const b3Parser = new B3Parser();
    const file = readTestFilePath(
      'mocks/b3_spreadsheets/unknownTypeEvents.xlsx',
    );

    const events = b3Parser.parseExcelFile(file);

    expect(events).toEqual([
      new Event({
        date: new Date(2022, 8, 5),
        quantity: 15,
        stock: {
          name: 'ITAUSA S/A',
          ticker: 'ITSA4',
          type: 'BR_STOCK',
          currencyCode: 'BRL',
        },
        type: 'UNKNOWN',
        totalValue: 135.15,
        unitPrice: 9.01,
      }),
      new Event({
        date: new Date(2020, 10, 19),
        quantity: 24,
        stock: {
          name: 'XP LOG FUNDO DE INVESTIMENTO IMOBILIARIO FII',
          ticker: 'XPLG11',
          type: 'FII',
          currencyCode: 'BRL',
        },
        type: 'UNKNOWN',
        totalValue: 3074.87,
        unitPrice: 128.11,
      }),
      new Event({
        date: new Date(2020, 10, 19),
        quantity: 24,
        stock: {
          name: 'XP LOG FUNDO DE INVESTIMENTO IMOBILIARIO FII',
          ticker: 'XPLG11',
          type: 'FII',
          currencyCode: 'BRL',
        },
        type: 'UNKNOWN',
        totalValue: 3074.87,
        unitPrice: 128.11,
      }),
    ]);
  });

  it('should parse ignored events', () => {
    const b3Parser = new B3Parser();
    const file = readTestFilePath('mocks/b3_spreadsheets/ignoredEvents.xlsx');

    const events = b3Parser.parseExcelFile(file);

    expect(events).toEqual([
      new Event({
        date: new Date(2020, 9, 16),
        quantity: 21,
        stock: {
          name: 'CSHG RENDA URBANA - FUNDO DE INVESTIMENTO IMOBILIARIO - FII',
          ticker: 'HGRU12',
          type: 'SUBSCRIPTION',
          currencyCode: 'BRL',
        },
        type: 'IGNORED',
        totalValue: null,
        unitPrice: null,
      }),
      new Event({
        date: new Date(2021, 2, 11),
        quantity: 7,
        stock: {
          name: 'FDO INV IMOB - FII UBS (BR) RECEB IMOB',
          ticker: 'RECR11',
          type: 'FII',
          currencyCode: 'BRL',
        },
        type: 'IGNORED',
        totalValue: null,
        unitPrice: null,
      }),
    ]);
  });
});
