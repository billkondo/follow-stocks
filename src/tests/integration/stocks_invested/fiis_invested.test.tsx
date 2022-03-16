import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'renderer/App';
import useElectron from 'tests/hooks/use_electron';

describe('FIIs invested', () => {
  useElectron();

  test('should load FIIs invested when user goes to FIIs tab', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /FIIs/ }));
    await screen.findByTestId('stocks-invested-loading');
    await screen.findByText(/No FIIs invested/);
  });
});
