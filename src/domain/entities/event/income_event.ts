import Event from './event';
import IncomeType from './income_type';

interface IncomeEvent extends Event {
  incomeType: IncomeType;
}

export default IncomeEvent;
