import Stock from '@entities/stocks/Stock';

const compareStocksInAscendingOrderByTicker = (
  stockA: Stock,
  stockB: Stock,
) => {
  if (stockA.ticker < stockB.ticker) return -1;
  if (stockA.ticker > stockB.ticker) return 1;

  return 0;
};

export default compareStocksInAscendingOrderByTicker;
