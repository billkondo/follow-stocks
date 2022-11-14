import Price from '@entities/price/price';
import Stock from '@entities/stocks/stock';
import EventJSON from './EventJSON';
import EventType from './EventType';

class Event {
  date: Date;
  price?: Price;
  quantity: number;
  stock: Stock;
  type: EventType;

  constructor({
    date,
    price,
    quantity,
    stock,
    type,
  }: {
    date: Date | string;
    price: Price;
    quantity: number;
    stock: Stock;
    type: EventType;
  }) {
    if (date instanceof Date) {
      this.date = date;
    } else {
      this.date = new Date(date);
    }

    this.price = price;
    this.quantity = quantity;
    this.stock = stock;
    this.type = type;
  }

  toJSON(): EventJSON {
    return {
      date: this.date.toISOString(),
      price: this.price,
      quantity: this.quantity,
      stock: this.stock,
      type: this.type,
    };
  }
}

export default Event;
