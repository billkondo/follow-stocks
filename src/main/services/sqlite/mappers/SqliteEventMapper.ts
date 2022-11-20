import Event from '@entities/events/Event';
import SqliteEventModel from '@services/sqlite/models/sqlite_event_model';

class SqliteEventMapper {
  static toModel(event: Event): SqliteEventModel {
    const { date, quantity, stock, type, totalValue, unitPrice } = event;

    return {
      date: date.toISOString(),
      quantity,
      stock_name: stock.name,
      stock_ticker: stock.ticker,
      stock_type: stock.type,
      stock_currency_code: stock.currencyCode,
      type,
      total_value: totalValue,
      unit_price: unitPrice,
    };
  }

  static fromModel(event: SqliteEventModel): Event {
    const {
      date,
      quantity,
      stock_name,
      stock_ticker,
      stock_type,
      stock_currency_code,
      type,
      total_value,
      unit_price,
    } = event;

    return new Event({
      date: new Date(date),
      quantity,
      stock: {
        name: stock_name,
        ticker: stock_ticker,
        type: stock_type,
        currencyCode: stock_currency_code,
      },
      type,
      totalValue: total_value,
      unitPrice: unit_price,
    });
  }
}

export default SqliteEventMapper;
