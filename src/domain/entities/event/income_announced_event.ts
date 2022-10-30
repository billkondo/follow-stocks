import Event from './event';
import IncomeType from './income_type';

interface IncomeAnnouncedEvent extends Event {
  incomeType: IncomeType;
  paymentDate: Date;
}

export default IncomeAnnouncedEvent;
