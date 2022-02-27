import Price from 'domain/price';
import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import { mock } from 'jest-mock-extended';
import AddStocksNegotiationsToList from 'main/usecases/add_stocks_negotiations_to_list';

describe('Add stocks negotiations to list', () => {
  test('should add stocks negotiations', () => {
    const mockStock = mock<Stock>();
    const mockPrice = mock<Price>();
    const mockStocksNegotiations: StockNegotiation[] = [
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

    const stocksNegotiationsAfterInsertion = AddStocksNegotiationsToList(
      mockStocksNegotiations,
      [
        {
          date: new Date(2022, 12, 2),
          stock: mockStock,
          price: mockPrice,
          quantity: 10,
          type: 'BUY',
        },
      ],
    );

    expect(stocksNegotiationsAfterInsertion).toEqual([
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

  test('should remove buys and sells that have same new inserted negotiations date', () => {
    const mockStock = mock<Stock>();
    const mockPrice = mock<Price>();
    const mockStocksNegotiations: StockNegotiation[] = [
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

    const stocksNegotiationsAfterInsertion = AddStocksNegotiationsToList(
      mockStocksNegotiations,
      [
        {
          date: new Date(2022, 12, 3),
          stock: mockStock,
          price: mockPrice,
          quantity: 10,
          type: 'BUY',
        },
      ],
    );

    expect(stocksNegotiationsAfterInsertion).toEqual([
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
