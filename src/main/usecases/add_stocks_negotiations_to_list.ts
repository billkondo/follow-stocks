import StockNegotiation from 'domain/stock_negotiation';

const AddStocksNegotiationsToList = (
  stocksNegotiations: StockNegotiation[],
  newStocksNegotiations: StockNegotiation[],
) => {
  const negotiations: { [key: string]: StockNegotiation[] } = {};

  for (const stockNegotiation of stocksNegotiations) {
    const dateMS = stockNegotiation.date.getTime();
    const hasDateAppeared = !!negotiations[dateMS];

    if (!hasDateAppeared) negotiations[dateMS] = [];

    negotiations[dateMS].push(stockNegotiation);
  }

  const newDateMS = newStocksNegotiations[0].date.getTime();
  const hasNewDateAppeared = !!negotiations[newDateMS];

  if (!hasNewDateAppeared) {
    negotiations[newDateMS] = newStocksNegotiations;
  } else {
    const removeBuysAndSellsThatHaveNewDate = () => {
      negotiations[newDateMS] = negotiations[newDateMS].filter(
        (negotiation) => !['BUY', 'SELL'].includes(negotiation.type),
      );
    };

    removeBuysAndSellsThatHaveNewDate();
    negotiations[newDateMS].push(...newStocksNegotiations);
  }

  const negotiationsAfterInsetions: StockNegotiation[] = [];
  const orderedDatesMS = Object.keys(negotiations)
    .map((dateMS) => parseInt(dateMS))
    .sort();

  for (const dateMS of orderedDatesMS)
    negotiationsAfterInsetions.push(...negotiations[dateMS]);

  return negotiationsAfterInsetions;
};

export default AddStocksNegotiationsToList;
