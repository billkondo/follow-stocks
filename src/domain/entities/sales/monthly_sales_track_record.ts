import MonthlySales from './monthly_sales';
import Sale from './sale';

class MonthlySalesTrackRecord {
  lastDate: Date | null;
  trackRecord: {
    [year: number]: {
      [month: number]: MonthlySales;
    };
  };

  maximumMonthlySalesVolumeWithoutTaxing: number;
  profitTaxPercentage: number;

  constructor({
    maximumMonthlySalesVolumeWithoutTaxing,
    profitTaxPercentage,
  }: {
    maximumMonthlySalesVolumeWithoutTaxing?: number;
    profitTaxPercentage?: number;
  } = {}) {
    this.lastDate = null;
    this.trackRecord = {};

    this.maximumMonthlySalesVolumeWithoutTaxing =
      maximumMonthlySalesVolumeWithoutTaxing || 0;
    this.profitTaxPercentage = profitTaxPercentage || 0;
  }

  addSale(sale: Sale) {
    const { date } = sale;

    if (date < this.lastDate) {
      throw new Error('date is before lastDate');
    }

    const lastDate = this.lastDate || date;

    this.advanceTrackRecordUntilDate(lastDate, date);
    this.updateMonthlySales(sale);
    this.lastDate = this.parseDate(date);
  }

  advanceTrackRecordUntilDate(startDate: Date, endDate: Date) {
    function stop(year: number, month: number) {
      if (year === endDate.getFullYear()) {
        return month > endDate.getMonth();
      }

      return year > endDate.getFullYear();
    }

    let month = startDate.getMonth();
    let year = startDate.getFullYear();

    do {
      this.initializeMonthlySales(year, month);

      month = this.nextMonth(month);

      if (!month) {
        year += 1;
      }
    } while (!stop(year, month));
  }

  previousMonth(month: number) {
    return (month - 1 + 12) % 12;
  }

  nextMonth(month: number) {
    return (month + 1) % 12;
  }

  initializeMonthlySales(year: number, month: number) {
    const monthlySales = this.getMonthlySales(year, month);

    const wasAlreadyInitialized = !!monthlySales;
    if (wasAlreadyInitialized) {
      return;
    }

    const previousMonthlySales = this.getPreviousMonthlySales(year, month);
    const newMonthlySales = new MonthlySales({
      maximumSalesVolumeWithoutTaxing:
        this.maximumMonthlySalesVolumeWithoutTaxing,
      previousMonthLoss: previousMonthlySales?.getMonthLoss(),
      profitTaxPercentage: this.profitTaxPercentage,
    });

    if (!this.trackRecord[year]) {
      this.trackRecord[year] = {};
    }

    if (!this.trackRecord[month]) {
      this.trackRecord[year][month] = newMonthlySales;
    }
  }

  getPreviousMonthlySales(year: number, month: number) {
    const previousMonth = this.previousMonth(month);
    const previousYear = previousMonth === 11 ? year - 1 : year;

    return this.getMonthlySales(previousYear, previousMonth);
  }

  getMonthlySales(year: number, month: number) {
    return this.trackRecord?.[year]?.[month];
  }

  updateMonthlySales(sale: Sale) {
    const { date } = sale;

    const year = date.getFullYear();
    const month = date.getMonth();
    const monthlySales = this.getMonthlySales(year, month);

    monthlySales.updateWithSale(sale);
  }

  parseDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    return new Date(year, month);
  }
}

export default MonthlySalesTrackRecord;
