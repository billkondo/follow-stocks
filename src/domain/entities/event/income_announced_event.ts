import Event from '@entities/events/Event';
import IncomeType from './income_type';

class IncomeAnnouncedEvent extends Event {
  incomeType: IncomeType;
  paymentDate: Date;
}

export default IncomeAnnouncedEvent;
