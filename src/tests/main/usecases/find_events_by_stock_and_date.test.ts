import Event from '@entities/events/Event';
import Stock from '@entities/stocks/Stock';
import EventsRepository from '@repositories/events_repository';
import { mock } from 'jest-mock-extended';
import FindEventsByStockAndDate from 'main/usecases/find_events_by_stock_and_date';

describe('Find events by stock and date', () => {
  test('should return stock events on given date', async () => {
    const mockEventsRepository = mock<EventsRepository>();
    const mockStock = mock<Stock>();
    const mockDate = mock<Date>();
    const mockEvents = mock<Event[]>();
    const findEventsByStockAndDate =
      FindEventsByStockAndDate(mockEventsRepository);

    mockEventsRepository.findEventsByStockAndDate.mockResolvedValue(mockEvents);
    expect(await findEventsByStockAndDate(mockStock, mockDate)).toBe(
      mockEvents,
    );
    expect(mockEventsRepository.findEventsByStockAndDate).toHaveBeenCalledWith(
      mockStock,
      mockDate,
    );
  });
});
