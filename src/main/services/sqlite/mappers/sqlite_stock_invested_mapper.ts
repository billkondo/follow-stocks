import StockInvested from '@entities/stock_invested/stock_invested';
import SqliteStockInvestedModel from '@sqlite/models/sqlite_stock_invested_model';

class SqliteStockInvestedMapper {
  static toModel(stockInvested: StockInvested): SqliteStockInvestedModel {
    const { averagePrice, quantity, stock, totalInvested } = stockInvested;

    return {
      average_price: averagePrice.value,
      price_code: averagePrice.code,
      quantity,
      total_invested: totalInvested.value,
      stock_ticker: stock.ticker,
      stock_name: stock.name,
      stock_type: stock.type,
    };
  }

  static fromModel(stockInvested: SqliteStockInvestedModel): StockInvested {
    const {
      average_price,
      price_code,
      quantity,
      stock_name,
      stock_ticker,
      stock_type,
      total_invested,
    } = stockInvested;

    return {
      averagePrice: {
        code: price_code,
        value: average_price,
      },
      quantity,
      stock: {
        name: stock_name,
        ticker: stock_ticker,
        type: stock_type,
      },
      totalInvested: {
        code: price_code,
        value: total_invested,
      },
    };
  }
}

export default SqliteStockInvestedMapper;
