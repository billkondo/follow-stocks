import Event from '@entities/events/Event';
import EventType from '@entities/events/EventType';
import Stock from '@entities/stocks/Stock';
import StockPosition from '@entities/stocks/stock_position';
import DomainError from '@errors/domain_error';
import { mock } from 'jest-mock-extended';

describe('Stock position', () => {
  const mockStock: Stock = {
    currencyCode: 'BRL',
    name: 'XPLG Stock',
    ticker: 'XPLG11',
    type: 'FII',
  };

  it('should create stock position with default values', () => {
    const stockPosition = new StockPosition({
      stock: mockStock,
    });

    assertStockPosition(stockPosition, {
      averagePrice: 0.0,
      quantity: 0.0,
      stock: mockStock,
      totalInvested: 0.0,
    });
  });

  it('should create stock position with parameters', () => {
    const stockPosition = new StockPosition({
      averagePrice: 125.0,
      quantity: 100,
      stock: mockStock,
      totalInvested: 15000,
    });

    assertStockPosition(stockPosition, {
      averagePrice: 125.0,
      quantity: 100.0,
      stock: mockStock,
      totalInvested: 15000,
    });
  });

  it('should throw domain error if stock position is updated with event from different stock', () => {
    const stockPosition = new StockPosition({
      stock: mockStock,
    });
    const mockEvent = mock<Event>();

    expect(() => stockPosition.updateWithEvent(mockEvent)).toThrow(
      new DomainError('Event from different stock'),
    );
  });

  test.each([
    ['bonus', 'BONUS'],
    ['buy', 'BUY'],
    ['subscription', 'SUBSCRIPTION'],
  ])(
    'should update stock position with %s event',
    (_, eventType: EventType) => {
      const stockPosition = new StockPosition({
        averagePrice: 100.0,
        quantity: 10.0,
        stock: mockStock,
        totalInvested: 1000.0,
      });
      const event: Event = new Event({
        date: new Date(2022, 12, 25),
        quantity: 10,
        stock: mockStock,
        type: eventType,
        totalValue: null,
        unitPrice: 200,
      });

      stockPosition.updateWithEvent(event);
      assertStockPosition(stockPosition, {
        averagePrice: 150.0,
        quantity: 20,
        stock: mockStock,
        totalInvested: 3000.0,
      });
    },
  );

  it('should update stock position with sell event', () => {
    const stockPosition = new StockPosition({
      averagePrice: 125.0,
      quantity: 50,
      stock: mockStock,
      totalInvested: 5000.0,
    });
    const event: Event = new Event({
      date: new Date(2022, 25, 10),
      quantity: 20,
      stock: mockStock,
      type: 'SELL',
      totalValue: null,
      unitPrice: 100.0,
    });

    stockPosition.updateWithEvent(event);
    assertStockPosition(stockPosition, {
      averagePrice: 125.0,
      quantity: 30,
      stock: mockStock,
      totalInvested: 2500.0,
    });
  });

  it('should reset stock position when stock is completely sold', () => {
    const stockPosition = new StockPosition({
      averagePrice: 99.0,
      quantity: 50,
      stock: mockStock,
      totalInvested: 5000.0,
    });
    const event: Event = new Event({
      date: new Date(2019, 10, 5),
      quantity: 50,
      stock: mockStock,
      type: 'SELL',
      totalValue: null,
      unitPrice: 57.0,
    });

    stockPosition.updateWithEvent(event);
    assertStockPosition(stockPosition, {
      averagePrice: 0.0,
      quantity: 0,
      stock: mockStock,
      totalInvested: 0.0,
    });
  });

  it('should update stock with unfolding event', () => {
    const stockPosition = new StockPosition({
      averagePrice: 100.0,
      quantity: 25,
      stock: mockStock,
      totalInvested: 5000.0,
    });
    const event: Event = new Event({
      date: new Date(2016, 5, 17),
      quantity: 100,
      stock: mockStock,
      type: 'UNFOLDING',
      totalValue: null,
      unitPrice: 0.0,
    });

    stockPosition.updateWithEvent(event);
    assertStockPosition(stockPosition, {
      averagePrice: 40.0,
      quantity: 125,
      stock: mockStock,
      totalInvested: 5000.0,
    });
  });
});

const assertStockPosition = (
  stockPosition: StockPosition,
  {
    averagePrice,
    quantity,
    stock,
    totalInvested,
  }: {
    averagePrice: number;
    quantity: number;
    stock: Stock;
    totalInvested: number;
  },
) => {
  expect(stockPosition.averagePrice).toBe(averagePrice);
  expect(stockPosition.quantity).toBe(quantity);
  expect(stockPosition.stock).toBe(stock);
  expect(stockPosition.totalInvested).toBe(totalInvested);
};
