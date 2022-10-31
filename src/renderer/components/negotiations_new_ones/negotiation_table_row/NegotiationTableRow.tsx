import Event from '@entities/event/event';
import { Fade, IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';
import { FC, useState } from 'react';
import PriceCell from './PriceCell';
import TypeCell from './TypeCell';

type Props = {
  negotiation: Event;
  onDeleteButtonClick: () => void;
};

const NegotiationTableRow: FC<Props> = ({
  negotiation,
  onDeleteButtonClick,
}) => {
  const [isMouseOver, setIsMouseOver] = useState(true);

  return (
    <TableRow
    // onMouseEnter={() => setIsMouseOver(true)}
    // onMouseLeave={() => setIsMouseOver(false)}
    >
      <TypeCell negotiationType={negotiation.type} />

      <TableCell>
        <b>{negotiation.quantity}</b>
      </TableCell>

      <PriceCell price={negotiation.price} />

      <TableCell>
        <Fade in={isMouseOver}>
          <div>
            <Tooltip title="Edit">
              <IconButton>
                <IconPencil />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton onClick={onDeleteButtonClick} sx={{ ml: 2 }}>
                <IconTrash />
              </IconButton>
            </Tooltip>
          </div>
        </Fade>
      </TableCell>
    </TableRow>
  );
};

export default NegotiationTableRow;
