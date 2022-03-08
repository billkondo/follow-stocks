import BigNumber from 'bignumber.js';
import StockInvested from 'domain/stock_invested';
import StockNegotiation from 'domain/stock_negotiation';

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
        value: parseFloat(totalInvested.toFixed(2)),
        code: price.code,
      },
      averagePrice: {
        value: parseFloat(averagePrice.toFixed(2)),
        code: price.code,
      },
    } as StockInvested;
  }
}

export default GenerateAveragePricesFromStocksNegotiations;
