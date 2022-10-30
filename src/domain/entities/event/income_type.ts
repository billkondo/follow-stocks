const TAXED = 'TAXED';
const UNTAXED = 'UNTAXED';

type IncomeType = typeof TAXED | typeof UNTAXED;

export default IncomeType;
