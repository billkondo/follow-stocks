import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Stock from 'domain/stock';
import NegotiationsNewOnesAutocomplete from './NegotiationsNewOnesAutocomplete';

describe('Stocks autocomplete', () => {
  const setup = () => {
    const mockSetStock = jest.fn();
    const mockSearchStocksByTicker = jest.fn();

    window['stocks'] = {
      searchStocksByTicker: mockSearchStocksByTicker,
    } as never;

    render(
      <NegotiationsNewOnesAutocomplete
        stock={null}
        setStock={mockSetStock}
        stockType="FII"
      />,
    );

    const user = userEvent.setup();
    const autocomplete = screen.getByLabelText('Which stock was negotiated?');

    return { user, autocomplete, mockSearchStocksByTicker, mockSetStock };
  };

  beforeEach(() => {
    window['stocks'] = {} as never;
  });

  afterEach(() => {
    delete window.stocks;
  });

  test('should autocomplete and select stock', async () => {
    const { user, autocomplete, mockSearchStocksByTicker, mockSetStock } =
      setup();

    await user.type(autocomplete, 'RE');
    expect(mockSetStock).not.toHaveBeenCalled();

    mockSearchStocksByTicker.mockReturnValue([
      {
        name: 'RECT Stock',
        ticker: 'RECT11',
        type: 'FII',
      },
      {
        name: 'RECR Stock',
        ticker: 'RECR11',
        type: 'FII',
      },
    ] as Stock[]);

    await waitFor(() => screen.getByTestId('autocomplete-loading'));
    await waitFor(() => {
      screen.getByText(/RECT11/);
      screen.getByText(/RECR11/);
    });

    await user.type(autocomplete, 'CR');
    expect(mockSetStock).not.toHaveBeenCalled();

    mockSearchStocksByTicker.mockReturnValue([
      {
        name: 'RECR Stock',
        ticker: 'RECR11',
        type: 'FII',
      },
    ] as Stock[]);

    await waitFor(() => screen.getByTestId('autocomplete-loading'));
    await waitFor(() => {
      screen.getByText(/RECR11/);
    });

    await user.click(screen.getByText(/RECR11/));
    expect(autocomplete).toHaveValue('RECR11');
    expect(mockSetStock).toHaveBeenCalledWith({
      name: 'RECR Stock',
      ticker: 'RECR11',
      type: 'FII',
    });
  });

  test('should not show loading indicator initially', async () => {
    setup();

    expect(
      screen.queryByTestId('autocomplete-loading'),
    ).not.toBeInTheDocument();
  });

  test('should show message that no stocks were found', async () => {
    const { user, autocomplete, mockSearchStocksByTicker } = setup();

    mockSearchStocksByTicker.mockReturnValue([]);

    await user.type(autocomplete, 'REC');

    await waitFor(() => {
      screen.getByText(/No stocks were found/);
    });
  });
});
