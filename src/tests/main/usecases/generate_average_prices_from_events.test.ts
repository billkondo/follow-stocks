import Event from '@entities/events/Event';
import Stock from '@entities/stocks/Stock';
import StockInvested from '@entities/stock_invested/stock_invested';
import { mock } from 'jest-mock-extended';
import GenerateAveragePricesFromEvents from 'main/usecases/generate_average_prices_from_events';

describe('Generate average prices from events', () => {
  const runTest = (
    events: Event[],
    expectedStocksInvested: StockInvested[],
  ) => {
    const generateAveragePricesFromEvents =
      GenerateAveragePricesFromEvents(events);

    for (const expectedValue of expectedStocksInvested) {
      expect(generateAveragePricesFromEvents.next().value).toEqual(
        expectedValue,
      );
    }

    expect(generateAveragePricesFromEvents.next().done).toBeTruthy();
  };

  test('should generate average price, total invested and total quantity', () => {
    const mockStock = mock<Stock>();
    const mockEvents: Event[] = [
      new Event({
        date: new Date(2019, 7, 22),
        quantity: 4,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 23.33,
      }),
      new Event({
        date: new Date(2019, 7, 26),
        quantity: 4,
        stock: mockStock,
        type: 'SELL',
        totalValue: null,
        unitPrice: 24.0,
      }),
      new Event({
        date: new Date(2019, 9, 19),
        quantity: 100,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 24.46,
      }),
      new Event({
        date: new Date(2019, 9, 25),
        quantity: 100,
        stock: mockStock,
        type: 'SELL',
        totalValue: null,
        unitPrice: 25.46,
      }),
      new Event({
        date: new Date(2019, 11, 12),
        quantity: 52,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 25.81,
      }),
      new Event({
        date: new Date(2019, 11, 18),
        quantity: 33,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 26.92,
      }),
      new Event({
        date: new Date(2019, 11, 18),
        quantity: 32,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 26.93,
      }),
      new Event({
        date: new Date(2020, 3, 6),
        quantity: 48,
        stock: mockStock,
        type: 'SELL',
        totalValue: null,
        unitPrice: 28.09,
      }),
      new Event({
        date: new Date(2020, 3, 20),
        quantity: 14,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 20.03,
      }),
    ];
    const expectedValues: StockInvested[] = [
      {
        stock: mockStock,
        quantity: 4,
        averagePrice: 23.33,
        totalInvested: 93.32,
      },
      {
        stock: mockStock,
        quantity: 0,
        averagePrice: 0,
        totalInvested: 0,
      },
      {
        stock: mockStock,
        quantity: 100,
        averagePrice: 24.46,
        totalInvested: 2446.0,
      },
      {
        stock: mockStock,
        quantity: 0,
        averagePrice: 0,
        totalInvested: 0,
      },
      {
        stock: mockStock,
        quantity: 52,
        averagePrice: 25.81,
        totalInvested: 1342.12,
      },
      {
        stock: mockStock,
        quantity: 85,
        averagePrice: 26.2409,
        totalInvested: 2230.48,
      },
      {
        stock: mockStock,
        quantity: 117,
        averagePrice: 26.4294,
        totalInvested: 3092.24,
      },
      {
        stock: mockStock,
        quantity: 69,
        averagePrice: 26.4294,
        totalInvested: 1823.6287,
      },
      {
        stock: mockStock,
        quantity: 83,
        averagePrice: 25.35,
        totalInvested: 2104.0487,
      },
    ];

    runTest(mockEvents, expectedValues);
  });

  describe('should deal with floating precision', () => {
    const mockStock = mock<Stock>();
    const mockEvents: Event[] = [
      new Event({
        date: new Date(2022, 12, 1),
        quantity: 1,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 0.1,
      }),
      new Event({
        date: new Date(2022, 12, 1),
        quantity: 1,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 0.2,
      }),
      new Event({
        date: new Date(2022, 12, 1),
        quantity: 1,
        stock: mockStock,
        type: 'SELL',
        totalValue: null,
        unitPrice: 0.4,
      }),
    ];
    const expectedValues: StockInvested[] = [
      {
        stock: mockStock,
        totalInvested: 0.1,
        averagePrice: 0.1,
        quantity: 1,
      },
      {
        stock: mockStock,
        totalInvested: 0.3,
        averagePrice: 0.15,
        quantity: 2,
      },
      {
        stock: mockStock,
        totalInvested: 0.15,
        averagePrice: 0.15,
        quantity: 1,
      },
    ];

    runTest(mockEvents, expectedValues);
  });

  test('should reset average price if all stocks are sold', () => {
    const mockStock = mock<Stock>();
    const mockEvents: Event[] = [
      new Event({
        date: new Date(2022, 12, 1),
        quantity: 0.5,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 120,
      }),
      new Event({
        date: new Date(2022, 12, 2),
        quantity: 0.25,
        stock: mockStock,
        type: 'SELL',
        totalValue: null,
        unitPrice: 125,
      }),
      new Event({
        date: new Date(2022, 12, 3),
        quantity: 0.25,
        stock: mockStock,
        type: 'SELL',
        totalValue: null,
        unitPrice: 140,
      }),
      new Event({
        date: new Date(2022, 12, 1),
        quantity: 0.5,
        stock: mockStock,
        type: 'BUY',
        totalValue: null,
        unitPrice: 100,
      }),
    ];
    const expectedValues: StockInvested[] = [
      {
        averagePrice: 120,
        quantity: 0.5,
        stock: mockStock,
        totalInvested: 60,
      },
      {
        averagePrice: 120,
        quantity: 0.25,
        stock: mockStock,
        totalInvested: 30,
      },
      {
        averagePrice: 0,
        quantity: 0,
        stock: mockStock,
        totalInvested: 0,
      },
      {
        averagePrice: 100,
        quantity: 0.5,
        stock: mockStock,
        totalInvested: 50,
      },
    ];

    runTest(mockEvents, expectedValues);
  });
});
