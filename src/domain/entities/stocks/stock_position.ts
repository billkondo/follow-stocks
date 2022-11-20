import Event from '@entities/events/Event';
import Stock from '@entities/stocks/Stock';
import DomainError from '@errors/domain_error';
import { BigNumber } from 'bignumber.js';

class StockPosition {
  averagePrice: number;
  quantity: number;
  stock: Stock;
  totalInvested: number;

  constructor({
    averagePrice = 0.0,
    quantity = 0.0,
    stock,
    totalInvested = 0.0,
  }: {
    averagePrice?: number;
    quantity?: number;
    stock: Stock;
    totalInvested?: number;
  }) {
    this.averagePrice = averagePrice;
    this.quantity = quantity;
    this.stock = stock;
    this.totalInvested = totalInvested;
  }

  updateWithEvent(event: Event) {
    const { stock, type } = event;

    if (this.stock.ticker !== stock.ticker) {
      throw new DomainError('Event from different stock');
    }

    switch (type) {
      case 'BONUS':
      case 'BUY':
      case 'SUBSCRIPTION':
        this.updateWithBuyEvent(event);
        break;

      case 'SELL':
        this.updateWithSellEvent(event);
        break;

      case 'UNFOLDING':
        this.updateWithUnfoldingEvent(event);
        break;
    }
  }

  updateWithBuyEvent(event: Event) {
    const { quantity, unitPrice } = event;

    const quantityBigNumber = new BigNumber(this.quantity).plus(quantity);
    const totalInvestedBigNumber = new BigNumber(this.quantity)
      .multipliedBy(unitPrice)
      .plus(this.totalInvested);
    const averagePriceBigNumber =
      totalInvestedBigNumber.dividedBy(quantityBigNumber);

    this.quantity = this.parseBigNumberToFloat(quantityBigNumber);
    this.totalInvested = this.parseBigNumberToFloat(totalInvestedBigNumber);
    this.averagePrice = this.parseBigNumberToFloat(averagePriceBigNumber);
  }

  updateWithSellEvent(event: Event) {
    const { quantity } = event;

    const quantityBigNumber = new BigNumber(this.quantity).minus(quantity);
    const discountedTotalInvestedBigNumber = new BigNumber(
      quantity,
    ).multipliedBy(this.averagePrice);
    const totalInvestedBigNumber = new BigNumber(this.totalInvested).minus(
      discountedTotalInvestedBigNumber,
    );

    if (quantityBigNumber.isEqualTo(0.0)) {
      this.averagePrice = 0.0;
      this.quantity = 0.0;
      this.totalInvested = 0.0;
    } else {
      this.quantity = this.parseBigNumberToFloat(quantityBigNumber);
      this.totalInvested = this.parseBigNumberToFloat(totalInvestedBigNumber);
    }
  }

  updateWithUnfoldingEvent(event: Event) {
    const { quantity } = event;

    const quantityBigNumber = new BigNumber(this.quantity).plus(quantity);
    const averagePriceBigNumber = new BigNumber(this.totalInvested).dividedBy(
      quantityBigNumber,
    );

    this.quantity = this.parseBigNumberToFloat(quantityBigNumber);
    this.averagePrice = this.parseBigNumberToFloat(averagePriceBigNumber);
  }

  parseBigNumberToFloat(bigNumber: BigNumber) {
    return parseFloat(bigNumber.toFixed(6));
  }
}

export default StockPosition;
