import Event from '@entities/events/Event';
import Stock from '@entities/stocks/Stock';
import { mock } from 'jest-mock-extended';
import AddEventsToList from 'main/usecases/add_events_to_list';

describe('Add events to list', () => {
  test('should add events', () => {
    const mockStock = mock<Stock>();
    const mockTotalValue = mock<number>();
    const mockUnitPrice = mock<number>();
    const mockEvents: Event[] = [
      new Event({
        date: new Date(2022, 12, 1),
        stock: mockStock,
        quantity: 10,
        type: 'BUY',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      }),
      new Event({
        date: new Date(2022, 12, 3),
        stock: mockStock,
        quantity: 20,
        type: 'SELL',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      }),
    ];

    const eventsAfterInsertion = AddEventsToList(mockEvents, [
      new Event({
        date: new Date(2022, 12, 2),
        stock: mockStock,
        quantity: 10,
        type: 'BUY',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      }),
    ]);

    expect(eventsAfterInsertion).toEqual([
      {
        date: new Date(2022, 12, 1),
        stock: mockStock,
        quantity: 10,
        type: 'BUY',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      },
      {
        date: new Date(2022, 12, 2),
        stock: mockStock,
        quantity: 10,
        type: 'BUY',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      },
      {
        date: new Date(2022, 12, 3),
        stock: mockStock,
        quantity: 20,
        type: 'SELL',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      },
    ]);
  });

  test('should remove buys and sells that have same inserted events date', () => {
    const mockStock = mock<Stock>();
    const mockTotalValue = mock<number>();
    const mockUnitPrice = mock<number>();
    const mockEvents: Event[] = [
      new Event({
        date: new Date(2022, 12, 1),
        stock: mockStock,
        quantity: 10,
        type: 'BUY',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      }),
      new Event({
        date: new Date(2022, 12, 3),
        stock: mockStock,
        quantity: 20,
        type: 'SELL',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      }),
      new Event({
        date: new Date(2022, 12, 3),
        stock: mockStock,
        quantity: 30,
        type: 'SELL',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      }),
    ];

    const eventsAfterInsertion = AddEventsToList(mockEvents, [
      new Event({
        date: new Date(2022, 12, 3),
        stock: mockStock,
        quantity: 10,
        type: 'BUY',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      }),
    ]);

    expect(eventsAfterInsertion).toEqual([
      {
        date: new Date(2022, 12, 1),
        stock: mockStock,
        quantity: 10,
        type: 'BUY',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      },
      {
        date: new Date(2022, 12, 3),
        stock: mockStock,
        quantity: 10,
        type: 'BUY',
        totalValue: mockTotalValue,
        unitPrice: mockUnitPrice,
      },
    ]);
  });
});
