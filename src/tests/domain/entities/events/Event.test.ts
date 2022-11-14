import Event from '@entities/events/Event';

describe('Event', () => {
  it('should instantiate event', () => {
    const event = new Event({
      date: new Date(2022, 12, 1),
      price: {
        code: 'BRL',
        value: 100.0,
      },
      quantity: 25,
      stock: {
        name: 'HGLG11',
        ticker: 'HGLG11',
        type: 'FII',
      },
      type: 'BUY',
    });

    expect(event.date).toEqual(new Date(2022, 12, 1));
    expect(event.price).toEqual({ code: 'BRL', value: 100.0 });
    expect(event.quantity).toEqual(25);
    expect(event.stock).toEqual({
      name: 'HGLG11',
      ticker: 'HGLG11',
      type: 'FII',
    });
    expect(event.type).toEqual('BUY');
  });

  it('should instantiate event with ISO string', () => {
    const date = new Date(2020, 5, 17);
    const event = new Event({
      date: date.toISOString(),
      price: {
        code: 'BRL',
        value: 125.0,
      },
      quantity: 20,
      stock: {
        name: 'XPLG11',
        ticker: 'XPLG11',
        type: 'FII',
      },
      type: 'SELL',
    });

    expect(event.date).toEqual(date);
    expect(event.price).toEqual({ code: 'BRL', value: 125.0 });
    expect(event.quantity).toEqual(20);
    expect(event.stock).toEqual({
      name: 'XPLG11',
      ticker: 'XPLG11',
      type: 'FII',
    });
    expect(event.type).toEqual('SELL');
  });

  it('should convert event to json format', () => {
    const date = new Date(2017, 5, 21);
    const event = new Event({
      date,
      price: {
        code: 'USD',
        value: 25,
      },
      quantity: 5,
      stock: {
        name: 'ITSA4',
        ticker: 'ITSA4',
        type: 'BR_STOCK',
      },
      type: 'INCOME',
    });

    expect(event.toJSON()).toEqual({
      date: date.toISOString(),
      price: {
        code: 'USD',
        value: 25,
      },
      quantity: 5,
      stock: {
        name: 'ITSA4',
        ticker: 'ITSA4',
        type: 'BR_STOCK',
      },
      type: 'INCOME',
    });
  });

  it('should instantiate event from json', () => {
    const event = new Event({
      date: new Date(2015, 3, 23),
      price: {
        code: 'USD',
        value: 30,
      },
      quantity: 40,
      stock: {
        name: 'STOCK11',
        ticker: 'STOCK',
        type: 'BR_STOCK',
      },
      type: 'BUY',
    });

    expect(event).toStrictEqual(new Event(event.toJSON()));
  });
});
