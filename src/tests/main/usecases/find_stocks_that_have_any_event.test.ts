import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';
import { mock } from 'jest-mock-extended';
import EventsRepository from 'main/repositories/events_repository';
import FindStocksThatHaveAnyEvent from 'main/usecases/find_stocks_that_have_any_event';

describe('Find stocks that have any event', () => {
  test('should find stocks that have any event', async () => {
    const mockEventsRepository = mock<EventsRepository>();
    const mockStockType = mock<StockType>();
    const findStocksThatHaveAnyEvent =
      FindStocksThatHaveAnyEvent(mockEventsRepository);
    const mockStocks = mock<Stock[]>();

    mockEventsRepository.findStocksThatHaveAnyEvent.mockResolvedValue(
      mockStocks,
    );
    await expect(findStocksThatHaveAnyEvent(mockStockType)).resolves.toBe(
      mockStocks,
    );
    expect(mockEventsRepository.findStocksThatHaveAnyEvent).toBeCalledWith(
      mockStockType,
    );
  });
});