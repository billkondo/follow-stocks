import { DesktopDatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { FC } from 'react';
import { MIN_WIDTH } from 'renderer/config/constants';

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const NegotiationsNewOneDateTimePicker: FC<Props> = ({ date, setDate }) => {
  return (
    <DesktopDatePicker
      inputFormat="dd/MM/yyyy"
      value={date}
      onChange={(newDate) => setDate(newDate)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="When did negotiations happen?"
          sx={{ minWidth: MIN_WIDTH, caretColor: 'transparent' }}
          onKeyDown={(event) => event.preventDefault()}
        />
      )}
    />
  );
};

export default NegotiationsNewOneDateTimePicker;
