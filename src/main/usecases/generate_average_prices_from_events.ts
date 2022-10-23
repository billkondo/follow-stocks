import Event from '@entities/event/event';
import StockInvested from '@entities/stock_invested/stock_invested';
import BigNumber from 'bignumber.js';

function* GenerateAveragePricesFromEvents(events: Event[]) {
  let totalInvested = new BigNumber(0);
  let totalQuantity = new BigNumber(0);
  let averagePrice = new BigNumber(0);

  for (const event of events) {
    const { stock, price, quantity, type } = event;

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

export default GenerateAveragePricesFromEvents;