import Event from '@entities/events/Event';
import StockInvested from '@entities/stock_invested/stock_invested';
import BigNumber from 'bignumber.js';

function* GenerateAveragePricesFromEvents(events: Event[]) {
  let totalInvested = new BigNumber(0);
  let totalQuantity = new BigNumber(0);
  let averagePrice = new BigNumber(0);

  for (const event of events) {
    const { stock, quantity, type, unitPrice } = event;

    if (type === 'BUY') {
      totalInvested = totalInvested.plus(
        new BigNumber(unitPrice).multipliedBy(quantity),
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
      totalInvested: parseFloat(totalInvested.toFixed(4)),
      averagePrice: parseFloat(averagePrice.toFixed(4)),
    } as StockInvested;
  }
}

export default GenerateAveragePricesFromEvents;
