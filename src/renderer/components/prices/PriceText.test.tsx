import { render, screen, waitFor } from '@testing-library/react';
import PriceText from './PriceText';

describe('PriceText', () => {
  it('should render price text', async () => {
    render(<PriceText currencyCode="BRL" price={14.547}></PriceText>);

    await waitFor(() => screen.getByText('14.55'));
  });
});
