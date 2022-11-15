import EventType from '@entities/events/EventType';
import { Chip } from '@mui/material';
import { FC } from 'react';

type Props = {
  type: EventType;
};

const EventTypeChip: FC<Props> = ({ type }) => {
  switch (type) {
    case 'BUY':
      return <Chip label={type} color="success"></Chip>;

    case 'IGNORED':
      return <Chip label={type} color="warning"></Chip>;

    case 'SELL':
      return <Chip label={type} color="error"></Chip>;

    case 'INCOME':
    case 'INCOME_ANNOUNCED':
      return <Chip label={type} color="info"></Chip>;

    case 'BONUS':
    case 'NAME_CHANGED':
    case 'UNFOLDING':
    case 'SUBSCRIPTION':
      return <Chip label={type} color="secondary"></Chip>;

    default:
      return <Chip label={type}></Chip>;
  }
};

export default EventTypeChip;
