interface Sell {
  balance: number;
  date: Date;
  sellsVolume: number;
}

interface SellsBalance {
  bruteBalance: number;
  compensatedLoss: number;
  liquidBalance: number;
  previousMonthLoss: number;
  sellsVolume: number;
  tax: number;
}

interface SellsBalancesParams {
  maximumMonthlySellsVolumeWithoutTaxing?: number;
  profitTaxPercentage?: number;
}

class SellsBalances {
  lastDate: Date | null;
  sellsBalances: {
    [year: number]: {
      [month: number]: SellsBalance;
    };
  };
  maximumMonthlySellsVolumeWithoutTaxing: number;
  profitTaxPercentage: number;

  constructor(params: SellsBalancesParams = {}) {
    const { maximumMonthlySellsVolumeWithoutTaxing, profitTaxPercentage } =
      params;

    this.lastDate = null;
    this.sellsBalances = {};
    this.maximumMonthlySellsVolumeWithoutTaxing =
      maximumMonthlySellsVolumeWithoutTaxing || 0;
    this.profitTaxPercentage = profitTaxPercentage || 0;
  }

  addSell(sell: Sell) {
    const { date } = sell;

    if (date < this.lastDate) {
      throw new Error('date is before lastDate');
    }

    const lastDate = this.lastDate || date;

    this.advanceSellsBalancesUntilDate(lastDate, date);
    this.updateSellsBalance(sell);
    this.lastDate = this.parseDate(date);
  }

  advanceSellsBalancesUntilDate(startDate: Date, endDate: Date) {
    function stop(year: number, month: number) {
      if (year === endDate.getFullYear()) {
        return month > endDate.getMonth();
      }

      return year > endDate.getFullYear();
    }

    let month = startDate.getMonth();
    let year = startDate.getFullYear();

    do {
      this.initializeSellsBalance(year, month);

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

  initializeSellsBalance(year: number, month: number) {
    const sellsBalance = this.getSellsBalance(year, month);

    const wasAlreadyInitialized = !!sellsBalance;
    if (wasAlreadyInitialized) {
      return;
    }

    if (!this.sellsBalances[year]) {
      this.sellsBalances[year] = {};
    }

    if (!this.sellsBalances[month]) {
      this.sellsBalances[year][month] = {
        bruteBalance: 0,
        compensatedLoss: 0,
        liquidBalance: 0,
        previousMonthLoss: 0,
        sellsVolume: 0,
        tax: 0,
      };
    }

    const previousMonthSellBalance = this.getPreviousMonthSellsBalance(
      year,
      month,
    );
    if (previousMonthSellBalance) {
      this.sellsBalances[year][month].previousMonthLoss =
        previousMonthSellBalance.previousMonthLoss +
        Math.min(previousMonthSellBalance.liquidBalance, 0.0) +
        previousMonthSellBalance.compensatedLoss;
    }
  }

  getPreviousMonthSellsBalance(year: number, month: number) {
    const previousSellsBalanceMonth = this.previousMonth(month);
    const previousSellsBalanceYear =
      previousSellsBalanceMonth === 11 ? year - 1 : year;

    return this.getSellsBalance(
      previousSellsBalanceYear,
      previousSellsBalanceMonth,
    );
  }

  getSellsBalance(year: number, month: number) {
    return this.sellsBalances?.[year]?.[month];
  }

  updateSellsBalance({ balance, date, sellsVolume }: Sell) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const sellsBalance = this.sellsBalances[year][month];

    sellsBalance.bruteBalance += balance;
    sellsBalance.sellsVolume += sellsVolume;
    sellsBalance.compensatedLoss =
      sellsBalance.sellsVolume < this.maximumMonthlySellsVolumeWithoutTaxing
        ? 0
        : Math.max(
            0,
            Math.min(
              sellsBalance.bruteBalance,
              -sellsBalance.previousMonthLoss,
            ),
          );

    const tax =
      (sellsBalance.bruteBalance - sellsBalance.compensatedLoss) *
      this.profitTaxPercentage;

    sellsBalance.tax = tax;
    sellsBalance.liquidBalance =
      sellsBalance.bruteBalance - sellsBalance.compensatedLoss - tax;
  }

  parseDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    return new Date(year, month);
  }
}

export default SellsBalances;
