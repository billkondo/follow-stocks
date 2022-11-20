import Stock from '@entities/stocks/Stock';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NegotiationsList from './NegotiationsList';

describe('Negotiations list', () => {
  const mockListStockNegotiationsAtDate = jest.fn();

  beforeAll(() => {
    window.stocks = {
      listStockNegotiationsAtDate: mockListStockNegotiationsAtDate,
    } as never;
  });

  beforeEach(() => {
    mockListStockNegotiationsAtDate.mockReset();
  });

  afterAll(() => {
    delete window.stocks;
  });

  test.each([
    [
      {
        name: 'XPLG Stock',
        ticker: 'XPLG11',
        type: 'FII',
      },
      new Date(2021, 11, 10),
      'XPLG11 negotiations at 10/12/2021',
    ],
    [
      {
        name: 'HGLG Stock',
        ticker: 'HGLG11',
        type: 'FII',
      },
      new Date(2010, 7, 7),
      'HGLG11 negotiations at 07/08/2010',
    ],
  ])(
    'should render title with stock and date information',
    (stock: Stock, date: Date, expectedTitle: string) => {
      mockListStockNegotiationsAtDate.mockResolvedValue([]);

      render(<NegotiationsList stock={stock} negotiationDate={date} />);

      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
        expectedTitle,
      );
    },
  );

  test('should render empty negotiations list indicator', async () => {
    const stock: Stock = {
      currencyCode: 'BRL',
      name: 'VINO Stock',
      ticker: 'VINO11',
      type: 'FII',
    };
    const negotiationDate = new Date(2015, 6, 9);

    mockListStockNegotiationsAtDate.mockResolvedValue([]);

    render(
      <NegotiationsList stock={stock} negotiationDate={negotiationDate} />,
    );

    await waitFor(() => screen.getByRole('progressbar'));
    await waitFor(() => screen.getByText(/There are no VINO11 negotiations/));

    expect(mockListStockNegotiationsAtDate).toBeCalledWith(
      stock,
      negotiationDate,
    );
    expect(mockListStockNegotiationsAtDate).toBeCalledTimes(1);
  });

  test('should render failed indicator when stock negotiations listing fails', async () => {
    const user = userEvent.setup();
    const stock: Stock = {
      currencyCode: 'BRL',
      name: 'HGRE Stock',
      ticker: 'HGRE11',
      type: 'FII',
    };
    const negotiationDate = new Date(2022, 10, 15);

    mockListStockNegotiationsAtDate.mockRejectedValue(new Error('FAILED'));

    render(
      <NegotiationsList stock={stock} negotiationDate={negotiationDate} />,
    );

    await waitFor(() => screen.getByRole('progressbar'));
    await waitFor(() => {
      screen.getByRole('button', { name: /Try Again/ });
      screen.getByText(/It was not possible to load HGRE11 negotiations/);
      expect(mockListStockNegotiationsAtDate).toBeCalledTimes(1);
    });

    mockListStockNegotiationsAtDate.mockResolvedValue([]);

    await user.click(screen.getByRole('button', { name: /Try Again/ }));
    await waitFor(() => {
      screen.getByText(/There are no HGRE11 negotiations/);
      expect(mockListStockNegotiationsAtDate).toBeCalledTimes(2);
    });
  });
});
