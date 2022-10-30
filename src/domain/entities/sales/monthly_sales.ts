import Sale from './sale';

class MonthlySales {
  bruteBalance: number;
  compensatedLoss: number;
  liquidBalance: number;
  previousMonthLoss: number;
  salesVolume: number;
  tax: number;

  maximumSalesVolumeWithoutTaxing: number;
  profitTaxPercentage: number;

  constructor({
    bruteBalance,
    compensatedLoss,
    liquidBalance,
    previousMonthLoss,
    salesVolume,
    tax,

    maximumSalesVolumeWithoutTaxing,
    profitTaxPercentage,
  }: {
    bruteBalance?: number;
    compensatedLoss?: number;
    liquidBalance?: number;
    previousMonthLoss?: number;
    salesVolume?: number;
    tax?: number;

    maximumSalesVolumeWithoutTaxing?: number;
    profitTaxPercentage?: number;
  } = {}) {
    this.bruteBalance = bruteBalance || 0.0;
    this.compensatedLoss = compensatedLoss || 0.0;
    this.liquidBalance = liquidBalance || 0.0;
    this.previousMonthLoss = previousMonthLoss || 0.0;
    this.salesVolume = salesVolume || 0.0;
    this.tax = tax || 0.0;

    this.maximumSalesVolumeWithoutTaxing = maximumSalesVolumeWithoutTaxing || 0;
    this.profitTaxPercentage = profitTaxPercentage || 0.0;
  }

  updateWithSale(sale: Sale) {
    const { balance, salesVolume } = sale;

    this.bruteBalance += balance;
    this.salesVolume += salesVolume;

    const monthHasProfit = this.bruteBalance > 0;
    const maximumSalesReached =
      this.salesVolume > this.maximumSalesVolumeWithoutTaxing;
    const shouldApplyTaxesAndCompensateLoss =
      monthHasProfit && maximumSalesReached;

    if (shouldApplyTaxesAndCompensateLoss) {
      this.compensatedLoss = Math.min(
        this.bruteBalance,
        Math.abs(this.previousMonthLoss),
      );

      this.tax =
        (this.bruteBalance - this.compensatedLoss) * this.profitTaxPercentage;

      this.liquidBalance = this.bruteBalance - this.compensatedLoss - this.tax;
    } else {
      this.tax = 0;
      this.liquidBalance = this.bruteBalance;
    }
  }

  getMonthLoss() {
    return (
      this.previousMonthLoss +
      this.compensatedLoss +
      Math.min(0, this.liquidBalance)
    );
  }
}

export default MonthlySales;
