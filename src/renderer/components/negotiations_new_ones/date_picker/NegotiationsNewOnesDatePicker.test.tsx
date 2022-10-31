import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NegotiationsNewOnesDateTimePicker from './NegotiationsNewOnesDatePicker';

describe('Date picker', () => {
  test('should disable keyboard', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NegotiationsNewOnesDateTimePicker date={null} setDate={jest.fn()} />
      </LocalizationProvider>,
    );

    const user = userEvent.setup();
    const datePicker = screen.getByLabelText('When did negotiations happen?');

    await user.type(datePicker, '21/02/2022');

    expect(datePicker).toHaveValue('');
  });
});
