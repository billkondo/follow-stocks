import DomainError from 'domain/domain_error';
import Price from 'domain/price';
import PriceCode from 'domain/price_code';
import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import { mock } from 'jest-mock-extended';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';
import StocksRepository from 'main/repositories/stocks_repository';
import AddStocksNegotiations from 'main/usecases/add_stocks_negotiations';

describe('Add stocks negotiations', () => {
  const setup = () => {
    const mockStocksNegotiationsRepository =
      mock<StocksNegotiationsRepository>();
    const mockStocksRepository = mock<StocksRepository>();

    const addStocksNegotiations = AddStocksNegotiations({
      stocksNegotiationsRepository: mockStocksNegotiationsRepository,
      stocksRepository: mockStocksRepository,
    });

    return {
      addStocksNegotiations,
      mockStocksRepository,
      mockStocksNegotiationsRepository,
    };
  };

  test('should throw domain error if stocks negotiations are empty', async () => {
    const { addStocksNegotiations } = setup();

    await expect(addStocksNegotiations([])).rejects.toThrow(
      new DomainError('stocks negotiations should not be empty'),
    );
  });

  test('should throw domain error if stocks negotiations have different stocks', async () => {
    const { addStocksNegotiations } = setup();

    const mockStockNegotiationsFactory = (stock: Stock) => {
      const mockStockNegotiation = mock<StockNegotiation>();
      mockStockNegotiation.stock = stock;

      return mockStockNegotiation;
    };

    await expect(
      addStocksNegotiations([
        mockStockNegotiationsFactory({ name: 'A', ticker: 'A11' }),
        mockStockNegotiationsFactory({ name: 'A', ticker: 'A11' }),
        mockStockNegotiationsFactory({ name: 'B', ticker: 'B11' }),
      ]),
    ).rejects.toThrow(
      new DomainError('stocks negotiations should have same stock'),
    );
  });

  test('should throw domain error if stocks negotiations have different currencies', async () => {
    const { addStocksNegotiations } = setup();

    const mockStockNegotiationsFactory = (code: PriceCode) => {
      const mockStockNegotiation = mock<StockNegotiation>();
      const mockPrice = mock<Price>();
      mockPrice.code = code;
      mockStockNegotiation.price = mockPrice;

      return mockStockNegotiation;
    };

    await expect(
      addStocksNegotiations([
        mockStockNegotiationsFactory('BRL'),
        mockStockNegotiationsFactory('BRL'),
        mockStockNegotiationsFactory('USD'),
      ]),
    ).rejects.toThrow(
      new DomainError('stocks negotiations should have same currency'),
    );
  });

  test('should throw domain error if stocks negotiations inserted do not have same currency than previous negotiations', async () => {
    const {
      addStocksNegotiations,
      mockStocksRepository,
      mockStocksNegotiationsRepository,
    } = setup();
    const mockStock = mock<Stock>();

    const mockStockNegotiationsFactory = (code: PriceCode, date: Date) => {
      const mockStockNegotiation = mock<StockNegotiation>();
      const mockPrice = mock<Price>();
      mockPrice.code = code;
      mockStockNegotiation.price = mockPrice;
      mockStockNegotiation.stock = mockStock;
      mockStockNegotiation.date = date;

      return mockStockNegotiation;
    };

    mockStocksRepository.exists.mockResolvedValue(true);
    mockStocksNegotiationsRepository.findNegotiationsFromStock.mockResolvedValue(
      [
        mockStockNegotiationsFactory('USD', new Date(2022, 12, 1)),
        mockStockNegotiationsFactory('USD', new Date(2022, 12, 2)),
        mockStockNegotiationsFactory('USD', new Date(2022, 12, 5)),
      ],
    );

    await expect(
      addStocksNegotiations([
        mockStockNegotiationsFactory('BRL', new Date(2022, 12, 3)),
        mockStockNegotiationsFactory('BRL', new Date(2022, 12, 4)),
      ]),
    ).rejects.toThrow(
      new DomainError(
        'stocks negotiations inserted do not have same currency than previous negotiations',
      ),
    );

    expect(mockStocksRepository.exists).toBeCalledWith(mockStock);
    expect(
      mockStocksNegotiationsRepository.findNegotiationsFromStock,
    ).toBeCalledWith(mockStock);
  });

  test.each([-10, 0])(
    'should throw domain error if stock negotiations prices are not positive',
    async (price: number) => {
      const { addStocksNegotiations } = setup();
      const mockStockNegotiation = mock<StockNegotiation>();
      mockStockNegotiation.price = {
        value: price,
        code: 'BRL',
      };

      await expect(
        addStocksNegotiations([mockStockNegotiation]),
      ).rejects.toThrow(
        new DomainError('stock negotiations prices should be positive'),
      );
    },
  );

  test.each([-10, 0])(
    'should throw domain error if stock negotiations quantities are not positive',
    async (quantity: number) => {
      const { addStocksNegotiations } = setup();
      const mockStockNegotiation = mock<StockNegotiation>();
      mockStockNegotiation.quantity = quantity;

      await expect(
        addStocksNegotiations([mockStockNegotiation]),
      ).rejects.toThrow(
        new DomainError('stock negotiations quantities should be positive'),
      );
    },
  );

  test('should throw domain error if negotiations stock does not exist', async () => {
    const { addStocksNegotiations, mockStocksRepository } = setup();
    mockStocksRepository.exists.mockResolvedValue(false);
    const mockStock = mock<Stock>();
    const mockStockNegotiation = mock<StockNegotiation>();
    mockStockNegotiation.stock = mockStock;

    await expect(addStocksNegotiations([mockStockNegotiation])).rejects.toThrow(
      new DomainError('stock does not exist'),
    );
    expect(mockStocksRepository.exists).toBeCalledWith(mockStock);
  });

  test('should save stocks negotiations', async () => {
    const {
      addStocksNegotiations,
      mockStocksNegotiationsRepository,
      mockStocksRepository,
    } = setup();
    const mockStock = mock<Stock>();
    const mockStocksNegotiations: StockNegotiation[] = [
      {
        date: new Date(2022, 12, 1),
        price: {
          value: 100,
          code: 'USD',
        },
        quantity: 20,
        stock: mockStock,
        type: 'BUY',
      },
      {
        date: new Date(2022, 12, 2),
        price: {
          value: 150,
          code: 'USD',
        },
        quantity: 10,
        stock: mockStock,
        type: 'SELL',
      },
    ];
    const mockNewStocksNegotiations: StockNegotiation[] = [
      {
        date: new Date(2022, 12, 3),
        price: {
          value: 125,
          code: 'USD',
        },
        quantity: 10,
        stock: mockStock,
        type: 'BUY',
      },
    ];

    mockStocksRepository.exists.mockResolvedValue(true);
    mockStocksNegotiationsRepository.findNegotiationsFromStock.mockResolvedValue(
      mockStocksNegotiations,
    );

    await addStocksNegotiations(mockNewStocksNegotiations);
    expect(mockStocksRepository.exists).toHaveBeenCalledWith(mockStock);
    expect(
      mockStocksNegotiationsRepository.findNegotiationsFromStock,
    ).toHaveBeenCalledWith(mockStock);
    expect(
      mockStocksNegotiationsRepository.saveNegotiations,
    ).toHaveBeenCalledWith([
      ...mockStocksNegotiations,
      ...mockNewStocksNegotiations,
    ]);
  });
});
