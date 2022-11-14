import stringifyDate from '@usecases/dates/stringifyDate';

describe('Stringify date', () => {
  it('should stringify date with default format', () => {
    const date = new Date(2017, 11, 31);
    const stringifiedDate = stringifyDate(date);

    expect(stringifiedDate).toBe('31/12/2017');
  });

  it('should stringify date with default format', () => {
    const date = new Date(2017, 5, 9);
    const stringifiedDate = stringifyDate(date);

    expect(stringifiedDate).toBe('09/06/2017');
  });

  it('should stringify date with custom format', () => {
    const date = new Date(2015, 0, 15);
    const stringifiedDate = stringifyDate(date, 'yyyy-mm-dd');

    expect(stringifiedDate).toBe('2015-01-15');
  });
});
