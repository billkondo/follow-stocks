import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';
import EventsRepository from '@repositories/events_repository';
import { mock } from 'jest-mock-extended';
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
