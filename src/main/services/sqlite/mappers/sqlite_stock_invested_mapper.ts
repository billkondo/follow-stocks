import StockInvested from '@entities/stock_invested/stock_invested';
import SqliteStockInvestedModel from '@sqlite/models/sqlite_stock_invested_model';

class SqliteStockInvestedMapper {
  static toModel(stockInvested: StockInvested): SqliteStockInvestedModel {
    const { averagePrice, quantity, stock, totalInvested } = stockInvested;

    return {
      average_price: averagePrice,
      quantity,
      total_invested: totalInvested,
      stock_ticker: stock.ticker,
      stock_name: stock.name,
      stock_type: stock.type,
      stock_currency_code: stock.currencyCode,
    };
  }

  static fromModel(stockInvested: SqliteStockInvestedModel): StockInvested {
    const {
      average_price,
      quantity,
      stock_name,
      stock_ticker,
      stock_type,
      total_invested,
      stock_currency_code,
    } = stockInvested;

    return {
      averagePrice: average_price,
      quantity,
      stock: {
        name: stock_name,
        ticker: stock_ticker,
        type: stock_type,
        currencyCode: stock_currency_code,
      },
      totalInvested: total_invested,
    };
  }
}

export default SqliteStockInvestedMapper;
