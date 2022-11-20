import Stock from '@entities/stocks/Stock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NegotiationsNewOnesAutocomplete from './NegotiationsNewOnesAutocomplete';

describe('Stocks autocomplete', () => {
  const setup = () => {
    const mockSetStock = jest.fn();
    const mockSearchStocksByTicker = jest.fn();

    window['stocks'] = {
      searchStocksByTicker: mockSearchStocksByTicker,
    } as never;

    const { rerender } = render(
      <NegotiationsNewOnesAutocomplete
        stock={null}
        setStock={mockSetStock}
        stockType="FII"
      />,
    );

    const user = userEvent.setup();
    const input = screen.getByLabelText('Which stock was negotiated?');

    return {
      input,
      rerender,
      user,
      mockSearchStocksByTicker,
      mockSetStock,
    };
  };

  beforeEach(() => {
    window['stocks'] = {} as never;
  });

  afterEach(() => {
    delete window.stocks;
  });

  test('should autocomplete and select stock', async () => {
    const { input, rerender, user, mockSearchStocksByTicker, mockSetStock } =
      setup();
    const stock: Stock = {
      name: 'RECR Stock',
      ticker: 'RECR11',
      type: 'FII',
      currencyCode: 'BRL',
    };

    await user.type(input, 'RE');
    expect(mockSetStock).not.toHaveBeenCalled();

    mockSearchStocksByTicker.mockResolvedValue([
      {
        name: 'RECT Stock',
        ticker: 'RECT11',
        type: 'FII',
      },
      stock,
    ] as Stock[]);

    await waitFor(() => screen.getByRole('progressbar'));
    await waitFor(() => {
      screen.getByRole('option', { name: /RECT11/ });
      screen.getByRole('option', { name: /RECR11/ });
    });

    mockSearchStocksByTicker.mockResolvedValue([stock] as Stock[]);

    await user.type(input, 'CR');
    await waitFor(() => screen.getByRole('progressbar'));
    await waitFor(() => {
      screen.getByRole('option', { name: /RECR11/ });
    });

    fireEvent.click(screen.getByRole('option', { name: /RECR11/ }));
    await waitFor(() => {
      expect(input).toHaveValue('RECR11');
      expect(mockSetStock).toHaveBeenCalledWith(stock);
    });

    rerender(
      <NegotiationsNewOnesAutocomplete
        setStock={mockSetStock}
        stock={stock}
        stockType="FII"
      />,
    );

    await user.click(input);
    await waitFor(() => {
      screen.getByRole('option', { name: /RECR11/, selected: true });
    });
  });

  test('should not show loading indicator initially', async () => {
    setup();

    expect(
      screen.queryByTestId('autocomplete-loading'),
    ).not.toBeInTheDocument();
  });

  test('should show message that no stocks were found', async () => {
    const { user, input, mockSearchStocksByTicker } = setup();

    mockSearchStocksByTicker.mockResolvedValue([]);

    await user.type(input, 'REC');
    await waitFor(() => {
      screen.getByText(/No stocks were found/);
    });
  });
});
