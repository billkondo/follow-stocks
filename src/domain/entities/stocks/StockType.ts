const BDR = 'BDR';
const BR_STOCK = 'BR_STOCK';
const FII = 'FII';
const FIXED_INCOME = 'FIXED_INCOME';
const SUBSCRIPTION = 'SUBSCRIPTION';

type StockType =
  | typeof BDR
  | typeof BR_STOCK
  | typeof FII
  | typeof FIXED_INCOME
  | typeof SUBSCRIPTION;

export default StockType;
