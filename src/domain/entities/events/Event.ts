import CurrencyCode from '@entities/currencies/CurrencyCode';
import Stock from '@entities/stocks/Stock';
import EventJSON from './EventJSON';
import EventType from './EventType';

class Event {
  date: Date;
  quantity: number;
  stock: Stock;
  totalValue: number;
  type: EventType;
  unitPrice: number;

  constructor({
    date,
    quantity,
    stock,
    type,
    totalValue,
    unitPrice,
  }: {
    date: Date | string;
    quantity: number;
    stock: Stock;
    type: EventType;
    totalValue: number;
    unitPrice: number;
  }) {
    if (date instanceof Date) {
      this.date = date;
    } else {
      this.date = new Date(date);
    }

    this.quantity = quantity;
    this.stock = stock;
    this.type = type;
    this.totalValue = totalValue;
    this.unitPrice = unitPrice;
  }

  getCurrencyCode(): CurrencyCode {
    return this.stock.currencyCode;
  }

  toJSON(): EventJSON {
    return {
      date: this.date.toISOString(),
      quantity: this.quantity,
      stock: this.stock,
      type: this.type,
      totalValue: this.totalValue,
      unitPrice: this.unitPrice,
    };
  }
}

export default Event;
