import Stock from 'domain/stock';

const compareStocks = (stockA: Stock, stockB: Stock) => {
  if (stockA.ticker < stockB.ticker) return -1;
  if (stockA.ticker > stockB.ticker) return 1;

  return 0;
};

export default compareStocks;
