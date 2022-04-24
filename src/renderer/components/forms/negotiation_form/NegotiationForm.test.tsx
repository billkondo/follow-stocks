import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NegotiationForm from './NegotiationForm';

describe('NegotiationForm', () => {
  const mockSubmitForm = jest.fn();

  const setup = () => {
    render(<NegotiationForm submitForm={mockSubmitForm} />);
  };

  beforeEach(() => {
    mockSubmitForm.mockRestore();
  });

  test('should submit form', async () => {
    const user = userEvent.setup();

    setup();

    const sellButton = screen.getByText('Sell');
    const quantityInput = screen.getByLabelText('Quantity');
    const dollarButton = screen.getByText('USD');
    const priceInput = screen.getByLabelText('Price');
    const submitButton = screen.getByRole('button', { name: 'Continue' });

    await user.click(sellButton);
    await user.type(quantityInput, '25.2529');
    await user.click(dollarButton);
    await user.type(priceInput, '256.75');
    await user.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalledWith('SELL', 25.2529, 'USD', 256.75);
  });

  test('should focus price input when enter key is pressed', async () => {
    const user = userEvent.setup();

    setup();

    const quantityInput = screen.getByLabelText('Quantity');
    const priceInput = screen.getByLabelText('Price');

    await user.type(quantityInput, '36.50');
    await user.keyboard('{Enter}');

    expect(priceInput).toHaveFocus();
  });

  test.each(['-25.250', 'abc55.250', '57.gg', '55.223.32', '106,04'])(
    'should valide inputs',
    async (value: string) => {
      const user = userEvent.setup();

      setup();

      const quantityInput = screen.getByLabelText('Quantity');
      const priceInput = screen.getByLabelText('Price');
      const submitButton = screen.getByRole('button', { name: 'Continue' });

      await user.type(quantityInput, value);
      await user.type(priceInput, value);
      await user.click(submitButton);

      expect(screen.getByText('Enter a valid quantity')).toBeVisible();
      expect(screen.getByText('Enter a valid price')).toBeVisible();
    },
  );
});
