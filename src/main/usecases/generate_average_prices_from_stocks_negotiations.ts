import BigNumber from 'bignumber.js';
import StockNegotiation from 'domain/stock_negotiation';

function* GenerateAveragePricesFromStocksNegotiations(
  stocksNegotiations: StockNegotiation[],
) {
  let totalInvested = new BigNumber(0);
  let totalQuantity = 0;
  let averagePrice = new BigNumber(0);

  for (const stockNegotiation of stocksNegotiations) {
    const { price, quantity, type } = stockNegotiation;

    if (type === 'BUY') {
      totalInvested = totalInvested.plus(
        new BigNumber(price.value).multipliedBy(quantity),
      );
      totalQuantity += quantity;
      averagePrice = totalInvested.div(totalQuantity);
    } else {
      totalInvested = totalInvested.minus(averagePrice.multipliedBy(quantity));
      totalQuantity -= quantity;
    }

    yield {
      totalQuantity,
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      averagePrice: parseFloat(averagePrice.toFixed(2)),
    };
  }
}

export default GenerateAveragePricesFromStocksNegotiations;
