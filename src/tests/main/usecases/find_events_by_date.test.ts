import Event from '@entities/event/event';
import Stock from '@entities/stock/stock';
import { mock } from 'jest-mock-extended';
import EventsRepository from 'main/repositories/events_repository';
import FindEventsByDate from 'main/usecases/find_events_by_date';

describe('Find events by date', () => {
  test('should return events on given date', async () => {
    const mockEventsRepository = mock<EventsRepository>();
    const mockStock = mock<Stock>();
    const mockDate = mock<Date>();
    const mockEvents = mock<Event[]>();
    const findEventsByDate = FindEventsByDate(mockEventsRepository);

    mockEventsRepository.findEventsByDate.mockResolvedValue(mockEvents);
    expect(await findEventsByDate(mockStock, mockDate)).toBe(mockEvents);
    expect(mockEventsRepository.findEventsByDate).toHaveBeenCalledWith(
      mockStock,
      mockDate,
    );
  });
});
