const BONUS = 'BONUS';
const BUY = 'BUY';
const IGNORED = 'IGNORED';
const INCOME = 'INCOME';
const INCOME_ANNOUNCED = 'INCOME_ANNOUNCED';
const NAME_CHANGED = 'NAME_CHANGED';
const SELL = 'SELL';
const SUBSCRIPTION = 'SUBSCRIPTION';
const UNFOLDING = 'UNFOLDING';
const UNKNOWN = 'UNKNOWN';

type EventType =
  | typeof BONUS
  | typeof BUY
  | typeof IGNORED
  | typeof INCOME
  | typeof INCOME_ANNOUNCED
  | typeof NAME_CHANGED
  | typeof SELL
  | typeof SUBSCRIPTION
  | typeof UNFOLDING
  | typeof UNKNOWN;

export default EventType;
