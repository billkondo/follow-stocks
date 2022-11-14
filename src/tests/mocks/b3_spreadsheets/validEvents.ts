import Event from '@entities/events/Event';
import Stock from '@entities/stocks/stock';

export const stocksValidEvents: Stock[] = [
  {
    name: 'ITAUSA S/A',
    ticker: 'ITSA4',
    type: 'BR_STOCK',
  },
  {
    name: 'XP LOG FUNDO DE INVESTIMENTO IMOBILIARIO FII',
    ticker: 'XPLG11',
    type: 'FII',
  },
  {
    name: 'APPLE INC.',
    ticker: 'AAPL34',
    type: 'BDR',
  },
  {
    name: 'FDO INV IMOB - FII UBS (BR) RECEB IMOB',
    ticker: 'RECR12',
    type: 'SUBSCRIPTION',
  },
  {
    name: 'BANCO BRADESCO S/A',
    ticker: 'BBDC4',
    type: 'BR_STOCK',
  },
  {
    name: 'AES BRASIL ENERGIA S.A.',
    ticker: 'AESB3',
    type: 'BR_STOCK',
  },
  {
    name: 'WEG S.A.',
    ticker: 'WEGE3',
    type: 'BR_STOCK',
  },
  {
    name: 'CDB320551LM - PARANA BANCO S/A',
    ticker: 'CDB',
    type: 'FIXED_INCOME',
  },
];

const validEvents: Event[] = [
  new Event({
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
  }),
  new Event({
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
  }),
  new Event({
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
  }),
  new Event({
    date: new Date(2021, 1, 22),
    price: null,
    quantity: 2,
    stock: {
      name: 'FDO INV IMOB - FII UBS (BR) RECEB IMOB',
      ticker: 'RECR12',
      type: 'SUBSCRIPTION',
    },
    type: 'SUBSCRIPTION',
  }),
  new Event({
    date: new Date(2021, 3, 20),
    price: null,
    quantity: 4,
    stock: {
      name: 'BANCO BRADESCO S/A',
      ticker: 'BBDC4',
      type: 'BR_STOCK',
    },
    type: 'BONUS',
  }),
  new Event({
    date: new Date(2021, 2, 30),
    price: null,
    quantity: 100,
    stock: {
      name: 'AES BRASIL ENERGIA S.A.',
      ticker: 'AESB3',
      type: 'BR_STOCK',
    },
    type: 'NAME_CHANGED',
  }),
  new Event({
    date: new Date(2021, 3, 29),
    price: null,
    quantity: 10,
    stock: {
      name: 'WEG S.A.',
      ticker: 'WEGE3',
      type: 'BR_STOCK',
    },
    type: 'UNFOLDING',
  }),
  new Event({
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
  }),
  new Event({
    date: new Date(2020, 6, 27),
    price: null,
    quantity: 5,
    stock: {
      name: 'CDB320551LM - PARANA BANCO S/A',
      ticker: 'CDB',
      type: 'FIXED_INCOME',
    },
    type: 'BUY',
  }),
];

export default validEvents;
