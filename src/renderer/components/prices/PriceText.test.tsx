import Price from '@entities/price/price';
import { render, screen, waitFor } from '@testing-library/react';
import PriceText from './PriceText';

describe('PriceText', () => {
  it('should render price text', async () => {
    const price: Price = {
      code: 'BRL',
      value: 14.547,
    };

    render(<PriceText price={price}></PriceText>);

    await waitFor(() => screen.getByText('14.55'));
  });
});
