import Stock from 'domain/entities/stock/stock';
import StockInvested from 'domain/entities/stock_invested/stock_invested';
import StockNegotiation from 'domain/entities/stock_negotiation/stock_negotiation';
import { mock } from 'jest-mock-extended';
import GenerateAveragePricesFromStocksNegotiations from 'main/usecases/generate_average_prices_from_stocks_negotiations';

describe('Generate average prices from stocks negotiations', () => {
  const runTest = (
    stockNegotiations: StockNegotiation[],
    expectedStocksInvested: StockInvested[],
  ) => {
    const generateAveragePricesFromStocksNegotiations =
      GenerateAveragePricesFromStocksNegotiations(stockNegotiations);

    for (const expectedValue of expectedStocksInvested)
      expect(generateAveragePricesFromStocksNegotiations.next().value).toEqual(
        expectedValue,
      );

    expect(
      generateAveragePricesFromStocksNegotiations.next().done,
    ).toBeTruthy();
  };

  test('should generate average price, total invested and total quantity', () => {
    const mockStock = mock<Stock>();
    const mockStocksNegotiations: StockNegotiation[] = [
      {
        date: new Date(2019, 7, 22),
        price: {
          value: 23.33,
          code: 'BRL',
        },
        quantity: 4,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2019, 7, 26),
        price: {
          value: 24.0,
          code: 'BRL',
        },
        quantity: 4,
        stock: mockStock,
        type: 'SELL',
      },
      {
        date: new Date(2019, 9, 19),
        price: {
          value: 24.46,
          code: 'BRL',
        },
        quantity: 100,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2019, 9, 25),
        price: {
          value: 25.46,
          code: 'BRL',
        },
        quantity: 100,
        stock: mockStock,
        type: 'SELL',
      },
      {
        date: new Date(2019, 11, 12),
        price: {
          value: 25.81,
          code: 'BRL',
        },
        quantity: 52,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2019, 11, 18),
        price: {
          value: 26.92,
          code: 'BRL',
        },
        quantity: 33,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2019, 11, 18),
        price: {
          value: 26.93,
          code: 'BRL',
        },
        quantity: 32,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2020, 3, 6),
        price: {
          value: 28.09,
          code: 'BRL',
        },
        quantity: 48,
        stock: mockStock,
        type: 'SELL',
      },
      {
        date: new Date(2020, 3, 20),
        price: {
          value: 20.03,
          code: 'BRL',
        },
        quantity: 14,
        stock: mockStock,
        type: 'BUY',
      },
    ];
    const expectedValues: StockInvested[] = [
      {
        stock: mockStock,
        quantity: 4,
        averagePrice: {
          value: 23.33,
          code: 'BRL',
        },
        totalInvested: {
          value: 93.32,
          code: 'BRL',
        },
      },
      {
        stock: mockStock,
        quantity: 0,
        averagePrice: {
          value: 0,
          code: 'BRL',
        },
        totalInvested: {
          value: 0,
          code: 'BRL',
        },
      },
      {
        stock: mockStock,
        quantity: 100,
        averagePrice: {
          value: 24.46,
          code: 'BRL',
        },
        totalInvested: {
          value: 2446.0,
          code: 'BRL',
        },
      },
      {
        stock: mockStock,
        quantity: 0,
        averagePrice: {
          value: 0,
          code: 'BRL',
        },
        totalInvested: {
          value: 0,
          code: 'BRL',
        },
      },
      {
        stock: mockStock,
        quantity: 52,
        averagePrice: {
          value: 25.81,
          code: 'BRL',
        },
        totalInvested: {
          value: 1342.12,
          code: 'BRL',
        },
      },
      {
        stock: mockStock,
        quantity: 85,
        averagePrice: {
          value: 26.2409,
          code: 'BRL',
        },
        totalInvested: {
          value: 2230.48,
          code: 'BRL',
        },
      },
      {
        stock: mockStock,
        quantity: 117,
        averagePrice: {
          value: 26.4294,
          code: 'BRL',
        },
        totalInvested: {
          value: 3092.24,
          code: 'BRL',
        },
      },
      {
        stock: mockStock,
        quantity: 69,
        averagePrice: {
          value: 26.4294,
          code: 'BRL',
        },
        totalInvested: {
          value: 1823.6287,
          code: 'BRL',
        },
      },
      {
        stock: mockStock,
        quantity: 83,
        averagePrice: {
          value: 25.35,
          code: 'BRL',
        },
        totalInvested: {
          value: 2104.0487,
          code: 'BRL',
        },
      },
    ];

    runTest(mockStocksNegotiations, expectedValues);
  });

  describe('should deal with floating precision', () => {
    const mockStock = mock<Stock>();
    const mockStocksNegotiations: StockNegotiation[] = [
      {
        date: new Date(2022, 12, 1),
        price: {
          value: 0.1,
          code: 'BRL',
        },
        quantity: 1,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 1),
        price: {
          value: 0.2,
          code: 'BRL',
        },
        quantity: 1,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 1),
        price: {
          value: 0.4,
          code: 'BRL',
        },
        quantity: 1,
        stock: mockStock,
        type: 'SELL',
      },
    ];
    const expectedValues: StockInvested[] = [
      {
        stock: mockStock,
        totalInvested: { value: 0.1, code: 'BRL' },
        averagePrice: { value: 0.1, code: 'BRL' },
        quantity: 1,
      },
      {
        stock: mockStock,
        totalInvested: { value: 0.3, code: 'BRL' },
        averagePrice: { value: 0.15, code: 'BRL' },
        quantity: 2,
      },
      {
        stock: mockStock,
        totalInvested: { value: 0.15, code: 'BRL' },
        averagePrice: { value: 0.15, code: 'BRL' },
        quantity: 1,
      },
    ];

    runTest(mockStocksNegotiations, expectedValues);
  });

  test('should reset average price if all stocks are sold', () => {
    const mockStock = mock<Stock>();
    const mockStocksNegotiations: StockNegotiation[] = [
      {
        date: new Date(2022, 12, 1),
        price: {
          code: 'USD',
          value: 120,
        },
        quantity: 0.5,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 2),
        price: {
          code: 'USD',
          value: 125,
        },
        quantity: 0.25,
        stock: mockStock,
        type: 'SELL',
      },
      {
        date: new Date(2022, 12, 3),
        price: {
          code: 'USD',
          value: 140,
        },
        quantity: 0.25,
        stock: mockStock,
        type: 'SELL',
      },
      {
        date: new Date(2022, 12, 1),
        price: {
          code: 'USD',
          value: 100,
        },
        quantity: 0.5,
        stock: mockStock,
        type: 'BUY',
      },
    ];
    const expectedValues: StockInvested[] = [
      {
        averagePrice: {
          code: 'USD',
          value: 120,
        },
        quantity: 0.5,
        stock: mockStock,
        totalInvested: {
          code: 'USD',
          value: 60,
        },
      },
      {
        averagePrice: {
          code: 'USD',
          value: 120,
        },
        quantity: 0.25,
        stock: mockStock,
        totalInvested: {
          code: 'USD',
          value: 30,
        },
      },
      {
        averagePrice: {
          code: 'USD',
          value: 0,
        },
        quantity: 0,
        stock: mockStock,
        totalInvested: {
          code: 'USD',
          value: 0,
        },
      },
      {
        averagePrice: {
          code: 'USD',
          value: 100,
        },
        quantity: 0.5,
        stock: mockStock,
        totalInvested: {
          code: 'USD',
          value: 50,
        },
      },
    ];

    runTest(mockStocksNegotiations, expectedValues);
  });
});
