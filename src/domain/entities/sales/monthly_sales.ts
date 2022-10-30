import Sale from './sale';

class MonthlySales {
  bruteBalance: number;
  compensatedLoss: number;
  liquidBalance: number;
  previousMonthLoss: number;
  salesVolume: number;
  tax: number;

  maximumSalesVolumeWithouTaxing: number;
  profitTaxPercentage: number;

  constructor({
    maximumSalesVolumeWithouTaxing,
    profitTaxPercentage,
  }: {
    maximumSalesVolumeWithouTaxing?: number;
    profitTaxPercentage?: number;
  } = {}) {
    this.bruteBalance = 0;
    this.compensatedLoss = 0;
    this.liquidBalance = 0;
    this.previousMonthLoss = 0;
    this.salesVolume = 0;
    this.tax = 0;

    this.maximumSalesVolumeWithouTaxing = maximumSalesVolumeWithouTaxing || 0;
    this.profitTaxPercentage = profitTaxPercentage || 0.0;
  }

  updateWithSale(sale: Sale) {
    const { balance, salesVolume } = sale;

    this.bruteBalance += balance;
    this.salesVolume += salesVolume;

    const monthHasProfit = this.bruteBalance > 0;
    const maximumSalesReached =
      this.salesVolume > this.maximumSalesVolumeWithouTaxing;
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
