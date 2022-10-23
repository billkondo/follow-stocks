import Event from '@entities/event/event';
import Price from '@entities/price/price';
import PriceCode from '@entities/price/price_code';
import Stock from '@entities/stock/stock';
import StockInvested from '@entities/stock_invested/stock_invested';
import DomainError from '@errors/domain_error';
import EventsRepository from '@repositories/events_repository';
import StocksInvestedRepository from '@repositories/stocks_invested_repository';
import StocksRepository from '@repositories/stocks_repository';
import UnitOfWorkRepository from '@repositories/unit_of_work_repository';
import { mock } from 'jest-mock-extended';
import AddEvents from 'main/usecases/add_events';

describe('Add events', () => {
  const setup = () => {
    const mockEventsRepository = mock<EventsRepository>();
    const mockStocksRepository = mock<StocksRepository>();
    const mockStocksInvestedRepository = mock<StocksInvestedRepository>();
    const mockUnitOfWorkRepository = mock<UnitOfWorkRepository>();

    mockUnitOfWorkRepository.work.mockImplementation(
      async (callback: () => void) => {
        return callback();
      },
    );

    const addEvents = AddEvents({
      eventsRepository: mockEventsRepository,
      stocksRepository: mockStocksRepository,
      stocksInvestedRepository: mockStocksInvestedRepository,
      unitOfWorkRepository: mockUnitOfWorkRepository,
    });

    return {
      addEvents,
      mockStocksRepository,
      mockEventsRepository,
      mockStocksInvestedRepository,
    };
  };

  test('should throw domain error if events are empty', async () => {
    const { addEvents } = setup();

    await expect(addEvents([])).rejects.toThrow(
      new DomainError('events should not be empty'),
    );
  });

  test('should throw domain error if events have different stocks', async () => {
    const { addEvents } = setup();

    const mockEventsFactory = (stock: Stock) => {
      const mockEvent = mock<Event>();
      mockEvent.stock = stock;

      return mockEvent;
    };

    await expect(
      addEvents([
        mockEventsFactory({ name: 'A', ticker: 'A11', type: 'FII' }),
        mockEventsFactory({ name: 'A', ticker: 'A11', type: 'FII' }),
        mockEventsFactory({ name: 'B', ticker: 'B11', type: 'FII' }),
      ]),
    ).rejects.toThrow(new DomainError('events should have same stock'));
  });

  test('should throw domain error if events have different currencies', async () => {
    const { addEvents } = setup();

    const mockEventsFactory = (code: PriceCode) => {
      const mockEvent = mock<Event>();
      const mockPrice = mock<Price>();
      mockPrice.code = code;
      mockEvent.price = mockPrice;

      return mockEvent;
    };

    await expect(
      addEvents([
        mockEventsFactory('BRL'),
        mockEventsFactory('BRL'),
        mockEventsFactory('USD'),
      ]),
    ).rejects.toThrow(new DomainError('events should have same currency'));
  });

  test('should throw domain error if events have different dates', async () => {
    const { addEvents } = setup();

    const mockEventsFactory = (date: Date) => {
      const mockEvent = mock<Event>();
      mockEvent.date = date;

      return mockEvent;
    };

    await expect(
      addEvents([
        mockEventsFactory(new Date(2022, 12, 1)),
        mockEventsFactory(new Date(2022, 12, 1)),
        mockEventsFactory(new Date(2022, 12, 2)),
      ]),
    ).rejects.toThrow(new DomainError('events should have same date'));
  });

  test('should throw domain error if events inserted do not have same currency than previous events', async () => {
    const { addEvents, mockStocksRepository, mockEventsRepository } = setup();
    const mockStock = mock<Stock>();

    const mockEventsFactory = (code: PriceCode, date: Date) => {
      const mockEvent = mock<Event>();
      const mockPrice = mock<Price>();
      mockPrice.code = code;
      mockEvent.price = mockPrice;
      mockEvent.stock = mockStock;
      mockEvent.date = date;

      return mockEvent;
    };

    mockStocksRepository.exists.mockResolvedValue(true);
    mockEventsRepository.findEventsByStock.mockResolvedValue([
      mockEventsFactory('USD', new Date(2022, 12, 1)),
      mockEventsFactory('USD', new Date(2022, 12, 2)),
      mockEventsFactory('USD', new Date(2022, 12, 5)),
    ]);

    await expect(
      addEvents([
        mockEventsFactory('BRL', new Date(2022, 12, 4)),
        mockEventsFactory('BRL', new Date(2022, 12, 4)),
      ]),
    ).rejects.toThrow(
      new DomainError(
        'events inserted do not have same currency than previous events',
      ),
    );

    expect(mockStocksRepository.exists).toBeCalledWith(mockStock);
    expect(mockEventsRepository.findEventsByStock).toBeCalledWith(mockStock);
  });

  test.each([-10, 0])(
    'should throw domain error if events prices are not positive',
    async (price: number) => {
      const { addEvents } = setup();
      const mockEvent = mock<Event>();
      mockEvent.price = {
        value: price,
        code: 'BRL',
      };
      mockEvent.date = mock<Date>();

      await expect(addEvents([mockEvent])).rejects.toThrow(
        new DomainError('events prices should be positive'),
      );
    },
  );

  test.each([-10, 0])(
    'should throw domain error if events quantities are not positive',
    async (quantity: number) => {
      const { addEvents } = setup();
      const mockEvent = mock<Event>();
      mockEvent.quantity = quantity;
      mockEvent.date = mock<Date>();

      await expect(addEvents([mockEvent])).rejects.toThrow(
        new DomainError('events quantities should be positive'),
      );
    },
  );

  test('should throw domain error if events stock does not exist', async () => {
    const { addEvents, mockStocksRepository } = setup();
    mockStocksRepository.exists.mockResolvedValue(false);
    const mockStock = mock<Stock>();
    const mockEvent = mock<Event>();
    mockEvent.stock = mockStock;
    mockEvent.date = mock<Date>();

    await expect(addEvents([mockEvent])).rejects.toThrow(
      new DomainError('stock does not exist'),
    );
    expect(mockStocksRepository.exists).toBeCalledWith(mockStock);
  });

  test('should save events and stock invested', async () => {
    const {
      addEvents,
      mockEventsRepository,
      mockStocksRepository,
      mockStocksInvestedRepository,
    } = setup();
    const mockStock = mock<Stock>();
    const mockStocksEvents: Event[] = [
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
    const mockNewStocksEvents: Event[] = [
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
    mockEventsRepository.findEventsByStock.mockResolvedValue(mockStocksEvents);

    await addEvents(mockNewStocksEvents);
    expect(mockStocksRepository.exists).toHaveBeenCalledWith(mockStock);
    expect(mockEventsRepository.findEventsByStock).toHaveBeenCalledWith(
      mockStock,
    );
    expect(mockEventsRepository.saveEvents).toHaveBeenCalledWith(mockStock, [
      ...mockStocksEvents,
      ...mockNewStocksEvents,
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
