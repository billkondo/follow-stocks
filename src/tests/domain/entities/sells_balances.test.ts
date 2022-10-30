import SellsBalances from '@entities/sells_balances';

describe('Sells balances', () => {
  const mockComputeTaxFunction = jest.fn();

  beforeEach(() => {
    mockComputeTaxFunction.mockClear();
    mockComputeTaxFunction.mockReturnValue(0);
  });

  it('should throw error if a sell is added before last date', () => {
    const sellsBalances = new SellsBalances(mockComputeTaxFunction);
    const lastDate = new Date(2022, 11);
    const dateBeforeLastDate = new Date(2022, 10);

    sellsBalances.lastDate = lastDate;

    expect(() =>
      sellsBalances.addSell({
        balance: 500,
        date: dateBeforeLastDate,
        sellsVolume: 1000,
      }),
    ).toThrow(new Error('date is before lastDate'));
  });

  it('should initialize sells balances with first sell added', () => {
    const sellsBalances = new SellsBalances(mockComputeTaxFunction);

    expect(sellsBalances.lastDate).toBe(null);
    expect(sellsBalances.sellsBalances).toStrictEqual({});

    sellsBalances.addSell({
      balance: 250,
      date: new Date(2022, 5, 25, 10, 55),
      sellsVolume: 1000,
    });

    expect(sellsBalances.lastDate).toMatchObject(new Date(2022, 5));
    expect(sellsBalances.sellsBalances).toStrictEqual({
      2022: {
        5: {
          bruteBalance: 250,
          compensatedLoss: 0,
          liquidBalance: 250,
          previousMonthLoss: 0,
          sellsVolume: 1000,
          tax: 0,
        },
      },
    });
  });

  it('should update months with no sells balances when a sell is added', () => {
    const sellsBalances = new SellsBalances(mockComputeTaxFunction);

    sellsBalances.lastDate = new Date(2021, 11);
    sellsBalances.sellsBalances = {
      2021: {
        11: {
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 100,
          previousMonthLoss: -100,
          sellsVolume: 200,
          tax: 0,
        },
      },
    };

    sellsBalances.addSell({
      balance: 500,
      date: new Date(2022, 2),
      sellsVolume: 2000,
    });

    expect(sellsBalances.sellsBalances).toStrictEqual({
      2021: {
        11: {
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 100,
          previousMonthLoss: -100,
          sellsVolume: 200,
          tax: 0,
        },
      },
      2022: {
        0: {
          bruteBalance: 0,
          compensatedLoss: 0,
          liquidBalance: 0,
          previousMonthLoss: -100,
          sellsVolume: 0,
          tax: 0,
        },
        1: {
          bruteBalance: 0,
          compensatedLoss: 0,
          liquidBalance: 0,
          previousMonthLoss: -100,
          sellsVolume: 0,
          tax: 0,
        },
        2: {
          bruteBalance: 500,
          compensatedLoss: 100,
          liquidBalance: 400,
          previousMonthLoss: -100,
          sellsVolume: 2000,
          tax: 0,
        },
      },
    });
  });

  it('should compute previous month loss', () => {
    const sellsBalances = new SellsBalances(mockComputeTaxFunction);

    sellsBalances.lastDate = new Date(2022, 4);
    sellsBalances.sellsBalances = {
      2022: {
        4: {
          bruteBalance: -1000,
          compensatedLoss: 200,
          liquidBalance: -1000,
          previousMonthLoss: -2000,
          sellsVolume: 5000,
          tax: 150,
        },
      },
    };

    sellsBalances.addSell({
      date: new Date(2022, 5, 17),
      balance: 0,
      sellsVolume: 1000,
    });

    expect(sellsBalances.lastDate).toMatchObject(new Date(2022, 5));
    expect(sellsBalances.sellsBalances).toStrictEqual({
      2022: {
        4: {
          bruteBalance: -1000,
          compensatedLoss: 200,
          liquidBalance: -1000,
          previousMonthLoss: -2000,
          sellsVolume: 5000,
          tax: 150,
        },
        5: {
          bruteBalance: 0,
          compensatedLoss: 0,
          liquidBalance: 0,
          previousMonthLoss: -2800,
          sellsVolume: 1000,
          tax: 0,
        },
      },
    });
  });

  it('should add multiple sells', () => {
    const sellsBalances = new SellsBalances(mockComputeTaxFunction);

    sellsBalances.addSell({
      balance: 1500,
      date: new Date(2022, 4, 15),
      sellsVolume: 5000,
    });
    sellsBalances.addSell({
      balance: -500,
      date: new Date(2022, 4, 17),
      sellsVolume: 2000,
    });

    expect(sellsBalances.lastDate).toMatchObject(new Date(2022, 4));
    expect(sellsBalances.sellsBalances).toStrictEqual({
      2022: {
        4: {
          bruteBalance: 1000,
          compensatedLoss: 0,
          liquidBalance: 1000,
          previousMonthLoss: 0,
          sellsVolume: 7000,
          tax: 0,
        },
      },
    });
  });

  it('should update tax and liquid balance', () => {
    mockComputeTaxFunction.mockReturnValue(200);

    const sellsBalances = new SellsBalances(mockComputeTaxFunction);

    sellsBalances.addSell({
      balance: 4000,
      date: new Date(2022, 3),
      sellsVolume: 10000,
    });

    expect(sellsBalances.lastDate).toMatchObject(new Date(2022, 3));
    expect(sellsBalances.sellsBalances).toStrictEqual({
      2022: {
        3: {
          bruteBalance: 4000,
          compensatedLoss: 0,
          liquidBalance: 3800,
          previousMonthLoss: 0,
          sellsVolume: 10000,
          tax: 200,
        },
      },
    });
    expect(mockComputeTaxFunction).toHaveBeenCalledWith(4000, 10000);
  });

  it('should use previous month loss to compensate a greater liquid balance', () => {
    mockComputeTaxFunction.mockReturnValue(50);

    const sellsBalances = new SellsBalances(mockComputeTaxFunction);

    sellsBalances.sellsBalances = {
      2021: {
        11: {
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 50,
          previousMonthLoss: -250,
          sellsVolume: 1500,
          tax: 75,
        },
      },
    };

    sellsBalances.addSell({
      balance: 750,
      date: new Date(2022, 0),
      sellsVolume: 2500,
    });

    expect(sellsBalances.lastDate).toMatchObject(new Date(2022, 0));
    expect(sellsBalances.sellsBalances).toStrictEqual({
      2021: {
        11: {
          bruteBalance: 100,
          compensatedLoss: 0,
          liquidBalance: 50,
          previousMonthLoss: -250,
          sellsVolume: 1500,
          tax: 75,
        },
      },
      2022: {
        0: {
          bruteBalance: 750,
          compensatedLoss: 250,
          liquidBalance: 450,
          previousMonthLoss: -250,
          sellsVolume: 2500,
          tax: 50,
        },
      },
    });
    expect(mockComputeTaxFunction).toHaveBeenCalledWith(500, 2500);
  });

  it('should use previous month loss to compensate a smaller liquid balance', () => {
    mockComputeTaxFunction.mockReturnValue(0);

    const sellsBalances = new SellsBalances(mockComputeTaxFunction);

    sellsBalances.sellsBalances = {
      2021: {
        10: {
          bruteBalance: 1000,
          compensatedLoss: 0,
          liquidBalance: 500,
          previousMonthLoss: -2000,
          sellsVolume: 3000,
          tax: 200,
        },
      },
    };

    sellsBalances.addSell({
      balance: 750,
      date: new Date(2021, 11),
      sellsVolume: 1500,
    });

    expect(sellsBalances.lastDate).toMatchObject(new Date(2021, 11));
    expect(sellsBalances.sellsBalances).toStrictEqual({
      2021: {
        10: {
          bruteBalance: 1000,
          compensatedLoss: 0,
          liquidBalance: 500,
          previousMonthLoss: -2000,
          sellsVolume: 3000,
          tax: 200,
        },
        11: {
          bruteBalance: 750,
          compensatedLoss: 750,
          liquidBalance: 0,
          previousMonthLoss: -2000,
          sellsVolume: 1500,
          tax: 0,
        },
      },
    });
    expect(mockComputeTaxFunction).toHaveBeenCalledWith(0, 1500);
  });
});
