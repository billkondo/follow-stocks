import Stock from '@entities/stock/stock';
import DomainError from '@errors/domain_error';
import { mock } from 'jest-mock-extended';
import AssertEventsBalanceIsNotNegative from 'main/usecases/assert_events_balance_is_not_negative';

describe('Assert events balance is not negative', () => {
  test('should throw domain error if quantity becomes negative', () => {
    expect(() =>
      AssertEventsBalanceIsNotNegative([
        {
          date: new Date(2022, 12, 1),
          price: {
            code: 'BRL',
            value: 100,
          },
          quantity: 20,
          stock: mock<Stock>(),
          type: 'BUY',
        },
        {
          date: new Date(2022, 12, 2),
          price: {
            code: 'BRL',
            value: 100,
          },
          quantity: 30,
          stock: mock<Stock>(),
          type: 'SELL',
        },
      ]),
    ).toThrow(new DomainError('total quantity should be greater than zero'));
  });

  test('should return stock invested data', () => {
    const mockStock = mock<Stock>();

    expect(
      AssertEventsBalanceIsNotNegative([
        {
          date: new Date(2022, 12, 1),
          price: {
            code: 'BRL',
            value: 100,
          },
          quantity: 20,
          stock: mockStock,
          type: 'BUY',
        },
        {
          date: new Date(2022, 12, 4),
          price: {
            code: 'BRL',
            value: 150,
          },
          quantity: 10,
          stock: mockStock,
          type: 'BUY',
        },
        {
          date: new Date(2022, 12, 7),
          price: {
            code: 'BRL',
            value: 120,
          },
          quantity: 8,
          stock: mockStock,
          type: 'SELL',
        },
      ]),
    ).toEqual({
      stock: mockStock,
      quantity: 22,
      totalInvested: {
        value: 2566.6667,
        code: 'BRL',
      },
      averagePrice: {
        value: 116.6667,
        code: 'BRL',
      },
    });
  });
});
