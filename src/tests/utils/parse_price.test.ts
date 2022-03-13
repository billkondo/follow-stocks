import parsePrice from 'utils/parse_price';

describe('Parse price', () => {
  test.each([
    ['1.24', 1.24],
    ['254.34', 254.34],
    ['-12', NaN],
    ['0.42', 0.42],
    ['2.234.523', NaN],
    ['02/02/22', NaN],
    ['not a price', NaN],
    ['hi 0.34 nice!', NaN],
    ['3.235', NaN],
    ['3.5', NaN],
    ['001.34', 1.34],
    ['', NaN],
  ])('should parse price', (price: string, expectedPrice: number) => {
    expect(parsePrice(price)).toEqual(expectedPrice);
  });
});
