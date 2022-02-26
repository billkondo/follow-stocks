import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import { mock } from 'jest-mock-extended';
import GenerateAveragePricesFromStocksNegotiations from 'main/usecases/generate_average_prices_from_stocks_negotiations';

describe('Generate average prices from stocks negotiations', () => {
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

    const generateAveragePricesFromStocksNegotiations =
      GenerateAveragePricesFromStocksNegotiations(mockStocksNegotiations);

    const expectedValues = [
      {
        totalQuantity: 4,
        averagePrice: 23.33,
        totalInvested: 93.32,
      },
      {
        totalQuantity: 0,
        averagePrice: 23.33,
        totalInvested: 0,
      },
      {
        totalQuantity: 100,
        averagePrice: 24.46,
        totalInvested: 2446.0,
      },
      {
        totalQuantity: 0,
        averagePrice: 24.46,
        totalInvested: 0,
      },
      {
        totalQuantity: 52,
        averagePrice: 25.81,
        totalInvested: 1342.12,
      },
      {
        totalQuantity: 85,
        averagePrice: 26.24,
        totalInvested: 2230.48,
      },
      {
        totalQuantity: 117,
        averagePrice: 26.43,
        totalInvested: 3092.24,
      },
      {
        totalQuantity: 69,
        averagePrice: 26.43,
        totalInvested: 1823.63,
      },
      {
        totalQuantity: 83,
        averagePrice: 25.35,
        totalInvested: 2104.05,
      },
    ];

    for (const expectedValue of expectedValues)
      expect(generateAveragePricesFromStocksNegotiations.next().value).toEqual(
        expectedValue,
      );

    expect(
      generateAveragePricesFromStocksNegotiations.next().done,
    ).toBeTruthy();
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
        quantity: 2,
        stock: mockStock,
        type: 'SELL',
      },
    ];

    const expectedValues = [
      {
        totalInvested: 0.1,
        averagePrice: 0.1,
        totalQuantity: 1,
      },
      {
        totalInvested: 0.3,
        averagePrice: 0.15,
        totalQuantity: 2,
      },
      {
        totalInvested: 0,
        averagePrice: 0.15,
        totalQuantity: 0,
      },
    ];

    const generateAveragePricesFromStocksNegotiations =
      GenerateAveragePricesFromStocksNegotiations(mockStocksNegotiations);

    for (const expectedValue of expectedValues)
      expect(generateAveragePricesFromStocksNegotiations.next().value).toEqual(
        expectedValue,
      );

    expect(
      generateAveragePricesFromStocksNegotiations.next().done,
    ).toBeTruthy();
  });
});
