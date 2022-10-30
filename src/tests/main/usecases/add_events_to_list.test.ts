import Event from '@entities/event/event';
import Price from '@entities/price/price';
import Stock from '@entities/stocks/stock';
import { mock } from 'jest-mock-extended';
import AddEventsToList from 'main/usecases/add_events_to_list';

describe('Add events to list', () => {
  test('should add events', () => {
    const mockStock = mock<Stock>();
    const mockPrice = mock<Price>();
    const mockEvents: Event[] = [
      {
        date: new Date(2022, 12, 1),
        stock: mockStock,
        price: mockPrice,
        quantity: 10,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 3),
        stock: mockStock,
        price: mockPrice,
        quantity: 20,
        type: 'SELL',
      },
    ];

    const eventsAfterInsertion = AddEventsToList(mockEvents, [
      {
        date: new Date(2022, 12, 2),
        stock: mockStock,
        price: mockPrice,
        quantity: 10,
        type: 'BUY',
      },
    ]);

    expect(eventsAfterInsertion).toEqual([
      {
        date: new Date(2022, 12, 1),
        stock: mockStock,
        price: mockPrice,
        quantity: 10,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 2),
        stock: mockStock,
        price: mockPrice,
        quantity: 10,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 3),
        stock: mockStock,
        price: mockPrice,
        quantity: 20,
        type: 'SELL',
      },
    ]);
  });

  test('should remove buys and sells that have same inserted events date', () => {
    const mockStock = mock<Stock>();
    const mockPrice = mock<Price>();
    const mockEvents: Event[] = [
      {
        date: new Date(2022, 12, 1),
        stock: mockStock,
        price: mockPrice,
        quantity: 10,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 3),
        stock: mockStock,
        price: mockPrice,
        quantity: 20,
        type: 'SELL',
      },
      {
        date: new Date(2022, 12, 3),
        stock: mockStock,
        price: mockPrice,
        quantity: 30,
        type: 'SELL',
      },
    ];

    const eventsAfterInsertion = AddEventsToList(mockEvents, [
      {
        date: new Date(2022, 12, 3),
        stock: mockStock,
        price: mockPrice,
        quantity: 10,
        type: 'BUY',
      },
    ]);

    expect(eventsAfterInsertion).toEqual([
      {
        date: new Date(2022, 12, 1),
        stock: mockStock,
        price: mockPrice,
        quantity: 10,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 3),
        stock: mockStock,
        price: mockPrice,
        quantity: 10,
        type: 'BUY',
      },
    ]);
  });
});
