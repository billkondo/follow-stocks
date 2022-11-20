import Event from '@entities/events/Event';
import Stock from '@entities/stocks/Stock';
import DomainError from '@errors/domain_error';
import { mock } from 'jest-mock-extended';
import AssertEventsBalanceIsNotNegative from 'main/usecases/assert_events_balance_is_not_negative';

describe('Assert events balance is not negative', () => {
  test('should throw domain error if quantity becomes negative', () => {
    expect(() =>
      AssertEventsBalanceIsNotNegative([
        new Event({
          date: new Date(2022, 12, 1),
          quantity: 20,
          stock: mock<Stock>(),
          type: 'BUY',
          totalValue: 2000,
          unitPrice: 100,
        }),
        new Event({
          date: new Date(2022, 12, 2),
          quantity: 30,
          stock: mock<Stock>(),
          type: 'SELL',
          totalValue: 3000,
          unitPrice: 100,
        }),
      ]),
    ).toThrow(new DomainError('total quantity should be greater than zero'));
  });

  test('should return stock invested data', () => {
    const mockStock = mock<Stock>();

    expect(
      AssertEventsBalanceIsNotNegative([
        new Event({
          date: new Date(2022, 12, 1),
          quantity: 20,
          stock: mockStock,
          type: 'BUY',
          totalValue: 2000,
          unitPrice: 100,
        }),
        new Event({
          date: new Date(2022, 12, 4),
          quantity: 10,
          stock: mockStock,
          type: 'BUY',
          totalValue: 1500,
          unitPrice: 150,
        }),
        new Event({
          date: new Date(2022, 12, 7),
          quantity: 8,
          stock: mockStock,
          type: 'SELL',
          totalValue: 960,
          unitPrice: 120,
        }),
      ]),
    ).toEqual({
      stock: mockStock,
      quantity: 22,
      totalInvested: 2566.6667,
      averagePrice: 116.6667,
    });
  });
});
