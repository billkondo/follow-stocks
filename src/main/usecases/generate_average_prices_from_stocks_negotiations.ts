import BigNumber from 'bignumber.js';
import StockInvested from 'domain/entities/stock_invested/stock_invested';
import StockNegotiation from 'domain/entities/stock_negotiation/stock_negotiation';

function* GenerateAveragePricesFromStocksNegotiations(
  stocksNegotiations: StockNegotiation[],
) {
  let totalInvested = new BigNumber(0);
  let totalQuantity = new BigNumber(0);
  let averagePrice = new BigNumber(0);

  for (const stockNegotiation of stocksNegotiations) {
    const { stock, price, quantity, type } = stockNegotiation;

    if (type === 'BUY') {
      totalInvested = totalInvested.plus(
        new BigNumber(price.value).multipliedBy(quantity),
      );
      totalQuantity = totalQuantity.plus(quantity);
      averagePrice = totalInvested.div(totalQuantity);
    } else {
      totalInvested = totalInvested.minus(averagePrice.multipliedBy(quantity));
      totalQuantity = totalQuantity.minus(quantity);
    }

    if (totalQuantity.isZero()) {
      averagePrice = new BigNumber(0);
      totalInvested = new BigNumber(0);
    }

    yield {
      stock,
      quantity: parseFloat(totalQuantity.toString()),
      totalInvested: {
        value: parseFloat(totalInvested.toFixed(4)),
        code: price.code,
      },
      averagePrice: {
        value: parseFloat(averagePrice.toFixed(4)),
        code: price.code,
      },
    } as StockInvested;
  }
}

export default GenerateAveragePricesFromStocksNegotiations;
