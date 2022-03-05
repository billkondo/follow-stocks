import SqliteStockNegotiationModel from '@sqlite/models/sqlite_stock_negotiation_model';
import StockNegotiation from 'domain/stock_negotiation';

const mapStockNegotiationToStockNegotiationModel = (
  stockNegotiation: StockNegotiation,
): SqliteStockNegotiationModel => {
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
};

export default mapStockNegotiationToStockNegotiationModel;
