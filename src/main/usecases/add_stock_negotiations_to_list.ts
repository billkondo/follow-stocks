import StockNegotiation from 'domain/stock_negotiation';

const AddStockNegotiationsToList = (
  stockNegotiations: StockNegotiation[],
  newStockNegotiations: StockNegotiation[],
) => {
  const negotiations: { [key: string]: StockNegotiation[] } = {};

  for (const stockNegotiation of stockNegotiations) {
    const dateMS = stockNegotiation.date.getTime();
    const hasDateAppeared = !!negotiations[dateMS];

    if (!hasDateAppeared) negotiations[dateMS] = [];

    negotiations[dateMS].push(stockNegotiation);
  }

  const newDateMS = newStockNegotiations[0].date.getTime();
  const hasNewDateAppeared = !!negotiations[newDateMS];

  if (!hasNewDateAppeared) {
    negotiations[newDateMS] = newStockNegotiations;
  } else {
    const removeBuysAndSellsThatHaveNewDate = () => {
      negotiations[newDateMS] = negotiations[newDateMS].filter(
        (negotiation) => !['BUY', 'SELL'].includes(negotiation.type),
      );
    };

    removeBuysAndSellsThatHaveNewDate();
    negotiations[newDateMS].push(...newStockNegotiations);
  }

  const negotiationsAfterInsetions: StockNegotiation[] = [];
  const orderedDatesMS = Object.keys(negotiations)
    .map((dateMS) => parseInt(dateMS))
    .sort();

  for (const dateMS of orderedDatesMS)
    negotiationsAfterInsetions.push(...negotiations[dateMS]);

  return negotiationsAfterInsetions;
};

export default AddStockNegotiationsToList;
