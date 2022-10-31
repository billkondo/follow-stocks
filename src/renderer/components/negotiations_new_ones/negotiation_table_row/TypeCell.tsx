import EventType from '@entities/event/event_type';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Grid, Icon, TableCell } from '@mui/material';
import { FC } from 'react';

type Props = {
  negotiationType: EventType;
};

const TypeCell: FC<Props> = ({ negotiationType }) => {
  const TypeIcon = negotiationType === 'BUY' ? ArrowDropUp : ArrowDropDown;

  return (
    <TableCell>
      <Grid container alignItems="center">
        <Icon>
          <TypeIcon />
        </Icon>

        <b style={{ marginLeft: 4 }}>{negotiationType}</b>
      </Grid>
    </TableCell>
  );
};

export default TypeCell;
