import StockNegotiationSqliteModel from '@sqlite/models/stock_negotiation_sqlite_model';
import StockNegotiation from 'domain/stock_negotiation';

const mapStockNegotiationModelToStockNegotiation = (
  stockNegotiation: StockNegotiationSqliteModel,
): StockNegotiation => {
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
};

export default mapStockNegotiationModelToStockNegotiation;
