import DomainError from 'domain/domain_error';
import Stock from 'domain/stock';
import { mock } from 'jest-mock-extended';
import AssertStocksNegotiationsBalanceIsNotNegative from 'main/usecases/assert_stocks_negotiations_balance_is_not_negative';

describe('Assert stocks negotiations balance is not negative', () => {
  test('should throw domain error if quantity becomes negative', () => {
    expect(() =>
      AssertStocksNegotiationsBalanceIsNotNegative([
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
      AssertStocksNegotiationsBalanceIsNotNegative([
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
        value: 2566.67,
        code: 'BRL',
      },
      averagePrice: {
        value: 116.67,
        code: 'BRL',
      },
    });
  });
});
