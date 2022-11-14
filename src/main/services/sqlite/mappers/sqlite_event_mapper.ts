import Event from '@entities/event/event';
import Price from '@entities/price/price';
import PriceCode from '@entities/price/price_code';
import SqliteEventModel from '@services/sqlite/models/sqlite_event_model';

class SqliteEventMapper {
  static toModel(event: Event): SqliteEventModel {
    const { price, date, quantity, stock, type } = event;

    let priceValue: number;
    let priceCode: PriceCode;

    if (price) {
      priceValue = price.value;
      priceCode = price.code;
    }

    return {
      date: date.toISOString(),
      quantity,
      price_value: priceValue,
      price_code: priceCode,
      stock_name: stock.name,
      stock_ticker: stock.ticker,
      stock_type: stock.type,
      type,
    };
  }

  static fromModel(event: SqliteEventModel): Event {
    const {
      date,
      price_code,
      price_value,
      quantity,
      stock_name,
      stock_ticker,
      stock_type,
      type,
    } = event;

    let price: Price = null;
    if (price_code && price_value !== null) {
      price = {
        code: price_code,
        value: price_value,
      };
    }

    return {
      date: new Date(date),
      price,
      quantity,
      stock: {
        name: stock_name,
        ticker: stock_ticker,
        type: stock_type,
      },
      type,
    };
  }
}

export default SqliteEventMapper;
