import SqliteStockNegotiationModel from '@sqlite/models/sqlite_stock_negotiation_model';
import StockNegotiation from 'domain/entities/stock_negotiation/stock_negotiation';

class SqliteStockNegotiationMapper {
  static toModel(
    stockNegotiation: StockNegotiation,
  ): SqliteStockNegotiationModel {
    const { price, date, quantity, stock, type } = stockNegotiation;

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

  static fromModel(
    stockNegotiation: SqliteStockNegotiationModel,
  ): StockNegotiation {
    const {
      date,
      price_code,
      price_value,
      quantity,
      stock_name,
      stock_ticker,
      stock_type,
      type,
    } = stockNegotiation;

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

export default SqliteStockNegotiationMapper;
