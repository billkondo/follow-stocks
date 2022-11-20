import Event from '@entities/events/Event';
import Stock from '@entities/stocks/Stock';

const validEvents: Event[] = [
  new Event({
    date: new Date(2022, 8, 5),
    stock: {
      name: 'ITAUSA S/A',
      ticker: 'ITSA4',
      type: 'BR_STOCK',
      currencyCode: 'BRL',
    },
    quantity: 15,
    type: 'BUY',
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
    type: 'SELL',
    totalValue: 3074.87,
    unitPrice: 128.11,
  }),
  new Event({
    date: new Date(2021, 2, 11),
    quantity: 5,
    stock: {
      name: 'APPLE INC.',
      ticker: 'AAPL34',
      type: 'BDR',
      currencyCode: 'BRL',
    },
    type: 'BUY',
    totalValue: 349.45,
    unitPrice: 69.89,
  }),
  new Event({
    date: new Date(2021, 1, 22),
    quantity: 2,
    stock: {
      name: 'FDO INV IMOB - FII UBS (BR) RECEB IMOB',
      ticker: 'RECR12',
      type: 'SUBSCRIPTION',
      currencyCode: 'BRL',
    },
    type: 'SUBSCRIPTION',
    totalValue: null,
    unitPrice: null,
  }),
  new Event({
    date: new Date(2021, 3, 20),
    quantity: 4,
    stock: {
      name: 'BANCO BRADESCO S/A',
      ticker: 'BBDC4',
      type: 'BR_STOCK',
      currencyCode: 'BRL',
    },
    type: 'BONUS',
    totalValue: null,
    unitPrice: null,
  }),
  new Event({
    date: new Date(2021, 2, 30),
    quantity: 100,
    stock: {
      name: 'AES BRASIL ENERGIA S.A.',
      ticker: 'AESB3',
      type: 'BR_STOCK',
      currencyCode: 'BRL',
    },
    type: 'NAME_CHANGED',
    totalValue: null,
    unitPrice: null,
  }),
  new Event({
    date: new Date(2021, 3, 29),
    quantity: 10,
    stock: {
      name: 'WEG S.A.',
      ticker: 'WEGE3',
      type: 'BR_STOCK',
      currencyCode: 'BRL',
    },
    type: 'UNFOLDING',
    totalValue: null,
    unitPrice: null,
  }),
  new Event({
    date: new Date(2021, 6, 1),
    quantity: 45,
    stock: {
      name: 'BANCO BRADESCO S/A',
      ticker: 'BBDC4',
      type: 'BR_STOCK',
      currencyCode: 'BRL',
    },
    type: 'INCOME',
    totalValue: 0.73,
    unitPrice: 0.02,
  }),
  new Event({
    date: new Date(2020, 6, 27),
    quantity: 5,
    stock: {
      name: 'CDB320551LM - PARANA BANCO S/A',
      ticker: 'CDB',
      type: 'FIXED_INCOME',
      currencyCode: 'BRL',
    },
    type: 'BUY',
    totalValue: null,
    unitPrice: null,
  }),
];

export const stocksValidEvents: Stock[] = [
  {
    name: 'ITAUSA S/A',
    ticker: 'ITSA4',
    type: 'BR_STOCK',
    currencyCode: 'BRL',
  },
  {
    name: 'XP LOG FUNDO DE INVESTIMENTO IMOBILIARIO FII',
    ticker: 'XPLG11',
    type: 'FII',
    currencyCode: 'BRL',
  },
  {
    name: 'APPLE INC.',
    ticker: 'AAPL34',
    type: 'BDR',
    currencyCode: 'BRL',
  },
  {
    name: 'FDO INV IMOB - FII UBS (BR) RECEB IMOB',
    ticker: 'RECR12',
    type: 'SUBSCRIPTION',
    currencyCode: 'BRL',
  },
  {
    name: 'BANCO BRADESCO S/A',
    ticker: 'BBDC4',
    type: 'BR_STOCK',
    currencyCode: 'BRL',
  },
  {
    name: 'AES BRASIL ENERGIA S.A.',
    ticker: 'AESB3',
    type: 'BR_STOCK',
    currencyCode: 'BRL',
  },
  {
    name: 'WEG S.A.',
    ticker: 'WEGE3',
    type: 'BR_STOCK',
    currencyCode: 'BRL',
  },
  {
    name: 'CDB320551LM - PARANA BANCO S/A',
    ticker: 'CDB',
    type: 'FIXED_INCOME',
    currencyCode: 'BRL',
  },
];

export const validEventsJSON = validEvents.map((event) => event.toJSON());

export default validEvents;
