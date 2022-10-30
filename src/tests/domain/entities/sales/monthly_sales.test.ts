import MonthlySales from '@entities/sales/monthly_sales';

describe('Monthly sales', () => {
  it('should create empty monthly sales', () => {
    const monthlySales = new MonthlySales();

    assertMonthlySales(monthlySales, {
      bruteBalance: 0,
      compensatedLoss: 0,
      liquidBalance: 0,
      previousMonthLoss: 0,
      salesVolume: 0,
      tax: 0,
    });

    expect(monthlySales.maximumSalesVolumeWithouTaxing).toBe(0);
    expect(monthlySales.profitTaxPercentage).toBe(0);
  });

  it('should update monthly sales with profit sale', () => {
    const monthlySales = new MonthlySales();

    monthlySales.updateWithSale({
      balance: 500,
      date: new Date(2022, 1),
      salesVolume: 4000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: 500,
      compensatedLoss: 0,
      liquidBalance: 500,
      previousMonthLoss: 0,
      salesVolume: 4000,
      tax: 0,
    });
  });

  it('should update monthly sales with loss sale', () => {
    const monthlySales = new MonthlySales();

    monthlySales.updateWithSale({
      balance: -500,
      date: new Date(2022, 5),
      salesVolume: 5000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: -500,
      liquidBalance: -500,
      compensatedLoss: 0,
      previousMonthLoss: 0,
      salesVolume: 5000,
      tax: 0,
    });
  });

  it('should apply taxes when sales volume is above maximum sales volume', () => {
    const monthlySales = new MonthlySales({ profitTaxPercentage: 0.2 });

    monthlySales.updateWithSale({
      balance: 500,
      date: new Date(2017, 3),
      salesVolume: 5000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: 500,
      compensatedLoss: 0,
      liquidBalance: 400,
      previousMonthLoss: 0,
      salesVolume: 5000,
      tax: 100,
    });
  });

  it('should not apply taxes when sales volume is under maximum sales volume', () => {
    const monthlySales = new MonthlySales({
      maximumSalesVolumeWithouTaxing: 15000,
      profitTaxPercentage: 0.2,
    });

    monthlySales.updateWithSale({
      balance: 500,
      date: new Date(2017, 3),
      salesVolume: 10000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: 500,
      compensatedLoss: 0,
      liquidBalance: 500,
      previousMonthLoss: 0,
      salesVolume: 10000,
      tax: 0,
    });
  });

  it('should compensate loss when sales volume is above maximum sales volume', () => {
    const monthlySales = new MonthlySales({
      maximumSalesVolumeWithouTaxing: 5000,
      profitTaxPercentage: 0.2,
    });

    monthlySales.previousMonthLoss = -2000;
    monthlySales.updateWithSale({
      balance: 5000,
      date: new Date(2017, 3),
      salesVolume: 10000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: 5000,
      compensatedLoss: 2000,
      liquidBalance: 2400,
      previousMonthLoss: -2000,
      salesVolume: 10000,
      tax: 600,
    });
    expect(monthlySales.getMonthLoss()).toBe(0);
  });

  it('should not compensate loss when sales volume is under maximum sales volume', () => {
    const monthlySales = new MonthlySales({
      maximumSalesVolumeWithouTaxing: 15000,
      profitTaxPercentage: 0.2,
    });

    monthlySales.previousMonthLoss = -5000;
    monthlySales.updateWithSale({
      balance: 2500,
      date: new Date(2017, 3),
      salesVolume: 10000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: 2500,
      compensatedLoss: 0,
      liquidBalance: 2500,
      previousMonthLoss: -5000,
      salesVolume: 10000,
      tax: 0,
    });
    expect(monthlySales.getMonthLoss()).toBe(-5000);
  });

  it('should not compensate loss when there is not profit', () => {
    const monthlySales = new MonthlySales({
      maximumSalesVolumeWithouTaxing: 15000,
      profitTaxPercentage: 0.2,
    });

    monthlySales.previousMonthLoss = -5000;
    monthlySales.updateWithSale({
      balance: -2500,
      date: new Date(2017, 3),
      salesVolume: 20000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: -2500,
      compensatedLoss: 0,
      liquidBalance: -2500,
      previousMonthLoss: -5000,
      salesVolume: 20000,
      tax: 0,
    });
    expect(monthlySales.getMonthLoss()).toBe(-7500);
  });

  it('should compensate loss partially', () => {
    const monthlySales = new MonthlySales({
      maximumSalesVolumeWithouTaxing: 5000,
      profitTaxPercentage: 0.2,
    });

    monthlySales.previousMonthLoss = -2000;
    monthlySales.updateWithSale({
      balance: 500,
      date: new Date(2017, 3),
      salesVolume: 10000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: 500,
      compensatedLoss: 500,
      liquidBalance: 0,
      previousMonthLoss: -2000,
      salesVolume: 10000,
      tax: 0,
    });
    expect(monthlySales.getMonthLoss()).toBe(-1500);
  });

  it('should increase month loss with loss sale', () => {
    const monthlySales = new MonthlySales({
      maximumSalesVolumeWithouTaxing: 5000,
      profitTaxPercentage: 0.2,
    });

    monthlySales.previousMonthLoss = -2000;
    monthlySales.updateWithSale({
      balance: -500,
      date: new Date(2017, 3),
      salesVolume: 10000,
    });

    assertMonthlySales(monthlySales, {
      bruteBalance: -500,
      compensatedLoss: 0,
      liquidBalance: -500,
      previousMonthLoss: -2000,
      salesVolume: 10000,
      tax: 0,
    });
    expect(monthlySales.getMonthLoss()).toBe(-2500);
  });
});

const assertMonthlySales = (
  monthlySales: MonthlySales,
  {
    bruteBalance,
    compensatedLoss,
    liquidBalance,
    previousMonthLoss,
    salesVolume,
    tax,
  }: {
    bruteBalance: number;
    compensatedLoss: number;
    liquidBalance: number;
    previousMonthLoss: number;
    salesVolume: number;
    tax: number;
  },
) => {
  expect(monthlySales.bruteBalance).toEqual(bruteBalance);
  expect(monthlySales.compensatedLoss).toEqual(compensatedLoss);
  expect(monthlySales.liquidBalance).toEqual(liquidBalance);
  expect(monthlySales.previousMonthLoss).toEqual(previousMonthLoss);
  expect(monthlySales.salesVolume).toEqual(salesVolume);
  expect(monthlySales.tax).toEqual(tax);
};
