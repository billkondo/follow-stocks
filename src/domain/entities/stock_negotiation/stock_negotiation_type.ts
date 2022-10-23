const BONUS = 'BONUS';
const BUY = 'BUY';
const IGNORED = 'IGNORED';
const NAME_CHANGED = 'NAME_CHANGED';
const PROFIT = 'PROFIT';
const PROVISIONED_EVENT = 'PROVISIONED_EVENT';
const SELL = 'SELL';
const SUBSCRIPTION = 'SUBSCRIPTION';
const UNFOLDING = 'UNFOLDING';
const UNKNOWN = 'UNKNOWN';

type StockNegotiationType =
  | typeof BONUS
  | typeof BUY
  | typeof IGNORED
  | typeof NAME_CHANGED
  | typeof PROFIT
  | typeof PROVISIONED_EVENT
  | typeof SELL
  | typeof SUBSCRIPTION
  | typeof UNFOLDING
  | typeof UNKNOWN;

export default StockNegotiationType;
