import EventType from '@entities/events/EventType';
import { Chip } from '@mui/material';
import { FC } from 'react';

type Props = {
  type: EventType;
};

const EventTypeChip: FC<Props> = ({ type }) => {
  const typeText = type.replace('_', ' ');

  switch (type) {
    case 'BUY':
      return <Chip label={typeText} sx={{ bgcolor: 'success.light' }}></Chip>;

    case 'IGNORED':
      return <Chip label={typeText} color="warning"></Chip>;

    case 'SELL':
      return <Chip label={typeText} sx={{ bgcolor: 'success.dark' }}></Chip>;

    case 'INCOME':
    case 'INCOME_ANNOUNCED':
      return <Chip label={typeText} color="info"></Chip>;

    case 'BONUS':
    case 'NAME_CHANGED':
    case 'UNFOLDING':
    case 'SUBSCRIPTION':
      return <Chip label={typeText} color="secondary"></Chip>;

    default:
      return <Chip label={typeText}></Chip>;
  }
};

export default EventTypeChip;
