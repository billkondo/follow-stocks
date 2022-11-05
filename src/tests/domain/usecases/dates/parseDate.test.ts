import parseDate from '@usecases/dates/parseDate';

describe('Parse date', () => {
  it('should parse date with default format', () => {
    const date = new Date(2021, 10, 5);
    const parsedDate = parseDate('05/11/2021');

    expect(parsedDate).toMatchObject(date);
  });

  it('should parse date with custom format', () => {
    const date = new Date(2017, 0, 17);
    const parsedDate = parseDate('2017-01-17', 'yyyy-mm-dd');

    expect(parsedDate).toMatchObject(date);
  });
});
