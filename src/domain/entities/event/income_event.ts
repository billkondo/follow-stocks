import Event from '@entities/events/Event';
import IncomeType from './income_type';

class IncomeEvent extends Event {
  incomeType: IncomeType;
}

export default IncomeEvent;
