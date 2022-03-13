const parsePrice = (price: string): number => {
  const priceRegex = /^-?([0-9]+\.[0-9]{2})$/g;

  return price.match(priceRegex) ? parseFloat(price) : NaN;
};

export default parsePrice;
