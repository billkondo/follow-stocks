import MonthlySales from '@entities/sales/monthly_sales';
import MonthlySalesTrackRecord from '@entities/sales/monthly_sales_track_record';

describe('Monthly sales track record', () => {
  it('should throw error if a sale is added before last date', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord();
    const lastDate = new Date(2022, 11);
    const dateBeforeLastDate = new Date(2022, 10);

    monthlySalesTrackRecord.lastDate = lastDate;

    expect(() =>
      monthlySalesTrackRecord.addSale({
        balance: 500,
        date: dateBeforeLastDate,
        salesVolume: 1000,
      }),
    ).toThrow(new Error('date is before lastDate'));
  });

  it('should initialize monthly sales track record with first sale added', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord();

    expect(monthlySalesTrackRecord.lastDate).toBe(null);
    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({});

    monthlySalesTrackRecord.addSale({
      balance: 250,
      date: new Date(2022, 5, 25, 10, 55),
      salesVolume: 1000,
    });

    expect(monthlySalesTrackRecord.lastDate).toMatchObject(new Date(2022, 5));
    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({
      2022: {
        5: new MonthlySales({
          bruteBalance: 250,
          compensatedLoss: 0,
          liquidBalance: 250,
          previousMonthLoss: 0,
          salesVolume: 1000,
          tax: 0,
        }),
      },
    });
  });

  it('should update months with no monthly sales when a sale is added', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord();

    monthlySalesTrackRecord.lastDate = new Date(2021, 11);
    monthlySalesTrackRecord.trackRecord = {
      2021: {
        11: new MonthlySales({
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 100,
          previousMonthLoss: -100,
          salesVolume: 200,
          tax: 0,
        }),
      },
    };

    monthlySalesTrackRecord.addSale({
      balance: 500,
      date: new Date(2022, 2),
      salesVolume: 2000,
    });

    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({
      2021: {
        11: new MonthlySales({
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 100,
          previousMonthLoss: -100,
          salesVolume: 200,
          tax: 0,
        }),
      },
      2022: {
        0: new MonthlySales({
          bruteBalance: 0,
          compensatedLoss: 0,
          liquidBalance: 0,
          previousMonthLoss: -100,
          salesVolume: 0,
          tax: 0,
        }),
        1: new MonthlySales({
          bruteBalance: 0,
          compensatedLoss: 0,
          liquidBalance: 0,
          previousMonthLoss: -100,
          salesVolume: 0,
          tax: 0,
        }),
        2: new MonthlySales({
          bruteBalance: 500,
          compensatedLoss: 100,
          liquidBalance: 400,
          previousMonthLoss: -100,
          salesVolume: 2000,
          tax: 0,
        }),
      },
    });
  });

  it('should compute previous month loss', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord();

    monthlySalesTrackRecord.lastDate = new Date(2022, 4);
    monthlySalesTrackRecord.trackRecord = {
      2022: {
        4: new MonthlySales({
          bruteBalance: -1000,
          compensatedLoss: 200,
          liquidBalance: -1000,
          previousMonthLoss: -2000,
          salesVolume: 5000,
          tax: 150,
        }),
      },
    };

    monthlySalesTrackRecord.addSale({
      date: new Date(2022, 5, 17),
      balance: 0,
      salesVolume: 1000,
    });

    expect(monthlySalesTrackRecord.lastDate).toMatchObject(new Date(2022, 5));
    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({
      2022: {
        4: new MonthlySales({
          bruteBalance: -1000,
          compensatedLoss: 200,
          liquidBalance: -1000,
          previousMonthLoss: -2000,
          salesVolume: 5000,
          tax: 150,
        }),
        5: new MonthlySales({
          bruteBalance: 0,
          compensatedLoss: 0,
          liquidBalance: 0,
          previousMonthLoss: -2800,
          salesVolume: 1000,
          tax: 0,
        }),
      },
    });
  });

  it('should add multiple sales', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord();

    monthlySalesTrackRecord.addSale({
      balance: 1500,
      date: new Date(2022, 4, 15),
      salesVolume: 5000,
    });
    monthlySalesTrackRecord.addSale({
      balance: -500,
      date: new Date(2022, 4, 17),
      salesVolume: 2000,
    });

    expect(monthlySalesTrackRecord.lastDate).toMatchObject(new Date(2022, 4));
    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({
      2022: {
        4: new MonthlySales({
          bruteBalance: 1000,
          compensatedLoss: 0,
          liquidBalance: 1000,
          previousMonthLoss: 0,
          salesVolume: 7000,
          tax: 0,
        }),
      },
    });
  });

  it('should update tax and liquid balance', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord({
      profitTaxPercentage: 0.05,
    });

    monthlySalesTrackRecord.addSale({
      balance: 4000,
      date: new Date(2022, 3),
      salesVolume: 10000,
    });

    expect(monthlySalesTrackRecord.lastDate).toMatchObject(new Date(2022, 3));
    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({
      2022: {
        3: new MonthlySales({
          bruteBalance: 4000,
          compensatedLoss: 0,
          liquidBalance: 3800,
          previousMonthLoss: 0,
          salesVolume: 10000,
          tax: 200,
          profitTaxPercentage: 0.05,
        }),
      },
    });
  });

  it('should use previous month loss to compensate a greater liquid balance', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord({
      profitTaxPercentage: 0.1,
    });

    monthlySalesTrackRecord.trackRecord = {
      2021: {
        11: new MonthlySales({
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 50,
          previousMonthLoss: -250,
          salesVolume: 1500,
          tax: 75,
          profitTaxPercentage: 0.1,
        }),
      },
    };

    monthlySalesTrackRecord.addSale({
      balance: 750,
      date: new Date(2022, 0),
      salesVolume: 2500,
    });

    expect(monthlySalesTrackRecord.lastDate).toMatchObject(new Date(2022, 0));
    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({
      2021: {
        11: new MonthlySales({
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 50,
          previousMonthLoss: -250,
          salesVolume: 1500,
          tax: 75,
          profitTaxPercentage: 0.1,
        }),
      },
      2022: {
        0: new MonthlySales({
          bruteBalance: 750,
          compensatedLoss: 250,
          liquidBalance: 450,
          previousMonthLoss: -250,
          salesVolume: 2500,
          tax: 50,
          profitTaxPercentage: 0.1,
        }),
      },
    });
  });

  it('should use previous month loss to compensate a smaller liquid balance', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord();

    monthlySalesTrackRecord.trackRecord = {
      2021: {
        10: new MonthlySales({
          bruteBalance: 1000,
          compensatedLoss: 0,
          liquidBalance: 500,
          previousMonthLoss: -2000,
          salesVolume: 3000,
          tax: 200,
        }),
      },
    };

    monthlySalesTrackRecord.addSale({
      balance: 750,
      date: new Date(2021, 11),
      salesVolume: 1500,
    });

    expect(monthlySalesTrackRecord.lastDate).toMatchObject(new Date(2021, 11));
    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({
      2021: {
        10: new MonthlySales({
          bruteBalance: 1000,
          compensatedLoss: 0,
          liquidBalance: 500,
          previousMonthLoss: -2000,
          salesVolume: 3000,
          tax: 200,
        }),
        11: new MonthlySales({
          bruteBalance: 750,
          compensatedLoss: 750,
          liquidBalance: 0,
          previousMonthLoss: -2000,
          salesVolume: 1500,
          tax: 0,
        }),
      },
    });
  });

  it('should not use previous month loss when liquid balance is less than maximum monthly sales volume', () => {
    const monthlySalesTrackRecord = new MonthlySalesTrackRecord({
      maximumMonthlySalesVolumeWithoutTaxing: 10000,
    });

    monthlySalesTrackRecord.trackRecord = {
      2021: {
        11: new MonthlySales({
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 50,
          previousMonthLoss: -250,
          salesVolume: 1500,
          tax: 75,
          maximumSalesVolumeWithoutTaxing: 10000,
        }),
      },
    };

    monthlySalesTrackRecord.addSale({
      balance: 750,
      date: new Date(2022, 0),
      salesVolume: 2500,
    });

    expect(monthlySalesTrackRecord.lastDate).toMatchObject(new Date(2022, 0));
    expect(monthlySalesTrackRecord.trackRecord).toStrictEqual({
      2021: {
        11: new MonthlySales({
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 50,
          previousMonthLoss: -250,
          salesVolume: 1500,
          tax: 75,
          maximumSalesVolumeWithoutTaxing: 10000,
        }),
      },
      2022: {
        0: new MonthlySales({
          bruteBalance: 750,
          compensatedLoss: 0,
          liquidBalance: 750,
          previousMonthLoss: -250,
          salesVolume: 2500,
          tax: 0,
          maximumSalesVolumeWithoutTaxing: 10000,
        }),
      },
    });
  });
});
