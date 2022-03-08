import DomainError from 'domain/domain_error';
import Price from 'domain/price';
import PriceCode from 'domain/price_code';
import Stock from 'domain/stock';
import StockInvested from 'domain/stock_invested';
import StockNegotiation from 'domain/stock_negotiation';
import { mock } from 'jest-mock-extended';
import StocksInvestedRepository from 'main/repositories/stocks_invested_repository';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';
import StocksRepository from 'main/repositories/stocks_repository';
import UnitOfWorkRepository from 'main/repositories/unit_of_work_repository';
import AddStockNegotiations from 'main/usecases/add_stock_negotiations';

describe('Add stock negotiations', () => {
  const setup = () => {
    const mockStocksNegotiationsRepository =
      mock<StocksNegotiationsRepository>();
    const mockStocksRepository = mock<StocksRepository>();
    const mockStocksInvestedRepository = mock<StocksInvestedRepository>();
    const mockUnitOfWorkRepository = mock<UnitOfWorkRepository>();

    mockUnitOfWorkRepository.work.mockImplementation(
      async (callback: () => void) => {
        return callback();
      },
    );

    const addStockNegotiations = AddStockNegotiations({
      stocksNegotiationsRepository: mockStocksNegotiationsRepository,
      stocksRepository: mockStocksRepository,
      stocksInvestedRepository: mockStocksInvestedRepository,
      unitOfWorkRepository: mockUnitOfWorkRepository,
    });

    return {
      addStockNegotiations,
      mockStocksRepository,
      mockStocksNegotiationsRepository,
      mockStocksInvestedRepository,
    };
  };

  test('should throw domain error if stock negotiations are empty', async () => {
    const { addStockNegotiations } = setup();

    await expect(addStockNegotiations([])).rejects.toThrow(
      new DomainError('stock negotiations should not be empty'),
    );
  });

  test('should throw domain error if stock negotiations have different stocks', async () => {
    const { addStockNegotiations } = setup();

    const mockStockNegotiationsFactory = (stock: Stock) => {
      const mockStockNegotiation = mock<StockNegotiation>();
      mockStockNegotiation.stock = stock;

      return mockStockNegotiation;
    };

    await expect(
      addStockNegotiations([
        mockStockNegotiationsFactory({ name: 'A', ticker: 'A11', type: 'FII' }),
        mockStockNegotiationsFactory({ name: 'A', ticker: 'A11', type: 'FII' }),
        mockStockNegotiationsFactory({ name: 'B', ticker: 'B11', type: 'FII' }),
      ]),
    ).rejects.toThrow(
      new DomainError('stock negotiations should have same stock'),
    );
  });

  test('should throw domain error if stock negotiations have different currencies', async () => {
    const { addStockNegotiations } = setup();

    const mockStockNegotiationsFactory = (code: PriceCode) => {
      const mockStockNegotiation = mock<StockNegotiation>();
      const mockPrice = mock<Price>();
      mockPrice.code = code;
      mockStockNegotiation.price = mockPrice;

      return mockStockNegotiation;
    };

    await expect(
      addStockNegotiations([
        mockStockNegotiationsFactory('BRL'),
        mockStockNegotiationsFactory('BRL'),
        mockStockNegotiationsFactory('USD'),
      ]),
    ).rejects.toThrow(
      new DomainError('stock negotiations should have same currency'),
    );
  });

  test('should throw domain error if stock negotiations have different dates', async () => {
    const { addStockNegotiations } = setup();

    const mockStockNegotiationsFactory = (date: Date) => {
      const mockStockNegotiation = mock<StockNegotiation>();
      mockStockNegotiation.date = date;

      return mockStockNegotiation;
    };

    await expect(
      addStockNegotiations([
        mockStockNegotiationsFactory(new Date(2022, 12, 1)),
        mockStockNegotiationsFactory(new Date(2022, 12, 1)),
        mockStockNegotiationsFactory(new Date(2022, 12, 2)),
      ]),
    ).rejects.toThrow(
      new DomainError('stock negotiations should have same date'),
    );
  });

  test('should throw domain error if stock negotiations inserted do not have same currency than previous negotiations', async () => {
    const {
      addStockNegotiations,
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
      addStockNegotiations([
        mockStockNegotiationsFactory('BRL', new Date(2022, 12, 4)),
        mockStockNegotiationsFactory('BRL', new Date(2022, 12, 4)),
      ]),
    ).rejects.toThrow(
      new DomainError(
        'stock negotiations inserted do not have same currency than previous negotiations',
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
      const { addStockNegotiations } = setup();
      const mockStockNegotiation = mock<StockNegotiation>();
      mockStockNegotiation.price = {
        value: price,
        code: 'BRL',
      };
      mockStockNegotiation.date = mock<Date>();

      await expect(
        addStockNegotiations([mockStockNegotiation]),
      ).rejects.toThrow(
        new DomainError('stock negotiations prices should be positive'),
      );
    },
  );

  test.each([-10, 0])(
    'should throw domain error if stock negotiations quantities are not positive',
    async (quantity: number) => {
      const { addStockNegotiations } = setup();
      const mockStockNegotiation = mock<StockNegotiation>();
      mockStockNegotiation.quantity = quantity;
      mockStockNegotiation.date = mock<Date>();

      await expect(
        addStockNegotiations([mockStockNegotiation]),
      ).rejects.toThrow(
        new DomainError('stock negotiations quantities should be positive'),
      );
    },
  );

  test('should throw domain error if negotiations stock does not exist', async () => {
    const { addStockNegotiations, mockStocksRepository } = setup();
    mockStocksRepository.exists.mockResolvedValue(false);
    const mockStock = mock<Stock>();
    const mockStockNegotiation = mock<StockNegotiation>();
    mockStockNegotiation.stock = mockStock;
    mockStockNegotiation.date = mock<Date>();

    await expect(addStockNegotiations([mockStockNegotiation])).rejects.toThrow(
      new DomainError('stock does not exist'),
    );
    expect(mockStocksRepository.exists).toBeCalledWith(mockStock);
  });

  test('should save stock negotiations and stock invested', async () => {
    const {
      addStockNegotiations,
      mockStocksNegotiationsRepository,
      mockStocksRepository,
      mockStocksInvestedRepository,
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

    await addStockNegotiations(mockNewStocksNegotiations);
    expect(mockStocksRepository.exists).toHaveBeenCalledWith(mockStock);
    expect(
      mockStocksNegotiationsRepository.findNegotiationsFromStock,
    ).toHaveBeenCalledWith(mockStock);
    expect(
      mockStocksNegotiationsRepository.saveStockNegotiations,
    ).toHaveBeenCalledWith(mockStock, [
      ...mockStocksNegotiations,
      ...mockNewStocksNegotiations,
    ]);
    expect(mockStocksInvestedRepository.saveStockInvested).toHaveBeenCalledWith(
      {
        averagePrice: {
          value: 112.5,
          code: 'USD',
        },
        quantity: 20,
        stock: mockStock,
        totalInvested: {
          code: 'USD',
          value: 2250,
        },
      } as StockInvested,
    );
  });
});
