import Event from '@entities/events/Event';
import EventJSON from '@entities/events/EventJSON';

describe('Event', () => {
  it('should instantiate event', () => {
    const event = new Event({
      date: new Date(2022, 12, 1),
      quantity: 25,
      stock: {
        name: 'HGLG11',
        ticker: 'HGLG11',
        type: 'FII',
        currencyCode: 'BRL',
      },
      type: 'BUY',
      totalValue: 2500.0,
      unitPrice: 100.0,
    });

    expect(event.date).toEqual(new Date(2022, 12, 1));
    expect(event.quantity).toEqual(25);
    expect(event.stock).toEqual({
      name: 'HGLG11',
      ticker: 'HGLG11',
      type: 'FII',
      currencyCode: 'BRL',
    });
    expect(event.type).toEqual('BUY');
    expect(event.totalValue).toEqual(2500.0);
    expect(event.unitPrice).toEqual(100.0);
    expect(event.getCurrencyCode()).toEqual('BRL');
  });

  it('should instantiate event with ISO string', () => {
    const date = new Date(2020, 5, 17);
    const event = new Event({
      date: date.toISOString(),
      quantity: 20,
      stock: {
        name: 'XPLG11',
        ticker: 'XPLG11',
        type: 'FII',
        currencyCode: 'BRL',
      },
      type: 'SELL',
      totalValue: 2500.0,
      unitPrice: 125.0,
    });

    expect(event.date).toEqual(date);
    expect(event.quantity).toEqual(20);
    expect(event.stock).toEqual({
      name: 'XPLG11',
      ticker: 'XPLG11',
      type: 'FII',
      currencyCode: 'BRL',
    });
    expect(event.type).toEqual('SELL');
    expect(event.totalValue).toEqual(2500.0);
    expect(event.unitPrice).toEqual(125.0);
    expect(event.getCurrencyCode()).toEqual('BRL');
  });

  it('should convert event to json format', () => {
    const date = new Date(2017, 5, 21);
    const event = new Event({
      date,
      quantity: 5,
      stock: {
        name: 'ITSA4',
        ticker: 'ITSA4',
        type: 'BR_STOCK',
        currencyCode: 'USD',
      },
      type: 'INCOME',
      totalValue: 125,
      unitPrice: 25,
    });

    expect(event.toJSON()).toEqual({
      date: date.toISOString(),
      quantity: 5,
      stock: {
        name: 'ITSA4',
        ticker: 'ITSA4',
        type: 'BR_STOCK',
        currencyCode: 'USD',
      },
      type: 'INCOME',
      totalValue: 125,
      unitPrice: 25,
    } as EventJSON);
  });

  it('should instantiate event from json', () => {
    const event = new Event({
      date: new Date(2015, 3, 23),
      quantity: 40,
      stock: {
        name: 'STOCK11',
        ticker: 'STOCK',
        type: 'BR_STOCK',
        currencyCode: 'USD',
      },
      type: 'BUY',
      totalValue: 1200,
      unitPrice: 30,
    });

    expect(event).toStrictEqual(new Event(event.toJSON()));
  });
});
