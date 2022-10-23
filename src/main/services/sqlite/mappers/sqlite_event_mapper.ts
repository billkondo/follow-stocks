import Event from '@entities/event/event';
import SqliteEventModel from '@services/sqlite/models/sqlite_event_model';

class SqliteEventMapper {
  static toModel(event: Event): SqliteEventModel {
    const { price, date, quantity, stock, type } = event;

    return {
      date: date.toISOString(),
      quantity,
      price_value: price.value,
      price_code: price.code,
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

    return {
      date: new Date(date),
      price: {
        code: price_code,
        value: price_value,
      },
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
