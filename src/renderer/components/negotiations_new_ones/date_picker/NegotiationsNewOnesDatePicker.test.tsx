import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NegotiationsNewOnesDateTimePicker from './NegotiationsNewOnesDatePicker';

describe('Date picker', () => {
  test('should disable keyboard', async () => {
    render(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <NegotiationsNewOnesDateTimePicker date={null} setDate={jest.fn()} />
      </LocalizationProvider>,
    );

    const user = userEvent.setup();
    const datePicker = screen.getByLabelText('When did negotiations happen?');

    await user.type(datePicker, '21/02/2022');

    expect(datePicker).toHaveValue('');
  });
});
